import bcrypt from 'bcrypt';
import { createClient } from "contentful";
import { NextRequest, NextResponse } from "next/server";
import { createLoginLogEntry } from "@/lib/contentfulManagement";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  try {
    const res = await client.getEntries({
      content_type: 'signupPage',
      'fields.email': email,
    });

    if (res.items.length > 0) {
      const storedHashedPassword = res.items[0].fields.password;
      
      // Compare the provided password with stored hash
      const isPasswordValid = await bcrypt.compare(password, String(storedHashedPassword));

      if (isPasswordValid) {
        console.log(`[LOGIN SUCCESS] User logged in: ${email} at ${new Date().toISOString()}`);
        try {
          await createLoginLogEntry({ email, loginDate: new Date().toISOString() });
        } catch (logError) {
          console.error("Failed to create login log:", logError);
        }

        const response = NextResponse.json({ items: res.items });
        response.cookies.set('loggedIn', 'true', {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      }
    }

    console.log(`[LOGIN FAILED] Invalid credentials for: ${email}`);
    return NextResponse.json({ items: [] });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Failed to check email" }, { status: 500 });
  }
}