/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.abacus.ai'],
  },
}

module.exports = nextConfig