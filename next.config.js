/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Mark packages with native modules for server-side only (Next.js 14)
  experimental: {
    serverComponentsExternalPackages: ['square'],
  },
}

module.exports = nextConfig
