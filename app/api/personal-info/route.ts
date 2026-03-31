import { NextResponse } from "next/server";
import { createClient } from "contentful";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value;
    const res = await client.getEntries({
      content_type: "signupPage",
      "sys.id": "OZWg9ZkMEz33T54QZDX13",
    } as any);
    return NextResponse.json(res);
  } catch (err) {
    console.error("Error fetching content:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 },
    );
  }
}
