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

export async function createAppointmentEntry(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  appointmentDate: string;
  preferredTime: string;
  reasonForVisit: string;
  additionalNotes: string;
  contactMethod: string;
}) {
  const environment = await getEnvironment();
  
  const entry = await environment.createEntry('appointment', {
    fields: {
      name: { 'en-US': data.fullName },
      email: { 'en-US': data.email },
      phoneNumber: { 'en-US': parseInt(data.phoneNumber, 10) },
      appointmentDate: { 'en-US': `${data.appointmentDate}T${data.preferredTime}:00` },
      reasonForVisit: { 'en-US': data.reasonForVisit },
      additionalNotes: { 'en-US': data.additionalNotes },
      preferedContact: { 'en-US': data.contactMethod === 'phone' },
    },
  });

  return entry;
}
