import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f1a" },
  ],
};

// Базовые метаданные на уровне корневого layout. Локализованные значения
// (title, description, alternates) приходят из [locale]/* через generateMetadata.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Live Sports Scores & Match Center | FastScore`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Live sports scores, fixtures, results and statistics. Football, basketball, tennis and 30+ sports. Powered by FastScore.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "FastScore" }],
  creator: "FastScore",
  publisher: "FastScore",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon-192.svg",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD: Organization + WebSite — структурированные данные для Google.
// Кладём в корневой layout, чтобы они присутствовали на всех страницах.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FastScore",
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.svg`,
  email: "info@fastscore.be",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@fastscore.be",
      availableLanguage: ["English", "French", "Dutch", "German"],
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: ["en", "fr", "nl", "de"],
  publisher: {
    "@type": "Organization",
    name: "FastScore",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Берём активную локаль через next-intl — она ставится middleware.
  // Если запрос пришёл вне локализованного маршрута, getLocale возвращает defaultLocale.
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
