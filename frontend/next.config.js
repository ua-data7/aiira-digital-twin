/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SSR_API_URL: process.env.NEXT_PUBLIC_SSR_API_URL,
  },
}

module.exports = nextConfig
