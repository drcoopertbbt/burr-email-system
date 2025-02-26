/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [];
  },
  webpack: (config) => {
    return config;
  },
  // Server configuration
  serverOptions: {
    port: 3456,
    hostname: '0.0.0.0',
  },
};

export default nextConfig;
