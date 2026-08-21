import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => `build-${Date.now()}`,
  // Pin the workspace root — a stray package-lock.json in the home directory
  // otherwise makes Turbopack infer the wrong root and resolve files from there.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
