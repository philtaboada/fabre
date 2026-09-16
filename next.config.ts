import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@photo-sphere-viewer/core",
    "@photo-sphere-viewer/virtual-tour-plugin",
    "@photo-sphere-viewer/gyroscope-plugin",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" }
    ],
  },
};

export default nextConfig;
