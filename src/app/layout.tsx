import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

export const metadata: Metadata = {
  title: {
    default: "FastScore — Live Sports Scores & Odds | Vivat Sport",
    template: "%s | FastScore",
  },
  description:
    "Live sports scores, real-time odds, match results and statistics. Football, basketball, tennis and 30+ sports. Powered by Vivat Sport.",
  keywords: ["live scores", "sports", "odds", "football", "basketball", "tennis", "Vivat Sport", "Belgium", "betting"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fastscore-be.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "FastScore",
    locale: "en_GB",
    title: "FastScore — Live Sports Scores & Odds",
    description: "Real-time scores across 500+ leagues. Compare odds. Powered by Vivat Sport.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastScore — Live Sports Scores & Odds",
    description: "Real-time scores across 500+ leagues. Powered by Vivat Sport.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0b0f1a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
