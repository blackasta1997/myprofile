import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { contentfulClient } from "@/lib/contentful";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value;

    if (!uid) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    const client = contentfulClient;

    const res = await client.getEntries({
      content_type: "signupPage",
    });

    const user = await (async () => {
      for (const item of res.items) {
        const isMatch = await bcrypt.compare(item.sys.id, uid);
        if (isMatch) return item;
      }
      return null;
    })();

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ items: [user] });
  } catch (err) {
    console.error("Error fetching content:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 },
    );
  }
}
