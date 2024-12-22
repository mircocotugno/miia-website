import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Image source
  images: {
    imageSizes: [64, 128, 256, 384, 512, 1280],
    deviceSizes: [480, 1024, 1439],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
    ],
  },
}

export default nextConfig
