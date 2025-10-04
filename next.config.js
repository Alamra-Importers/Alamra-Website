/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  
  // Environment variables
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  },
  
  // Image optimization - disabled for static export
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig