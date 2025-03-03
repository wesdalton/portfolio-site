/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'i.scdn.co'], // Allow Spotify image domain
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
};

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = process.env.ANALYZE === 'true' 
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;