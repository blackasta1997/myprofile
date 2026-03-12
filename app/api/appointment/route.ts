import { NextRequest, NextResponse } from 'next/server';
import { createAppointmentEntry } from '@/lib/contentfulManagementAppoinment';

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
