/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bytegrad.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn3.iconfinder.com',
      },
    ],
  },
};

export default nextConfig;
