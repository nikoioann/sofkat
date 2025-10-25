"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, X, Loader2 } from "lucide-react";
import Image from "next/image";

const PhotoUploader = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles
      .filter(
        (file) =>
          ["image/jpeg", "image/png", "image/heic"].includes(file.type) &&
          file.size <= 100 * 1024 * 1024
      )
      .map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    setFiles((prev) => [...prev, ...validFiles]);
    setError(null);
    setSuccessMessage(null); // Clear success message when new files are selected
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

      return fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((res) => res.success);
      if (successfulUploads.length > 0) {
        onUploadSuccess(successfulUploads.map((upload) => upload.url));
        setFiles([]); // Clear after successful upload
        setSuccessMessage(
          `Successfully uploaded ${successfulUploads.length} photo${
            successfulUploads.length === 1 ? "" : "s"
          }`
        );
        setError(null); // Clear any previous errors
      }
      if (results.some((res) => res.error)) {
        setError("Some images failed to upload. Please try them again.");
      }
    } catch (err) {
      console.error(err);
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
      <Image
        src={file.preview}
        alt={file.name}
        width={200}
        height={128}
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

  // Loader Overlay Component
  const LoaderOverlay = () => {
    if (!uploading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm mx-4">
          <div className="flex flex-col items-center text-center">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Uploading Photos
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while your photos are being uploaded...
            </p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <LoaderOverlay />
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
              <p>
                Drag &apos;n&apos; drop photos here, or click to select files
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              .jpg, .png, .heic accepted | Max 10MB per image
            </p>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {successMessage && (
          <p className="text-orange-600 text-center mt-4 font-medium">
            {successMessage}
          </p>
        )}

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-4">
              Selected Photos:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previews}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 transition duration-300 disabled:bg-gray-400"
              >
                {uploading ? "Uploading..." : "Upload Photos"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoUploader;
