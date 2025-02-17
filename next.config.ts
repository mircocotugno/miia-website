import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Image source
  images: {
    domains: ['https://localhost:9080'],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
    ],
  },
  // Redirects
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: 'https://madeinitalyacademy.com/',
        permanent: true,
      },
      // // Wildcard path matching
      // {
      //   source: '/blog/:slug',
      //   destination: '/news/:slug',
      //   permanent: true,
      // },
    ]
  },
}

export default nextConfig
