import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
