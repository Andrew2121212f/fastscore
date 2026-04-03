"use client";

import { motion } from "framer-motion";
import { formatKickoff } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { SportEvent } from "@/types/api";

interface Props {
  event: SportEvent;
  index?: number;
}

export default function MatchRow({ event, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group flex items-center gap-4 px-5 py-3.5 hover:bg-surface transition-colors cursor-pointer border-b border-border last:border-0"
    >
      <span className="text-xs font-mono text-text-muted w-12 shrink-0 tabular-nums font-medium">
        {formatKickoff(event.startDate)}
      </span>

      <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className="text-sm font-semibold truncate text-right">
          {event.opponent1NameLocalization || "TBD"}
        </span>
        <span className="text-xs text-text-muted font-bold px-2 py-0.5 rounded-md bg-surface">vs</span>
        <span className="text-sm font-semibold truncate">
          {event.opponent2NameLocalization || "TBD"}
        </span>
      </div>

      {event.oddsLocalization && event.oddsLocalization.length >= 3 && (
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {event.oddsLocalization.slice(0, 3).map((odd, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-surface text-xs font-mono font-bold text-text-secondary hover:bg-brand-orange/10 hover:text-brand-orange transition-all min-w-12 text-center"
            >
              {odd.oddsMarket?.toFixed(2)}
            </span>
          ))}
        </div>
      )}

      <ChevronRight className="h-4 w-4 text-text-muted/40 group-hover:text-brand-orange transition-colors shrink-0" />
    </motion.div>
  );
}
