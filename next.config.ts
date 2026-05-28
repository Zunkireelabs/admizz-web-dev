import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => `build-${Date.now()}`,
};

export default nextConfig;
