import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/register-pi",
        destination: "https://forms.gle/sBAacjaqMbE8e3Bg9",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
