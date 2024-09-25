/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    domains: ['localhost', 'movemint.io'], // Add the allowed external image domains here
  },
};

export default nextConfig;
