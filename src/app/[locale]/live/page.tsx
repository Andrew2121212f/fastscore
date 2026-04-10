"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, ExternalLink, Loader2 } from "lucide-react";
import { useLiveEvents } from "@/hooks/use-live-events";
import { SPORT_IDS } from "@/types/api";
import { EXTERNAL_PLATFORM } from "@/lib/constants";
import { groupBy, formatMatchTime, cn } from "@/lib/utils";
import { TeamLogo, TournamentLogo } from "@/components/sports/team-logo";
import SportTabs from "@/components/sports/sport-tabs";
import { MOCK_LIVE_EVENTS } from "@/lib/mock-data";
import PromoBanner from "@/components/promo/promo-banner";
import { TournamentGroupSkeleton } from "@/components/ui/skeletons";

export default function LivePage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sportFromUrl = searchParams.get("sport");
  const [activeSport, setActiveSport] = useState<string | null>(sportFromUrl);

  useEffect(() => {
    setActiveSport(sportFromUrl);
  }, [sportFromUrl]);

  const handleSportChange = (slug: string | null) => {
    setActiveSport(slug);
    if (slug) {
      router.replace(`/${locale}/live?sport=${slug}`, { scroll: false });
    } else {
      router.replace(`/${locale}/live`, { scroll: false });
    }
  };

  const sportId = activeSport ? String(SPORT_IDS[activeSport]) : undefined;
  const { data, isLoading, isFetching, dataUpdatedAt } = useLiveEvents(sportId, locale);
  const isRefreshing = isFetching && !isLoading;

  const events = (data?.items?.length ? data.items : MOCK_LIVE_EVENTS) as any[];
  const grouped = groupBy(events, (e: any) => e.tournamentNameLocalization || "Other");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <SportTabs active={activeSport} onChange={handleSportChange} />
        <div
          key={dataUpdatedAt}
          className="flex items-center gap-1.5 text-xs font-medium text-accent-green bg-accent-green/5 px-3 py-1.5 rounded-xl border border-accent-green/20 shrink-0 animate-fade-up"
        >
          {isRefreshing ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Wifi className="h-3 w-3" />
          )}
          <span>{isRefreshing ? "Updating..." : "Live · auto-update"}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <TournamentGroupSkeleton key={i} rows={3} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="card p-8 text-center text-sm text-text-muted">{t("noLiveEvents")}</div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {Object.entries(grouped).map(([tournament, tournamentEvents]: [string, any[]]) => (
              <motion.div
                key={tournament}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="card overflow-hidden"
              >
                <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-surface/50">
                  <TournamentLogo images={tournamentEvents[0]?.tournamentImage} name={tournament} sportId={tournamentEvents[0]?.sportId} />
                  <span className="text-xs font-bold text-foreground">{tournament}</span>
                  <span className="text-xs text-text-muted ml-auto">{tournamentEvents.length} matches</span>
                </div>

                <div className="divide-y divide-border">
                  {tournamentEvents.map((event) => {
                    const isHT = event.gameStatus === 2;
                    const isFT = event.gameStatus === 1;

                    return (
                      <motion.div
                        key={event.sportEventId}
                        layout
                        className="group flex items-center gap-3 px-4 py-3 hover:bg-surface/50 transition-colors cursor-pointer"
                      >
                        <div className="w-11 sm:w-14 shrink-0 text-center">
                          {isFT ? (
                            <span className="text-xs font-bold text-text-muted px-2 py-0.5 rounded bg-surface">FT</span>
                          ) : isHT ? (
                            <span className="text-xs font-bold text-brand-orange px-2 py-0.5 rounded bg-brand-orange/10">HT</span>
                          ) : (
                            <div className="flex flex-col items-center gap-0.5">
                              <span className="flex h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-live" />
                              <span className="text-xs font-mono text-accent-green font-bold">
                                {formatMatchTime(event.timeSec)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                          <div className="flex items-center justify-end gap-2 min-w-0">
                            <span className="text-[13px] sm:text-sm font-semibold truncate">
                              {event.opponent1NameLocalization || "Team 1"}
                            </span>
                            <TeamLogo images={event.imageOpponent1} name={event.opponent1NameLocalization || "T"} sportId={event.sportId} />
                          </div>

                          <div className="flex items-center gap-1.5 font-mono text-sm font-extrabold tabular-nums px-2.5 py-1 rounded-lg bg-surface">
                            <span className={cn(
                              "w-6 text-center",
                              (event.fullScore?.sc1 ?? 0) > (event.fullScore?.sc2 ?? 0) && "text-accent-green"
                            )}>
                              {event.fullScore?.sc1 ?? 0}
                            </span>
                            <span className="text-text-muted text-xs">:</span>
                            <span className={cn(
                              "w-6 text-center",
                              (event.fullScore?.sc2 ?? 0) > (event.fullScore?.sc1 ?? 0) && "text-accent-green"
                            )}>
                              {event.fullScore?.sc2 ?? 0}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 min-w-0">
                            <TeamLogo images={event.imageOpponent2} name={event.opponent2NameLocalization || "T"} sportId={event.sportId} />
                            <span className="text-[13px] sm:text-sm font-semibold truncate">
                              {event.opponent2NameLocalization || "Team 2"}
                            </span>
                          </div>
                        </div>

                        {event.oddsLocalization && event.oddsLocalization.length >= 3 && (
                          <div className="hidden lg:flex items-center gap-1 shrink-0">
                            {event.oddsLocalization.slice(0, 3).map((odd: any, i: number) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-lg bg-surface text-xs font-mono font-bold text-text-secondary hover:bg-brand-orange/10 hover:text-brand-orange transition-all min-w-11 text-center"
                              >
                                {odd.oddsMarket?.toFixed(2)}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <a
                  href={EXTERNAL_PLATFORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-border text-xs font-semibold text-brand-orange hover:bg-brand-orange/5 transition-colors"
                >
                  Bet on Vivat Sport
                  <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            )).reduce<React.ReactNode[]>((acc, item, i) => {
              acc.push(item);
              // Баннер после каждой 3-й группы турниров
              if ((i + 1) % 3 === 0) {
                acc.push(<PromoBanner key={`promo-${i}`} variant={i % 2 === 0 ? 1 : 2} className="my-1 max-h-28 [&_img]:max-h-28" />);
              }
              return acc;
            }, [])}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
