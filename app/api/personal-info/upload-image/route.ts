import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { contentfulClient } from "@/lib/contentful";
import { uploadImageAndLinkToEntry, removeImageFromEntry } from "@/lib/contentfulManagement";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value;

    if (!uid) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 },
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." },
        { status: 400 },
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit." },
        { status: 400 },
      );
    }

    // Find the authenticated user
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

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    const result = await uploadImageAndLinkToEntry(
      user.sys.id,
      arrayBuffer,
      file.name,
      file.type,
    );

    return NextResponse.json({
      message: "Image uploaded successfully",
      assetUrl: result.assetUrl,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
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

    await removeImageFromEntry(user.sys.id);

    return NextResponse.json({
      message: "Image removed successfully",
    });
  } catch (err) {
    console.error("Error removing image:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 500 },
    );
  }
}
