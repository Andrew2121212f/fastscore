"use client";

import { EXTERNAL_PLATFORM } from "@/lib/constants";

interface PromoBannerProps {
  variant?: 1 | 2;
  className?: string;
  /** "default" — крупный (h-40/h-48). "compact" — для сайдбара (h-24). */
  size?: "default" | "compact";
}

/**
 * Промо-баннер Vivat Sport.
 * variant 1 и 2 — два разных дизайна баннеров.
 * size="compact" — компактный вариант для сайдбара, чтобы помещаться в высоту viewport.
 */
export default function PromoBanner({ variant = 1, className = "", size = "default" }: PromoBannerProps) {
  const src = `/banners/vivat-promo-${variant}.png`;
  const srcHiRes = `/banners/vivat-promo-${variant}-4x.png`;
  const heightClass = size === "compact" ? "h-20" : "h-40 sm:h-48";

  return (
    <a
      href={EXTERNAL_PLATFORM}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block overflow-hidden rounded-2xl group ${className}`}
    >
      {/* Баннер растягивается на всю ширину, высота фиксирована, object-cover обрезает по центру */}
      <picture>
        <img
          src={srcHiRes}
          srcSet={`${src} 280w, ${srcHiRes} 1120w`}
          sizes="(max-width: 640px) calc(100vw - 1.5rem), 560px"
          alt="Vivat Sport"
          className={`w-full ${heightClass} object-cover group-hover:scale-[1.02] transition-transform duration-500`}
          loading="lazy"
        />
      </picture>
    </a>
  );
}
