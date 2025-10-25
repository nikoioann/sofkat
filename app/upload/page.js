"use client";

import { useState } from "react";
import PhotoUploader from "../../components/PhotoUploader";

const UploadPage = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleUploadSuccess = (urls) => {
    setUploadedPhotos((prev) => [...prev, ...urls]);
    // You can add additional handling here, like showing a success message
    console.log("Photos uploaded successfully:", urls);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Wedding Photo Upload
          </h1>
          <PhotoUploader onUploadSuccess={handleUploadSuccess} />
          {uploadedPhotos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Uploaded Photos:
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedPhotos.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={url}
                      alt={`Uploaded photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
