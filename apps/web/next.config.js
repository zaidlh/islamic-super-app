/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@islamic-app/shared",
    "@islamic-app/quran-engine",
    "@islamic-app/hadith-engine",
    "@islamic-app/ui",
  ],
  experimental: {
    serverComponentsExternalPackages: [],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.quran.com",
      },
      {
        protocol: "https",
        hostname: "verses.quran.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
