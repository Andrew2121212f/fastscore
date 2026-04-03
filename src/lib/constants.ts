export const API_BASE_URL = process.env.API_BASE_URL || "";
export const API_CLIENT_ID = process.env.API_CLIENT_ID || "";
export const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || "";
export const API_REF = parseInt(process.env.API_REF || "282", 10);

export const CACHE_TTL = {
  TOKEN: 3500,
  DICTIONARIES: 3600,
  PREMATCH: 20,
  LIVE: 5,
  RESULTS: 300,
} as const;

export const SPORT_ICONS: Record<number, string> = {
  1: "⚽",
  2: "🏒",
  3: "🏀",
  4: "🎾",
  5: "🏓",
  6: "⚾",
  8: "🤾",
  9: "🏐",
  10: "🏉",
  14: "🥊",
  15: "🥋",
  30: "🎮",
  36: "🏏",
};

export const PARTNER_LINK = "fastscore.be/bet";

// Ссылка на внешнюю платформу (используется по всему сайту)
export const EXTERNAL_PLATFORM = "https://vivatsport.be";

// Маппинг sport ID → slug для SVG-иконок в public/icons/sports/
export const SPORT_ICON_SLUGS: Record<number, string> = {
  1: "football",
  2: "hockey",
  3: "basketball",
  4: "tennis",
  5: "ping-pong",
  6: "baseball",
  8: "handball",
  9: "volleyball",
  10: "rugby",
  14: "boxing",
  15: "mma",
  30: "esports",
  36: "cricket",
};
