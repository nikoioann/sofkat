import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";
import { unstable_cache } from "next/cache";

// Route segment config for caching optimization
export const revalidate = 60; // Revalidate every 60 seconds

// Cache the directory read for 60 seconds to handle high traffic
// This prevents filesystem reads on every request
const getCachedPhotos = unstable_cache(
  async () => {
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

    return {
      photos,
      count: photos.length,
    };
  },
  ["photos-list"],
  {
    revalidate: 60, // Revalidate cache every 60 seconds
    tags: ["photos"], // Tag for manual revalidation if needed
  }
);

export async function GET() {
  try {
    const data = await getCachedPhotos();

    // Set cache headers for the response
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error reading photos:", error);
    return NextResponse.json(
      { error: "Failed to read photos", photos: [], count: 0 },
      { status: 500 }
    );
  }
}
