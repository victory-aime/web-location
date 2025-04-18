import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['bvg-innovation-state-management', 'bvg-innovation-shared', 'bvg-innovation-frontend-business'],
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: false,
            icon: true,
          },
        },
      ],
    })
    return config
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
}

export default nextConfig
