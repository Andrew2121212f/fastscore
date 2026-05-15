import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";
import HomeClient from "./home-client";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "");
}

// JSON-LD: SportsOrganization + сайт-уровневая навигация для главной.
// Помогает Google формировать sitelinks и понимать структуру разделов.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FastScore",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/{locale}/matches?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
