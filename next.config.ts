import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // standalone output включаем ТОЛЬКО при BUILD_STANDALONE=1 (Docker self-hosted).
  // На Vercel оставляем дефолт — standalone там ломает локализованные маршруты
  // [locale]/* (страницы рендерились пустыми = чёрный экран).
  // Dockerfile передаёт BUILD_STANDALONE=1 в builder stage.
  ...(process.env.BUILD_STANDALONE === "1" ? { output: "standalone" as const } : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
