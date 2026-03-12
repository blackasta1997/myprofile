import { NextRequest, NextResponse } from 'next/server';
import { createSignupEntry } from '@/lib/contentfulManagement';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const entry = await createSignupEntry({
      firstName,
      lastName,
      email,
      password,
    });

    return NextResponse.json(
      { message: 'Signup successful', entryId: entry.sys.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    const errorMessage = error.message || 'Failed to create signup entry';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
