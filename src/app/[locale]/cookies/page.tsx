import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import CookiesClient from "./cookies-client";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/cookies");
}

export default function CookiesPage() {
  return <CookiesClient />;
}
