import { NextRequest, NextResponse } from "next/server";
import { fetchSportsNews } from "@/lib/news-client";
import { mixWithPromo } from "@/lib/promo-news";
import { getCached, setCached } from "@/lib/cache";

const CACHE_KEY = "news";
const CACHE_TTL = 900; // 15 минут

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "all";
  const count = parseInt(searchParams.get("count") || "20", 10);
  const lang = searchParams.get("lng") || "en";

  const cacheKey = `${CACHE_KEY}:${category}:${count}:${lang}`;

  // Проверяем кэш
  const cached = getCached<ReturnType<typeof mixWithPromo>>(cacheKey);
  if (cached) {
    return NextResponse.json({ items: cached });
  }

  try {
    // Получаем реальные новости
    const realNews = await fetchSportsNews({ category, count, lang });

    // Миксуем с промо-новостями (1 промо на каждые 3 реальные)
    const mixed = mixWithPromo(realNews, 3);

    // Кэшируем
    setCached(cacheKey, mixed, CACHE_TTL);

    return NextResponse.json({ items: mixed });
  } catch (error) {
    console.error("[news route] Error:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
