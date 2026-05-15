import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLiveEventDetail, getPrematchEventDetail } from "@/lib/api-client";
import type { EventDetailResponse } from "@/types/api";
import EventClient from "./event-client";
import { locales, type Locale } from "@/i18n/config";
import { SITE_URL, SITE_NAME, ogLocaleMap } from "@/lib/seo";

type EventType = "live" | "prematch";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ type?: EventType }>;
}

/**
 * Server-side получение деталей события.
 * Если type указан — бьём в нужный источник.
 * Иначе — параллельно в оба, берём первый успешный.
 */
async function fetchEventDetail(
  sportEventId: number,
  type: EventType | undefined,
  locale: string
): Promise<EventDetailResponse | null> {
  if (type === "live") {
    const data = await getLiveEventDetail({ sportEventId, lng: locale });
    return data ? { source: "live", data } : null;
  }
  if (type === "prematch") {
    const data = await getPrematchEventDetail({ sportEventId, lng: locale });
    return data ? { source: "prematch", data } : null;
  }

  const [liveResult, prematchResult] = await Promise.allSettled([
    getLiveEventDetail({ sportEventId, lng: locale }),
    getPrematchEventDetail({ sportEventId, lng: locale }),
  ]);

  if (liveResult.status === "fulfilled" && liveResult.value) {
    return { source: "live", data: liveResult.value };
  }
  if (prematchResult.status === "fulfilled" && prematchResult.value) {
    return { source: "prematch", data: prematchResult.value };
  }
  return null;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const { type } = await searchParams;
  const sportEventId = parseInt(id, 10);
  if (Number.isNaN(sportEventId)) return { title: "Event" };

  const result = await fetchEventDetail(sportEventId, type, locale);
  if (!result) return { title: "Event" };

  const { data } = result;
  const team1 = data.opponent1NameLocalization || "Team 1";
  const team2 = data.opponent2NameLocalization || "Team 2";
  const tournament = data.tournamentNameLocalization || "";
  const title = `${team1} vs ${team2}${tournament ? ` — ${tournament}` : ""}`;
  const description = tournament
    ? `${team1} vs ${team2} live score, statistics and updates. ${tournament}.`
    : `${team1} vs ${team2} live score, statistics and updates.`;

  const url = `${SITE_URL}/${locale}/events/${id}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}/events/${id}`])
  );
  languages["x-default"] = `${SITE_URL}/en/events/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocaleMap[locale as Locale] ?? "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventDetailPage({ params, searchParams }: PageProps) {
  const { locale, id } = await params;
  const { type } = await searchParams;
  const sportEventId = parseInt(id, 10);
  if (Number.isNaN(sportEventId)) notFound();

  const initialData = await fetchEventDetail(sportEventId, type, locale);
  if (!initialData) notFound();

  // JSON-LD SportsEvent — даёт Google расширенный сниппет с командами и временем.
  const { data } = initialData;
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `${data.opponent1NameLocalization} vs ${data.opponent2NameLocalization}`,
    startDate: data.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    location: {
      "@type": "VirtualLocation",
      url: `${SITE_URL}/${locale}/events/${id}`,
    },
    competitor: [
      { "@type": "SportsTeam", name: data.opponent1NameLocalization },
      { "@type": "SportsTeam", name: data.opponent2NameLocalization },
    ],
    ...(data.tournamentNameLocalization && {
      superEvent: {
        "@type": "SportsEvent",
        name: data.tournamentNameLocalization,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <EventClient id={id} type={type} locale={locale} initialData={initialData} />
    </>
  );
}
