import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/countries_visited",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
