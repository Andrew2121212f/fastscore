import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

// Базовый URL сайта. На Vercel автоматически проставляется через NEXT_PUBLIC_SITE_URL.
// Локально — дефолт.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://fastscore.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "VivatBet";

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
    title: "VivatBet — Live Sports Scores & Match Center",
    description:
      "Real-time scores, fixtures and results across 500+ leagues. Football, basketball, tennis and 30+ sports. Powered by Vivat Sport.",
    keywords: ["live scores", "sports results", "football scores", "vivat sport", "belgium"],
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
    title: "About VivatBet — Live Sports by Vivat Sport",
    description:
      "VivatBet is the live scores and match-center experience by Vivat Sport. Real-time data across 500+ leagues for the Belgian market.",
    keywords: ["about fastscore", "vivat sport", "belgium betting", "sports data"],
  },
  "/contact": {
    title: "Contact VivatBet — Get in Touch",
    description:
      "Questions, feedback or business inquiries? Reach the VivatBet team directly at info@vivatbetsport.be or via the contact form.",
  },
  "/terms": {
    title: "Terms of Service — VivatBet",
    description:
      "Terms of service for VivatBet by Vivat Sport. Read the rules and conditions that govern your use of the website.",
  },
  "/privacy": {
    title: "Privacy Policy — VivatBet",
    description:
      "How VivatBet (Vivat Sport) collects, uses and protects your personal data. GDPR-aligned privacy practices.",
  },
  "/cookies": {
    title: "Cookie Policy — VivatBet",
    description:
      "Which cookies VivatBet uses, why we use them, and how you can manage your preferences at any time.",
  },
};

const seoFR: SeoDictionary = {
  "": {
    title: "VivatBet — Scores en direct & Centre des matchs",
    description:
      "Scores en temps réel, calendrier et résultats dans plus de 500 ligues. Football, basket, tennis et 30+ sports. Propulsé par Vivat Sport.",
    keywords: ["scores en direct", "résultats sportifs", "scores football", "vivat sport", "belgique"],
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
    title: "À propos de VivatBet — Vivat Sport",
    description:
      "VivatBet est l'expérience de scores en direct et de centre des matchs proposée par Vivat Sport pour le marché belge.",
    keywords: ["à propos fastscore", "vivat sport", "paris belgique"],
  },
  "/contact": {
    title: "Contact VivatBet — Nous joindre",
    description:
      "Questions ou demandes ? Contactez l'équipe VivatBet à info@vivatbetsport.be ou via le formulaire de contact.",
  },
  "/terms": {
    title: "Conditions d'utilisation — VivatBet",
    description:
      "Conditions d'utilisation de VivatBet par Vivat Sport. Lisez les règles qui régissent votre utilisation du site.",
  },
  "/privacy": {
    title: "Politique de confidentialité — VivatBet",
    description:
      "Comment VivatBet (Vivat Sport) collecte, utilise et protège vos données personnelles. Conforme au RGPD.",
  },
  "/cookies": {
    title: "Politique de cookies — VivatBet",
    description:
      "Quels cookies VivatBet utilise, pourquoi et comment vous pouvez gérer vos préférences à tout moment.",
  },
};

const seoNL: SeoDictionary = {
  "": {
    title: "VivatBet — Live sportuitslagen & Wedstrijdcentrum",
    description:
      "Realtime uitslagen, kalender en resultaten in 500+ competities. Voetbal, basketbal, tennis en 30+ sporten. Aangedreven door Vivat Sport.",
    keywords: ["live uitslagen", "sportuitslagen", "voetbal uitslagen", "vivat sport", "belgië"],
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
    title: "Over VivatBet — Live sport door Vivat Sport",
    description:
      "VivatBet is de live uitslagen- en wedstrijdcentrumervaring van Vivat Sport voor de Belgische markt.",
    keywords: ["over fastscore", "vivat sport", "weddenschappen belgië"],
  },
  "/contact": {
    title: "Contact VivatBet — Neem contact op",
    description:
      "Vragen of feedback? Bereik het VivatBet-team via info@vivatbetsport.be of het contactformulier.",
  },
  "/terms": {
    title: "Gebruiksvoorwaarden — VivatBet",
    description:
      "Gebruiksvoorwaarden van VivatBet by Vivat Sport. Lees de regels die uw gebruik van de website regelen.",
  },
  "/privacy": {
    title: "Privacybeleid — VivatBet",
    description:
      "Hoe VivatBet (Vivat Sport) uw persoonsgegevens verzamelt, gebruikt en beschermt. AVG-conform.",
  },
  "/cookies": {
    title: "Cookiebeleid — VivatBet",
    description:
      "Welke cookies VivatBet gebruikt, waarom en hoe u uw voorkeuren op elk moment kunt beheren.",
  },
};

const seoDE: SeoDictionary = {
  "": {
    title: "VivatBet — Live-Sportergebnisse & Match-Center",
    description:
      "Echtzeit-Ergebnisse, Spielpläne und Resultate in über 500 Ligen. Fußball, Basketball, Tennis und 30+ Sportarten. Powered by Vivat Sport.",
    keywords: ["live ergebnisse", "sportergebnisse", "fußball ergebnisse", "vivat sport", "belgien"],
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
    title: "Über VivatBet — Live-Sport von Vivat Sport",
    description:
      "VivatBet ist das Live-Ergebnisse- und Match-Center-Erlebnis von Vivat Sport für den belgischen Markt.",
    keywords: ["über fastscore", "vivat sport", "wetten belgien"],
  },
  "/contact": {
    title: "Kontakt VivatBet — Schreiben Sie uns",
    description:
      "Fragen oder Feedback? Erreichen Sie das VivatBet-Team unter info@vivatbetsport.be oder über das Kontaktformular.",
  },
  "/terms": {
    title: "Nutzungsbedingungen — VivatBet",
    description:
      "Nutzungsbedingungen von VivatBet by Vivat Sport. Lesen Sie die Regeln, die Ihre Nutzung der Website regeln.",
  },
  "/privacy": {
    title: "Datenschutzerklärung — VivatBet",
    description:
      "Wie VivatBet (Vivat Sport) Ihre personenbezogenen Daten erfasst, nutzt und schützt. DSGVO-konform.",
  },
  "/cookies": {
    title: "Cookie-Richtlinie — VivatBet",
    description:
      "Welche Cookies VivatBet verwendet, warum und wie Sie Ihre Einstellungen jederzeit verwalten können.",
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
    // absolute, чтобы template "%s | VivatBet" из root layout не добавлял хвост —
    // наши тайтлы уже содержат "VivatBet" в нужном месте.
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
          alt: `${SITE_NAME} — Live Sports by Vivat Sport`,
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
