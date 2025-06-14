"use client";
import React, { useState, useEffect } from "react";

const PhotoUploader = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles
      .filter(
        (file) =>
          ["image/jpeg", "image/png", "image/heic"].includes(file.type) &&
          file.size <= 10 * 1024 * 1024
      )
      .map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    setFiles((prev) => [...prev, ...validFiles]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/heic": [".heic"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (fileRejections) => {
      setError(
        `File rejected: ${fileRejections[0].errors[0].message}. Please use JPG, PNG, or HEIC files under 10MB.`
      );
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setError(null);

    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // <-- REPLACE THIS

      return fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload`,
        {
          // <-- REPLACE THIS
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json());
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((res) => res.secure_url);
      if (successfulUploads.length > 0) {
        onUploadSuccess(successfulUploads.map((upload) => upload.secure_url));
        setFiles([]); // Clear after successful upload
      }
      if (results.some((res) => res.error)) {
        setError("Some images failed to upload. Please try them again.");
      }
    } catch (err) {
      setError("An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const previews = files.map((file) => (
    <div
      key={file.name}
      className="relative border border-gray-200 rounded-lg p-2"
    >
      <img
        src={file.preview}
        alt={file.name}
        className="w-full h-32 object-cover rounded-md"
        onLoad={() => URL.revokeObjectURL(file.preview)}
      />
      <button
        onClick={() => removeFile(file.name)}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 leading-none"
      >
        <X size={14} />
      </button>
      <p className="text-xs truncate mt-1 text-gray-500">{file.name}</p>
    </div>
  ));

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <h2
        className="text-3xl font-bold text-gray-800 text-center mb-6"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Share Your Photos
      </h2>
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-rose-500 bg-rose-50"
            : "border-gray-300 hover:border-rose-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-gray-600">
          <Camera className="w-12 h-12 mb-4 text-gray-400" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop photos here, or click to select files</p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            .jpg, .png, .heic accepted | Max 10MB per image
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-4">Selected Photos:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews}
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
            >
              {uploading ? "Uploading..." : "Upload Photos"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
