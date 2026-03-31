import { NextRequest, NextResponse } from 'next/server';
import { contentfulClient } from '@/lib/contentful';
import { createAppointmentEntry } from '@/lib/contentfulManagementAppoinment';

export async function GET() {
  try {
    const client = contentfulClient;

    const res = await client.getEntries({
      content_type: 'appointment',
      limit: 1000,
    });

    const appointments = res.items.map((item: any) => ({
      id: item.sys.id,
      name: item.fields.name,
      email: item.fields.email,
      phoneNumber: item.fields.phoneNumber,
      appointmentDate: item.fields.appointmentDate,
      reasonForVisit: item.fields.reasonForVisit,
      additionalNotes: item.fields.additionalNotes,
      preferedContact: item.fields.preferedContact,
    }));

    return NextResponse.json({ appointments });
  } catch (error: any) {
    console.error('Failed to fetch appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const { fullName, email, phoneNumber, appointmentDate, preferredTime, reasonForVisit, additionalNotes, contactMethod } = body;

    if (!fullName || !email || !phoneNumber || !appointmentDate || !preferredTime || !reasonForVisit || !additionalNotes || !contactMethod) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const entry = await createAppointmentEntry({
      fullName,
      email,
      phoneNumber,
      appointmentDate,
      preferredTime,
      reasonForVisit,
      additionalNotes,
      contactMethod,
    });

    return NextResponse.json(
      { message: 'Appointment booked successfully', entryId: entry.sys.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Appointment booking error:', error);
    const errorMessage = error.message || 'Failed to book appointment';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
