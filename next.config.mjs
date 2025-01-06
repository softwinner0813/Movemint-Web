/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.fallback = { fs: false }; // Disable Node.js features for the browser
    return config;
  },
  images: {
    domains: ['localhost', 'api.movemint.io', 'lh3.googleusercontent.com'], // Add the allowed external image domains here
  },
};

export default nextConfig;


