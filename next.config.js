/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.us-east-2.amazonaws.com', 'placeimg.com', 'drive.google.com'],
  },
}

module.exports = nextConfig
