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
      className={`relative block overflow-hidden rounded-2xl group mx-auto max-w-[280px] ${className}`}
    >
      {/* Нативный img с srcSet для retina. width/height = реальные размеры изображения */}
      <picture>
        <img
          src={src}
          srcSet={`${src} 1x, ${srcHiRes} 2x`}
          alt="Vivat Sport"
          width={280}
          height={240}
          className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
      </picture>
      {/* Маленький бейдж Ad */}
      <span className="absolute top-2 right-2 px-1.5 py-0.5 text-[10px] font-medium text-white/60 bg-black/30 backdrop-blur-sm rounded">
        Ad
      </span>
    </a>
  );
}
