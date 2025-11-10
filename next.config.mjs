/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
  // Add this for API routes
  experimental: {
    serverActions: {
      bodySizeLimit: "128mb",
    },
  },
  // Add API route body size limit
  api: {
    bodyParser: {
      sizeLimit: "128mb",
    },
  },
};

export default nextConfig;
