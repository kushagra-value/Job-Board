/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com'],
  },
  experimental: {
    forceSwcTransforms: false,
    esmExternals: true
  },
  webpack: (config, { isServer }) => {
    // Disable native addons
    config.module.noParse = /\.node$/;
    return config;
  }
};

module.exports = nextConfig;