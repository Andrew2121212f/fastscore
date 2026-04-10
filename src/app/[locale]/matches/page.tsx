"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePrematchEvents } from "@/hooks/use-prematch-events";
import { SPORT_IDS } from "@/types/api";
import { groupBy, formatKickoffSafe, formatDateSafe } from "@/lib/utils";
import { TeamLogo, TournamentLogo } from "@/components/sports/team-logo";
import SportTabs from "@/components/sports/sport-tabs";
import { MOCK_PREMATCH_EVENTS } from "@/lib/mock-data";
import { EXTERNAL_PLATFORM } from "@/lib/constants";
import PromoBanner from "@/components/promo/promo-banner";
import { TournamentGroupSkeleton } from "@/components/ui/skeletons";

export default function MatchesPage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [activeSport, setActiveSport] = useState<string | null>(null);

  const sportId = activeSport ? String(SPORT_IDS[activeSport]) : undefined;
  const { data, isLoading } = usePrematchEvents(sportId, locale);

  const events = (data?.items?.length ? data.items : MOCK_PREMATCH_EVENTS) as any[];
  const groupedByDate = groupBy(events, (e: any) => formatDateSafe(e.startDate));

  return (
    <div className="space-y-4">
      <SportTabs active={activeSport} onChange={setActiveSport} />

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <TournamentGroupSkeleton key={i} rows={4} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([date, dateEvents]: [string, any[]], dateIndex: number) => {
            const groupedByTournament = groupBy(
              dateEvents,
              (e: any) => e.tournamentNameLocalization || "Other"
            );

            return (
              <div key={date}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-extrabold text-foreground">{date}</span>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-text-muted font-medium">{dateEvents.length} matches</span>
                </div>

                <div className="space-y-3">
                  {Object.entries(groupedByTournament).map(([tournament, tournEvents]) => (
                    <motion.div
                      key={tournament}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 bg-surface/50">
                        <TournamentLogo images={tournEvents[0]?.tournamentImage} name={tournament} sportId={tournEvents[0]?.sportId} />
                        <span className="text-xs font-bold text-foreground">{tournament}</span>
                        <span className="text-xs text-text-muted ml-auto">{tournEvents.length} matches</span>
                      </div>

                      <div className="divide-y divide-border">
                        {tournEvents.map((event) => (
                          <div
                            key={event.sportEventId}
                            className="group flex items-center gap-3 px-4 py-3 hover:bg-surface/50 transition-colors cursor-pointer"
                          >
                            <div className="w-11 sm:w-14 shrink-0 text-center">
                              <div className="text-xs font-mono text-text-muted font-medium">{formatKickoffSafe(event.startDate)}</div>
                            </div>

                            <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                              <div className="flex items-center justify-end gap-2 min-w-0">
                                <span className="text-[13px] sm:text-sm font-semibold truncate">
                                  {event.opponent1NameLocalization || "TBD"}
                                </span>
                                <TeamLogo images={event.imageOpponent1} name={event.opponent1NameLocalization || "T"} sportId={event.sportId} />
                              </div>
                              <span className="text-xs text-text-muted font-bold px-2 py-0.5 rounded bg-surface">vs</span>
                              <div className="flex items-center gap-2 min-w-0">
                                <TeamLogo images={event.imageOpponent2} name={event.opponent2NameLocalization || "T"} sportId={event.sportId} />
                                <span className="text-[13px] sm:text-sm font-semibold truncate">
                                  {event.opponent2NameLocalization || "TBD"}
                                </span>
                              </div>
                            </div>

                            {event.oddsLocalization && event.oddsLocalization.length >= 3 && (
                              <div className="hidden sm:flex items-center gap-1 shrink-0">
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
                          </div>
                        ))}
                      </div>
                      <a
                        href={EXTERNAL_PLATFORM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 border-t border-border text-xs font-semibold text-brand-orange hover:bg-brand-orange/5 transition-colors"
                      >
                        Bet on Vivat Sport <ExternalLink className="h-3 w-3" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              {/* Баннер после каждого 2-го блока дат */}
              {(dateIndex + 1) % 2 === 0 && (
                <PromoBanner variant={dateIndex % 2 === 0 ? 1 : 2} className="mt-3 max-h-28 [&_img]:max-h-28" />
              )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
