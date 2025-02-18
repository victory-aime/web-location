import type { NextConfig } from "next";
import type { Configuration, RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            icon: true,
          },
        },
      ],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
