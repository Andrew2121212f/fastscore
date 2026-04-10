"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, ExternalLink, Loader2 } from "lucide-react";
import { useLiveEvents } from "@/hooks/use-live-events";
import { SPORT_IDS } from "@/types/api";
import { EXTERNAL_PLATFORM } from "@/lib/constants";
import { groupBy } from "@/lib/utils";
import { TournamentLogo } from "@/components/sports/team-logo";
import MatchRow from "@/components/sports/match-row";
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
                  {tournamentEvents.map((event) => (
                    <MatchRow key={event.sportEventId} event={event} mode="live" />
                  ))}
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
                acc.push(<PromoBanner key={`promo-${i}`} variant={i % 2 === 0 ? 1 : 2} className="my-3" />);
              }
              return acc;
            }, [])}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
