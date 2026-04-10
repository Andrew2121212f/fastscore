"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { usePrematchEvents } from "@/hooks/use-prematch-events";
import { SPORT_IDS } from "@/types/api";
import { groupBy, formatDateSafe } from "@/lib/utils";
import { TournamentLogo } from "@/components/sports/team-logo";
import MatchRow from "@/components/sports/match-row";
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
                          <MatchRow key={event.sportEventId} event={event} mode="prematch" />
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
                <PromoBanner variant={dateIndex % 2 === 0 ? 1 : 2} className="mt-3" />
              )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
