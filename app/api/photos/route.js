import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const uploadsDir = join(process.cwd(), "public", "uploads");

    // Read all files from the uploads directory
    const files = await readdir(uploadsDir);

    // Filter for image files only
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"];
    const imageFiles = files.filter((file) => {
      const ext = file.toLowerCase().substring(file.lastIndexOf("."));
      return imageExtensions.includes(ext);
    });

    // Create URLs for each image
    const photos = imageFiles.map((file) => `/uploads/${file}`);

    return NextResponse.json({
      photos,
      count: photos.length,
    });
  } catch (error) {
    console.error("Error reading photos:", error);
    return NextResponse.json(
      { error: "Failed to read photos", photos: [], count: 0 },
      { status: 500 }
    );
  }
}
