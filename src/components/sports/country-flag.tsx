"use client";

import { getLeagueMeta } from "@/lib/league-priority";

interface CountryFlagProps {
  /** Название турнира — по нему определяется флаг */
  tournamentName: string;
  /** Размер шрифта (px) */
  size?: number;
  className?: string;
}

/**
 * Флаг страны / эмодзи рядом с названием турнира.
 * Отображается только если для турнира удалось определить страну.
 */
export default function CountryFlag({ tournamentName, size = 14, className = "" }: CountryFlagProps) {
  const meta = getLeagueMeta(tournamentName);
  if (!meta.flag) return null;

  return (
    <span
      role="img"
      aria-label={meta.country}
      title={meta.country}
      className={`inline-flex items-center leading-none shrink-0 ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {meta.flag}
    </span>
  );
}
