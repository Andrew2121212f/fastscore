"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ArrowRight, ExternalLink, Newspaper,
} from "lucide-react";
import Link from "next/link";
import { useLiveEvents } from "@/hooks/use-live-events";
import { usePrematchEvents } from "@/hooks/use-prematch-events";
import { useNews } from "@/hooks/use-news";
import { EXTERNAL_PLATFORM } from "@/lib/constants";
import type { NewsArticle } from "@/types/news";
import { groupBy, cn } from "@/lib/utils";
import { TournamentLogo } from "@/components/sports/team-logo";
import MatchRow from "@/components/sports/match-row";
import {
  MOCK_LIVE_EVENTS, MOCK_PREMATCH_EVENTS,
  POPULAR_LEAGUES,
} from "@/lib/mock-data";
import PromoBanner from "@/components/promo/promo-banner";
import { getLocalLeagueLogo } from "@/lib/league-logos";
import { useTheme } from "@/components/theme-provider";
import { TournamentGroupSkeleton } from "@/components/ui/skeletons";

export default function HomeClient() {
  const t = useTranslations("home");
  const locale = useLocale();

  const { theme } = useTheme();
  const { data: liveData, isLoading: liveLoading } = useLiveEvents(undefined, locale);
  const { data: prematchData, isLoading: prematchLoading } = usePrematchEvents(undefined, locale);
  const { data: newsData } = useNews(undefined, locale);
  const newsArticles = (newsData?.items || []).slice(0, 4);

  const liveEvents = (liveData?.items?.length ? liveData.items : MOCK_LIVE_EVENTS) as any[];
  const prematchEvents = (prematchData?.items?.length ? prematchData.items : MOCK_PREMATCH_EVENTS) as any[];
  const groupedPrematch = groupBy(prematchEvents, (e: any) => e.tournamentNameLocalization || "Other");
  const groupedLive = groupBy(liveEvents, (e: any) => e.tournamentNameLocalization || "Other");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Live + Upcoming */}
        <div className="xl:col-span-2 space-y-5">
          {/* Live Now */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-accent-green animate-pulse-live" />
              <h2 className="text-base font-bold">{t("liveNow")}</h2>
              {liveEvents.length > 0 && (
                <span className="text-xs font-bold text-accent-green bg-accent-green/10 px-2 py-0.5 rounded-lg">{liveEvents.length} live</span>
              )}
            </div>
            <Link href={`/${locale}/live`} className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:underline">
              {t("seeAll")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {liveLoading ? (
            <div className="space-y-3">{[...Array(2)].map((_, i) => <TournamentGroupSkeleton key={i} rows={3} />)}</div>
          ) : liveEvents.length === 0 ? (
            <div className="card p-8 text-center text-sm text-text-muted">{t("noLiveEvents")}</div>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedLive).slice(0, 6).map(([tournament, events]: [string, any[]]) => (
                <div key={tournament} className="card overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-surface/50">
                    <TournamentLogo images={events[0]?.tournamentImage} name={tournament} sportId={events[0]?.sportId} />
                    <span className="text-xs font-bold">{tournament}</span>
                    <span className="text-xs text-text-muted ml-auto">{events.length} matches</span>
                  </div>
                  <div className="divide-y divide-border">
                    {events.slice(0, 4).map((event: any) => (
                      <MatchRow key={event.sportEventId} event={event} mode="live" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Today's Matches */}
          <div className="flex items-center justify-between mt-4">
            <h2 className="text-base font-bold">{t("todayMatches")}</h2>
            <Link href={`/${locale}/matches`} className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:underline">
              {t("seeAll")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {prematchLoading ? (
            <div className="space-y-3">{[...Array(2)].map((_, i) => <TournamentGroupSkeleton key={i} rows={4} />)}</div>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedPrematch).slice(0, 5).map(([tournament, events]: [string, any[]]) => (
                <div key={tournament} className="card overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-surface/50">
                    <TournamentLogo images={events[0]?.tournamentImage} name={tournament} sportId={events[0]?.sportId} />
                    <span className="text-xs font-bold">{tournament}</span>
                    <span className="text-xs text-text-muted ml-auto">{events.length} matches</span>
                  </div>
                  <div className="divide-y divide-border">
                    {events.slice(0, 4).map((event: any) => (
                      <MatchRow key={event.sportEventId} event={event} mode="prematch" />
                    ))}
                  </div>
                  <a href={EXTERNAL_PLATFORM} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-border text-xs font-semibold text-brand-orange hover:bg-brand-orange/5 transition-colors">
                    Bet on Vivat Sport <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Блок новостей на дашборде */}
          {newsArticles.length > 0 && (
            <>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-brand-orange" />
                  <h2 className="text-base font-bold">Latest News</h2>
                </div>
                <Link href={`/${locale}/news`} className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:underline">
                  {t("seeAll")} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {newsArticles.map((article: NewsArticle) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target={article.isPromo ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="card card-interactive overflow-hidden group cursor-pointer flex gap-3 p-3"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                      {/* Используем img т.к. домены картинок из API непредсказуемы */}
                      <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop"; }} />
                      {article.isPromo && (
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[9px] font-medium text-white/70 bg-black/40 backdrop-blur-sm rounded">
                          Sponsored
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-brand-orange uppercase">{article.category}</span>
                        <span className="text-[10px] text-text-muted">{article.source}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[11px] text-text-muted mt-1 line-clamp-1">{article.excerpt}</p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold mb-3">Popular Leagues</h3>
            <div className="space-y-2">
              {POPULAR_LEAGUES.map((league) => {
                const logoPath = getLocalLeagueLogo(league.logoKey, theme as "dark" | "light");
                return (
                  <a key={league.name} href={EXTERNAL_PLATFORM} target="_blank" rel="noopener noreferrer" className="card p-3 flex items-center gap-3 cursor-pointer group hover:border-brand-orange/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface shrink-0 p-1.5">
                      {logoPath ? (
                        <img src={logoPath} alt={league.name} className="w-full h-full" style={{ objectFit: "contain" }} />
                      ) : (
                        <span className="text-lg">{league.emoji}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate group-hover:text-brand-orange transition-colors">{league.name}</p>
                      <p className="text-xs text-text-muted">{league.emoji} {league.country}</p>
                    </div>
                    <span className="text-xs font-bold text-text-muted bg-surface px-2 py-0.5 rounded-md">{league.matches}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <PromoBanner variant={1} className="" />
          <PromoBanner variant={2} className="" />
        </div>
      </div>
    </div>
  );
}
