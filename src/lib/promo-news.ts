import type { NewsArticle } from "@/types/news";
import { EXTERNAL_PLATFORM } from "@/lib/constants";

/**
 * Промо-новости Vivat Sport.
 * Выглядят как обычные статьи, но ведут на vivatsport.be.
 */
export const PROMO_NEWS: NewsArticle[] = [
  {
    id: "promo-1",
    title: "Welcome Bonus: Get 100% on Your First Deposit",
    excerpt: "New to Vivat Sport? Start with a bang — double your first deposit up to €100 and place your first bets with extra confidence.",
    url: EXTERNAL_PLATFORM,
    imageUrl: "/banners/vivat-promo-1.png",
    source: "Vivat Sport",
    category: "Promotion",
    publishedAt: new Date().toISOString(),
    isPromo: true,
  },
  {
    id: "promo-2",
    title: "Free Bet €10 Every Weekend on Football",
    excerpt: "Place a qualifying bet on any football match during the week and receive a €10 free bet for the weekend action.",
    url: EXTERNAL_PLATFORM,
    imageUrl: "/banners/vivat-promo-2.png",
    source: "Vivat Sport",
    category: "Promotion",
    publishedAt: new Date().toISOString(),
    isPromo: true,
  },
  {
    id: "promo-3",
    title: "Best Odds Guaranteed on Belgian Pro League",
    excerpt: "We guarantee the best odds on all Jupiler Pro League matches. If you find better odds elsewhere, we'll match them.",
    url: EXTERNAL_PLATFORM,
    imageUrl: "/banners/vivat-promo-1.png",
    source: "Vivat Sport",
    category: "Promotion",
    publishedAt: new Date().toISOString(),
    isPromo: true,
  },
  {
    id: "promo-4",
    title: "VIP Program: Earn Rewards on Every Bet",
    excerpt: "Join the Vivat Sport VIP club and earn loyalty points with every bet. Redeem for free bets, cashback, and exclusive experiences.",
    url: EXTERNAL_PLATFORM,
    imageUrl: "/banners/vivat-promo-2.png",
    source: "Vivat Sport",
    category: "Promotion",
    publishedAt: new Date().toISOString(),
    isPromo: true,
  },
];

/**
 * Миксует реальные новости с промо.
 * Вставляет 1 промо после каждых promoInterval реальных статей.
 */
export function mixWithPromo(realNews: NewsArticle[], promoInterval = 3): NewsArticle[] {
  const result: NewsArticle[] = [];
  let promoIndex = 0;

  for (let i = 0; i < realNews.length; i++) {
    result.push(realNews[i]);

    // После каждых promoInterval статей — промо
    if ((i + 1) % promoInterval === 0 && promoIndex < PROMO_NEWS.length) {
      result.push(PROMO_NEWS[promoIndex]);
      promoIndex++;
    }
  }

  return result;
}
