/** @type {import('next').NextConfig} */

// GitHub Pages serves this project site under https://<user>.github.io/sofkat,
// so every asset and route needs the "/sofkat" prefix. Override with
// NEXT_PUBLIC_BASE_PATH="" when serving from a domain root (or locally).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sofkat";

const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site into ./out — GitHub Pages has no Node server.
  output: "export",
  // Directory-style URLs so /photos resolves to /photos/index.html.
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    // next/image optimisation needs a server; serve the originals instead.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
