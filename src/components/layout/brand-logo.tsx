import { cn } from "@/lib/utils";

// Фирменный логотип VivatBetSport (вордмарк). Две версии:
//   logo-vivatbet.svg       — фирменные цвета на тёмном фоне (тема по умолчанию)
//   logo-vivatbet-light.svg — перекрашенный (тёмный текст) для светлой темы
// Подмена по теме — чистым CSS через [data-theme="light"] (см. globals.css),
// чтобы работало и в серверных компонентах (footer) без JS.
const RATIO = 1602 / 388;

export default function BrandLogo({
  height = 32,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * RATIO);
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/logo-vivatbet.svg"
        alt="VivatBetSport"
        width={width}
        height={height}
        style={{ height, width: "auto" }}
        className="brand-logo-dark"
      />
      <img
        src="/logo-vivatbet-light.svg"
        alt="VivatBetSport"
        width={width}
        height={height}
        style={{ height, width: "auto" }}
        className="brand-logo-light"
      />
    </span>
  );
}
