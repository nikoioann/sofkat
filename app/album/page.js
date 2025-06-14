"use client";
import React, { useState, useEffect } from "react";
import PhotoUploader from "@/components/PhotoUploader";
import PhotoGallery from "@/components/PhotoGallery";

const AlbumPage = () => {
  // In a real app, you would fetch these URLs from your database or cloud storage.
  // For this example, we'll manage state locally.
  const [photos, setPhotos] = useState([
    "https://placehold.co/600x800/f0e2e6/7c3aed?text=Memory+1",
    "https://placehold.co/600x400/e2e6f0/3a7ced?text=Memory+2",
    "https://placehold.co/600x700/e6f0e2/7ced3a?text=Memory+3",
    "https://placehold.co/600x500/f0e2e2/ed3a7c?text=Memory+4",
    "https://placehold.co/600x600/e2f0e6/3aed7c?text=Memory+5",
  ]);

  const handleUploadSuccess = (newPhotoUrls) => {
    setPhotos((prevPhotos) => [...newPhotoUrls, ...prevPhotos]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <PhotoUploader onUploadSuccess={handleUploadSuccess} />
          <PhotoGallery photos={photos} />
        </div>
      </main>
      <Footer />
    </div>
  );
};
