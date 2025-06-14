/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enables static exports
  reactStrictMode: true,
  images: {
    unoptimized: true, // Recommended for GitHub Pages as it doesn't support Next.js image optimization
  },
  // If your GitHub Pages URL will be like https://<username>.github.io/<repository-name>/
  // you'll need to set basePath and assetPrefix. Replace 'your-repo-name' with your actual repository name.
  basePath: process.env.NODE_ENV === "production" ? "/sofkat" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/sofkat/" : "",
};

export default nextConfig;
