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
