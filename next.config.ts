import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokens.1inch.io",
      },
      {
        protocol: "https",
        hostname: "tokens-data.1inch.io",
      },
    ],
  },
};

export default nextConfig;
