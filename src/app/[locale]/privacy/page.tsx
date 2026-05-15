import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";
import PrivacyClient from "./privacy-client";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/privacy");
}

export default function PrivacyPage() {
  return <PrivacyClient />;
}
