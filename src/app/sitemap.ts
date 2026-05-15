import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { SITE_URL, STATIC_ROUTES } from "@/lib/seo";

/**
 * Динамический sitemap.xml для FastScore.
 * Покрывает все статические маршруты во всех локалях + alternates через languages,
 * чтобы поисковики понимали мультиязычную структуру.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of locales) {
      // Главная и live получают самый высокий приоритет и частоту обновлений.
      const isHome = route === "";
      const isLive = route === "/live";
      const isStaticLegal =
        route === "/terms" || route === "/privacy" || route === "/cookies";

      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: isLive
          ? "always"
          : isHome
          ? "hourly"
          : isStaticLegal
          ? "yearly"
          : "daily",
        priority: isHome ? 1.0 : isLive ? 0.95 : isStaticLegal ? 0.3 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
