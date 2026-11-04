/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray package-lock.json in the user's home folder made Next pick the wrong root (broke CSS hot reload)
  turbopack: {
    root: import.meta.dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
