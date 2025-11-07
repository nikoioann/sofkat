"use client";
import React, { useState, useEffect } from "react";
import PhotoGallery from "@/components/PhotoGallery";
import { Camera } from "lucide-react";

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/photos");
        const data = await response.json();

        if (response.ok) {
          setPhotos(data.photos || []);
          setCount(data.count || 0);
        } else {
          setError("Failed to load photos");
        }
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Photo Counter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
          {loading ? (
            <p className="text-gray-600 text-lg">Φόρτωση...</p>
          ) : (
            <div className="mt-4">
              <p className="text-3xl font-semibold text-yellow-600">{count}</p>
              <p className="text-gray-600 text-lg mt-2">
                {count === 1 ? "Φωτογραφία" : "Φωτογραφίες"}
              </p>
            </div>
          )}
        </div>

        {/* Photo Gallery */}
        {error ? (
          <div className="text-center text-red-600 py-12">
            <p>{error}</p>
          </div>
        ) : (
          <PhotoGallery photos={photos} />
        )}
      </div>
    </div>
  );
};

export default PhotosPage;
