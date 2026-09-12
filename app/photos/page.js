import { readdir } from "fs/promises";
import { join } from "path";
import PhotoGallery from "@/components/PhotoGallery";
import { asset } from "@/lib/basePath";

const MEDIA_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".heic",
  ".mp4",
  ".mpeg",
  ".mov",
  ".avi",
  ".webm",
];

// Runs at build time only: the static export has no server to read the
// directory on request, so whatever is committed under public/uploads when
// the site is built is what the album shows.
const getPhotos = async () => {
  try {
    const files = await readdir(join(process.cwd(), "public", "uploads"));

    return files
      .filter((file) =>
        MEDIA_EXTENSIONS.includes(file.toLowerCase().slice(file.lastIndexOf(".")))
      )
      .sort()
      .map((file) => asset(`/uploads/${file}`));
  } catch (error) {
    console.error("Error reading photos:", error);
    return [];
  }
};

const PhotosPage = async () => {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Photo Counter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          <div className="mt-4">
            <p className="text-3xl font-semibold text-yellow-600">
              {photos.length}
            </p>
            <p className="text-gray-600 text-lg mt-2">
              {photos.length === 1 ? "Φωτογραφία" : "Φωτογραφίες"}
            </p>
          </div>
        </div>

        {/* Photo Gallery */}
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
};

export default PhotosPage;
