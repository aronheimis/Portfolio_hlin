import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  async redirects() {
    return [
      // Permanent redirects for index pages → / (fixes SEO checker warning)
      { source: '/index',      destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.php',  destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
