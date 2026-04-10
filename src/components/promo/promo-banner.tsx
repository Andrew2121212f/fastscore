"use client";

import { EXTERNAL_PLATFORM } from "@/lib/constants";

interface PromoBannerProps {
  variant?: 1 | 2;
  className?: string;
}

/**
 * Промо-баннер Vivat Sport.
 * variant 1 и 2 — два разных дизайна баннеров.
 */
export default function PromoBanner({ variant = 1, className = "" }: PromoBannerProps) {
  const src = `/banners/vivat-promo-${variant}.png`;
  const srcHiRes = `/banners/vivat-promo-${variant}-4x.png`;

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
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
      </picture>
    </a>
  );
}
