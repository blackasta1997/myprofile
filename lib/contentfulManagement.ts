import { createClient } from 'contentful-management';

const getClient = () => {
  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;

  if (!token) {
    throw new Error('CONTENTFUL_MANAGEMENT_TOKEN is not defined in environment variables');
  }
  if (!spaceId) {
    throw new Error('CONTENTFUL_SPACE_ID is not defined in environment variables');
  }

  return createClient({ accessToken: token });
};

export async function getEnvironment() {
  const client = getClient();
  const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  
  try {
    const space = await client.getSpace(spaceId);
    return await space.getEnvironment('master');
  } catch (error: any) {
    if (error.name === 'OrganizationAccessGrantRequired' || error.status === 401) {
      throw new Error(
        `Contentful access denied. Please ensure your CONTENTFUL_MANAGEMENT_TOKEN has access to space "${spaceId}". ` +
        `Generate a new token at: https://app.contentful.com/account/profile/cma_tokens`
      );
    }
    throw error;
  }
}

export async function createSignupEntry(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const environment = await getEnvironment();
  
  const entry = await environment.createEntry('signupPage', {
    fields: {
      firstName: { 'en-US': data.firstName },
      lastName: { 'en-US': data.lastName },
      email: { 'en-US': data.email },
      password: { 'en-US': data.password },
    },
  });

  // Publish the entry
  await entry.publish();

  return entry;
}

export async function updateSignupEntry(
  entryId: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  }
) {
  const environment = await getEnvironment();
  const entry = await environment.getEntry(entryId);

  // Initialize fields object if it doesn't exist
  if (!entry.fields) entry.fields = {};

  if (data.firstName !== undefined) entry.fields.firstName = { 'en-US': data.firstName };
  if (data.lastName !== undefined) entry.fields.lastName = { 'en-US': data.lastName };
  if (data.email !== undefined) entry.fields.email = { 'en-US': data.email };
  if (data.phone !== undefined) entry.fields.phone = { 'en-US': data.phone };

  const updatedEntry = await entry.update();

  try {
    await updatedEntry.publish();
  } catch (publishError: any) {
    // If publish fails due to validation (e.g. unknown fields), log but still return the updated entry
    console.error("Publish failed, entry was updated but not published:", publishError.message);
    throw publishError;
  }

  return updatedEntry;
}

export async function uploadImageAndLinkToEntry(
  entryId: string,
  fileBuffer: ArrayBuffer,
  fileName: string,
  contentType: string
) {
  const environment = await getEnvironment();

  // Remove the previous image asset if one exists
  const existingEntry = await environment.getEntry(entryId);
  const previousAssetId = existingEntry.fields?.image?.['en-US']?.sys?.id;
  if (previousAssetId) {
    try {
      const previousAsset = await environment.getAsset(previousAssetId);
      if (previousAsset.isPublished()) {
        await previousAsset.unpublish();
      }
      await previousAsset.delete();
    } catch (err) {
      console.error('Failed to delete previous asset:', err);
    }
  }

  // Upload the raw file first
  const upload = await environment.createUpload({
    file: fileBuffer,
  });

  // Create the asset referencing the upload
  const asset = await environment.createAsset({
    fields: {
      title: { 'en-US': fileName },
      description: { 'en-US': '' },
      file: {
        'en-US': {
          contentType,
          fileName,
          uploadFrom: {
            sys: {
              type: 'Link',
              linkType: 'Upload',
              id: upload.sys.id,
            },
          },
        },
      },
    },
  });

  // Process the asset
  await asset.processForAllLocales();

  // Poll until processing is complete
  let processedAsset = await environment.getAsset(asset.sys.id);
  let attempts = 0;
  while (!processedAsset.fields.file['en-US'].url && attempts < 10) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    processedAsset = await environment.getAsset(asset.sys.id);
    attempts++;
  }

  // Publish the asset
  const publishedAsset = await processedAsset.publish();

  // Link the asset to the entry's image field
  const entry = await environment.getEntry(entryId);
  if (!entry.fields) entry.fields = {};

  entry.fields.image = {
    'en-US': {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: publishedAsset.sys.id,
      },
    },
  };

  const updatedEntry = await entry.update();
  await updatedEntry.publish();

  return {
    assetId: publishedAsset.sys.id,
    assetUrl: `https:${publishedAsset.fields.file['en-US'].url}`,
  };
}

export async function removeImageFromEntry(entryId: string) {
  const environment = await getEnvironment();
  const entry = await environment.getEntry(entryId);

  if (!entry.fields?.image) return;

  // Get the asset ID before unlinking
  const assetId = entry.fields.image['en-US']?.sys?.id;

  // Remove the image link from the entry
  delete entry.fields.image;
  const updatedEntry = await entry.update();
  await updatedEntry.publish();

  // Unpublish and delete the asset
  if (assetId) {
    try {
      const asset = await environment.getAsset(assetId);
      if (asset.isPublished()) {
        await asset.unpublish();
      }
      await asset.delete();
    } catch (err) {
      console.error('Failed to delete asset:', err);
    }
  }
}
