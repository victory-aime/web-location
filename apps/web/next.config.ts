import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['@shop/shop-state-management', '@shop/shop-shared'],
};

export default nextConfig;
