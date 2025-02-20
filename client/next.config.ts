import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gstatic.com", // 🔹 Mantém suporte para Google
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // 🔹 Adiciona suporte para imagens do YouTube
      },
    ],
  },
};

export default nextConfig;
