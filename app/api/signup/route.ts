import bcrypt from 'bcrypt';
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const entry = await createSignupEntry({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
    });

    return NextResponse.json(
      { message: 'Signup successful', entryId: entry.sys.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create signup entry' },
      { status: 500 }
    );
  }
}