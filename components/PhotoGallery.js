"use client";
import React, { useState } from "react";
import { LucideImage } from "lucide-react";

const PhotoGallery = ({ photos }) => {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // This is a simple masonry-like effect using CSS columns
  // A library like react-masonry-css would provide more robust control
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2
        className="text-4xl font-bold text-gray-800 text-center mb-12"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Our Shared Album
      </h2>

      {photos.length === 0 ? (
        <div className="text-center text-gray-500">
          <LucideImage size={48} className="mx-auto mb-4" />
          <p>No photos have been shared yet.</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((media, index) => {
            const isVideo = media.toLowerCase().match(/\.(mp4|mpeg|mov|avi|webm)$/);
            return (
              <div
                key={index}
                className="break-inside-avoid"
                onClick={() => setLightboxMedia(media)}
              >
                {isVideo ? (
                  <video
                    src={media}
                    className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={media}
                    alt={`Shared memory ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    loading="lazy"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {lightboxMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxMedia(null)}
        >
          {lightboxMedia.toLowerCase().match(/\.(mp4|mpeg|mov|avi|webm)$/) ? (
            <video
              src={lightboxMedia}
              controls
              autoPlay
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={lightboxMedia}
              alt="Lightbox view"
              className="max-w-full max-h-full rounded-lg"
            />
          )}
          <button
            onClick={() => setLightboxMedia(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
