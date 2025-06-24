/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['langchain']
  }
};

module.exports = nextConfig;