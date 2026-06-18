import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

// Базовый URL сайта. На Vercel автоматически проставляется через NEXT_PUBLIC_SITE_URL.
// Локально — дефолт.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fastscore.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "FastScore";

// Соответствие локали → код языка в OG/HTML (важно для hreflang).
export const ogLocaleMap: Record<Locale, string> = {
  en: "en_GB",
  fr: "fr_BE",
  nl: "nl_BE",
  de: "de_DE",
};

// Карта статических роутов, по которым строится sitemap и hreflang.
export const STATIC_ROUTES = [
  "",
  "/live",
  "/matches",
  "/results",
  "/news",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/cookies",
] as const;

export type StaticRoute = (typeof STATIC_ROUTES)[number];

// Локализованные SEO-пресеты для всех ключевых страниц.
// title рассчитан на ~50-60 символов, description — на ~140-160.
type RouteSeo = { title: string; description: string; keywords?: string[] };

type SeoDictionary = Record<StaticRoute, RouteSeo>;

const seoEN: SeoDictionary = {
  "": {
    title: "FastScore — Live Sports Scores & Match Center",
    description:
      "Real-time scores, fixtures and results across 500+ leagues. Football, basketball, tennis and 30+ sports. Powered by FastScore.",
    keywords: ["live scores", "sports results", "football scores", "fastscore", "belgium"],
  },
  "/live": {
    title: "Live Scores — Every Match Right Now",
    description:
      "All live sports happening right now: football, basketball, tennis, hockey and more. Real-time score updates, period and timing details.",
    keywords: ["live scores", "live football", "in-play matches", "live sports"],
  },
  "/matches": {
    title: "Upcoming Matches & Fixture Schedule",
    description:
      "Full fixture calendar with kick-off times across the most followed leagues and tournaments. Plan your viewing in one place.",
    keywords: ["upcoming matches", "fixtures", "match schedule", "kick-off times"],
  },
  "/results": {
    title: "Match Results — Final Scores & Recaps",
    description:
      "Latest final scores from football, basketball, tennis and more. Browse tournament-by-tournament results across hundreds of competitions.",
    keywords: ["match results", "final scores", "football results", "sports results"],
  },
  "/news": {
    title: "Sports News — Daily Updates & Analysis",
    description:
      "Daily sports news, match recaps, transfers and analysis across football, basketball, tennis and 30+ sports.",
    keywords: ["sports news", "football news", "match recaps", "sports analysis"],
  },
  "/about": {
    title: "About FastScore — Live Sports by FastScore",
    description:
      "FastScore is the live scores and match-center experience by FastScore. Real-time data across 500+ leagues for the Belgian market.",
    keywords: ["about fastscore", "fastscore", "belgium betting", "sports data"],
  },
  "/contact": {
    title: "Contact FastScore — Get in Touch",
    description:
      "Questions, feedback or business inquiries? Reach the FastScore team directly at info@fastscore.be or via the contact form.",
  },
  "/terms": {
    title: "Terms of Service — FastScore",
    description:
      "Terms of service for FastScore by FastScore. Read the rules and conditions that govern your use of the website.",
  },
  "/privacy": {
    title: "Privacy Policy — FastScore",
    description:
      "How FastScore (FastScore) collects, uses and protects your personal data. GDPR-aligned privacy practices.",
  },
  "/cookies": {
    title: "Cookie Policy — FastScore",
    description:
      "Which cookies FastScore uses, why we use them, and how you can manage your preferences at any time.",
  },
};

const seoFR: SeoDictionary = {
  "": {
    title: "FastScore — Scores en direct & Centre des matchs",
    description:
      "Scores en temps réel, calendrier et résultats dans plus de 500 ligues. Football, basket, tennis et 30+ sports. Propulsé par FastScore.",
    keywords: ["scores en direct", "résultats sportifs", "scores football", "fastscore", "belgique"],
  },
  "/live": {
    title: "Scores en direct — Tous les matchs en cours",
    description:
      "Tous les matchs en cours en temps réel : football, basket, tennis, hockey et plus. Scores et minutages mis à jour à la seconde.",
    keywords: ["scores en direct", "football en direct", "matchs live", "sport en direct"],
  },
  "/matches": {
    title: "Matchs à venir & Calendrier",
    description:
      "Calendrier complet des matchs à venir avec horaires de coup d'envoi pour les principales ligues et tournois. Tout au même endroit.",
    keywords: ["matchs à venir", "calendrier", "coup d'envoi", "fixtures"],
  },
  "/results": {
    title: "Résultats des matchs — Scores finaux",
    description:
      "Derniers scores finaux du football, basket, tennis et plus. Parcourez les résultats par tournoi dans des centaines de compétitions.",
    keywords: ["résultats matchs", "scores finaux", "résultats football"],
  },
  "/news": {
    title: "Actualités sportives — Mises à jour quotidiennes",
    description:
      "Actualités sportives quotidiennes, résumés de matchs, transferts et analyses sur le football, basket, tennis et 30+ sports.",
    keywords: ["actualités sport", "actualités football", "résumés matchs"],
  },
  "/about": {
    title: "À propos de FastScore — FastScore",
    description:
      "FastScore est l'expérience de scores en direct et de centre des matchs proposée par FastScore pour le marché belge.",
    keywords: ["à propos fastscore", "fastscore", "paris belgique"],
  },
  "/contact": {
    title: "Contact FastScore — Nous joindre",
    description:
      "Questions ou demandes ? Contactez l'équipe FastScore à info@fastscore.be ou via le formulaire de contact.",
  },
  "/terms": {
    title: "Conditions d'utilisation — FastScore",
    description:
      "Conditions d'utilisation de FastScore par FastScore. Lisez les règles qui régissent votre utilisation du site.",
  },
  "/privacy": {
    title: "Politique de confidentialité — FastScore",
    description:
      "Comment FastScore (FastScore) collecte, utilise et protège vos données personnelles. Conforme au RGPD.",
  },
  "/cookies": {
    title: "Politique de cookies — FastScore",
    description:
      "Quels cookies FastScore utilise, pourquoi et comment vous pouvez gérer vos préférences à tout moment.",
  },
};

const seoNL: SeoDictionary = {
  "": {
    title: "FastScore — Live sportuitslagen & Wedstrijdcentrum",
    description:
      "Realtime uitslagen, kalender en resultaten in 500+ competities. Voetbal, basketbal, tennis en 30+ sporten. Aangedreven door FastScore.",
    keywords: ["live uitslagen", "sportuitslagen", "voetbal uitslagen", "fastscore", "belgië"],
  },
  "/live": {
    title: "Live uitslagen — Alle wedstrijden nu",
    description:
      "Alle live sportwedstrijden nu: voetbal, basketbal, tennis, ijshockey en meer. Realtime updates van scores en speeltijd.",
    keywords: ["live uitslagen", "live voetbal", "in-play", "live sport"],
  },
  "/matches": {
    title: "Komende wedstrijden & Speelschema",
    description:
      "Volledig speelschema met aanvangstijden van de meest gevolgde competities en toernooien. Plan je kijkavond op één plek.",
    keywords: ["komende wedstrijden", "speelschema", "aanvangstijden"],
  },
  "/results": {
    title: "Wedstrijdresultaten — Eindstanden",
    description:
      "Recente eindstanden in voetbal, basketbal, tennis en meer. Bekijk resultaten per toernooi in honderden competities.",
    keywords: ["wedstrijdresultaten", "eindstanden", "voetbaluitslagen"],
  },
  "/news": {
    title: "Sportnieuws — Dagelijkse updates",
    description:
      "Dagelijks sportnieuws, wedstrijdrecaps, transfers en analyses van voetbal, basketbal, tennis en 30+ sporten.",
    keywords: ["sportnieuws", "voetbalnieuws", "wedstrijdrecaps"],
  },
  "/about": {
    title: "Over FastScore — Live sport door FastScore",
    description:
      "FastScore is de live uitslagen- en wedstrijdcentrumervaring van FastScore voor de Belgische markt.",
    keywords: ["over fastscore", "fastscore", "weddenschappen belgië"],
  },
  "/contact": {
    title: "Contact FastScore — Neem contact op",
    description:
      "Vragen of feedback? Bereik het FastScore-team via info@fastscore.be of het contactformulier.",
  },
  "/terms": {
    title: "Gebruiksvoorwaarden — FastScore",
    description:
      "Gebruiksvoorwaarden van FastScore by FastScore. Lees de regels die uw gebruik van de website regelen.",
  },
  "/privacy": {
    title: "Privacybeleid — FastScore",
    description:
      "Hoe FastScore (FastScore) uw persoonsgegevens verzamelt, gebruikt en beschermt. AVG-conform.",
  },
  "/cookies": {
    title: "Cookiebeleid — FastScore",
    description:
      "Welke cookies FastScore gebruikt, waarom en hoe u uw voorkeuren op elk moment kunt beheren.",
  },
};

const seoDE: SeoDictionary = {
  "": {
    title: "FastScore — Live-Sportergebnisse & Match-Center",
    description:
      "Echtzeit-Ergebnisse, Spielpläne und Resultate in über 500 Ligen. Fußball, Basketball, Tennis und 30+ Sportarten. Powered by FastScore.",
    keywords: ["live ergebnisse", "sportergebnisse", "fußball ergebnisse", "fastscore", "belgien"],
  },
  "/live": {
    title: "Live-Ergebnisse — Alle Spiele jetzt",
    description:
      "Alle Live-Sportspiele in Echtzeit: Fußball, Basketball, Tennis, Eishockey und mehr. Sekundenaktuelle Spielstände und Spielzeiten.",
    keywords: ["live ergebnisse", "live fußball", "in-play", "live sport"],
  },
  "/matches": {
    title: "Kommende Spiele & Spielplan",
    description:
      "Vollständiger Spielplan mit Anstoßzeiten der wichtigsten Ligen und Turniere. Alles an einem Ort.",
    keywords: ["kommende spiele", "spielplan", "anstoßzeiten"],
  },
  "/results": {
    title: "Spielergebnisse — Endstände",
    description:
      "Neueste Endstände aus Fußball, Basketball, Tennis und mehr. Ergebnisse turnierweise aus hunderten Wettbewerben.",
    keywords: ["spielergebnisse", "endstände", "fußball ergebnisse"],
  },
  "/news": {
    title: "Sportnachrichten — Tägliche Updates",
    description:
      "Tägliche Sportnachrichten, Spielzusammenfassungen, Transfers und Analysen aus Fußball, Basketball, Tennis und 30+ Sportarten.",
    keywords: ["sportnachrichten", "fußball nachrichten", "spielzusammenfassungen"],
  },
  "/about": {
    title: "Über FastScore — Live-Sport von FastScore",
    description:
      "FastScore ist das Live-Ergebnisse- und Match-Center-Erlebnis von FastScore für den belgischen Markt.",
    keywords: ["über fastscore", "fastscore", "wetten belgien"],
  },
  "/contact": {
    title: "Kontakt FastScore — Schreiben Sie uns",
    description:
      "Fragen oder Feedback? Erreichen Sie das FastScore-Team unter info@fastscore.be oder über das Kontaktformular.",
  },
  "/terms": {
    title: "Nutzungsbedingungen — FastScore",
    description:
      "Nutzungsbedingungen von FastScore by FastScore. Lesen Sie die Regeln, die Ihre Nutzung der Website regeln.",
  },
  "/privacy": {
    title: "Datenschutzerklärung — FastScore",
    description:
      "Wie FastScore (FastScore) Ihre personenbezogenen Daten erfasst, nutzt und schützt. DSGVO-konform.",
  },
  "/cookies": {
    title: "Cookie-Richtlinie — FastScore",
    description:
      "Welche Cookies FastScore verwendet, warum und wie Sie Ihre Einstellungen jederzeit verwalten können.",
  },
};

const seoByLocale: Record<Locale, SeoDictionary> = {
  en: seoEN,
  fr: seoFR,
  nl: seoNL,
  de: seoDE,
};

/**
 * Возвращает SEO-пресет для пары (locale, route).
 * Если route неизвестен — фоллбэк на главную.
 */
export function getRouteSeo(locale: Locale, route: StaticRoute): RouteSeo {
  return seoByLocale[locale][route] ?? seoByLocale[locale][""];
}

/**
 * Строит canonical-ссылку и hreflang-альтернативы для пары (locale, route).
 * Возвращает объект, который пробрасывается в Metadata.alternates.
 */
export function buildAlternates(locale: Locale, route: StaticRoute) {
  const canonical = `${SITE_URL}/${locale}${route}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${SITE_URL}/${l}${route}`;
  }
  // x-default → английская версия (Бельгия мультиязычна, en — наиболее нейтральный fallback)
  languages["x-default"] = `${SITE_URL}/en${route}`;
  return { canonical, languages };
}

/**
 * Главный helper: возвращает готовый Metadata-объект для серверной generateMetadata.
 * Используется в page.tsx статических локализованных страниц.
 */
export function buildPageMetadata(locale: Locale, route: StaticRoute): Metadata {
  const seo = getRouteSeo(locale, route);
  const alternates = buildAlternates(locale, route);
  const url = alternates.canonical;

  return {
    // absolute, чтобы template "%s | FastScore" из root layout не добавлял хвост —
    // наши тайтлы уже содержат "FastScore" в нужном месте.
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates,
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      locale: ogLocaleMap[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l]),
      images: [
        {
          url: `${SITE_URL}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Live Sports by FastScore`,
          type: "image/svg+xml",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [`${SITE_URL}/og-image.svg`],
    },
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
}
