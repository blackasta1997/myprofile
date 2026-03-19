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
      'fields.password': password,
    });

    if (res.items.length > 0) {
      await createLoginLogEntry({
        email,
        loginDate: new Date().toISOString(),
      });
    }

    return NextResponse.json({ items: res.items || [] });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json({ error: "Failed to check email" }, { status: 500 });
  }
}
