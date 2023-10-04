/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
};

module.exports = nextConfig;
