import { NextRequest, NextResponse } from "next/server";
import { fetchSportsNews } from "@/lib/news-client";
import { mixWithPromo } from "@/lib/promo-news";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "all";
  const count = parseInt(searchParams.get("count") || "20", 10);
  const lang = searchParams.get("lng") || "en";

  try {
    // Получаем реальные новости
    const realNews = await fetchSportsNews({ category, count, lang });

    // Миксуем с промо-новостями (1 промо на каждые 3 реальные)
    const mixed = mixWithPromo(realNews, 3);

    return NextResponse.json({ items: mixed });
  } catch (error) {
    console.error("[news route] Error:", error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
