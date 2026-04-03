"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Activity, Calendar, Newspaper, Trophy, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { localeNames, type Locale } from "@/i18n/config";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { key: "live", href: "/live", icon: Activity },
  { key: "matches", href: "/matches", icon: Calendar },
  { key: "results", href: "/results", icon: Trophy },
  { key: "news", href: "/news", icon: Newspaper },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4">
      <div className="container-main">
        <div className="rounded-2xl px-5 py-3 bg-background/70 border border-border backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-orange text-white font-extrabold text-sm">
                  FS
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Fast<span className="text-brand-orange">Score</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-0.5">
                {navItems.map((item) => {
                  const isActive =
                    pathnameWithoutLocale === item.href ||
                    pathnameWithoutLocale.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.key}
                      href={`/${locale}${item.href}`}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-brand-orange/15 text-brand-orange"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-hover"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {t(item.key)}
                      {item.key === "live" && (
                        <span className="flex h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-live" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggle}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary hover:text-foreground hover:bg-surface-hover transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-secondary hover:text-foreground hover:bg-surface-hover transition-all"
                >
                  <Globe className="h-4 w-4" />
                  {locale.toUpperCase()}
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", langOpen && "rotate-180")} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 glass-strong rounded-2xl p-1.5 shadow-xl animate-fade-up">
                    {(Object.entries(localeNames) as [Locale, string][]).map(([code, name]) => (
                      <Link
                        key={code}
                        href={`/${code}${pathnameWithoutLocale}`}
                        onClick={() => setLangOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                          code === locale
                            ? "bg-brand-orange/15 text-brand-orange"
                            : "text-text-secondary hover:text-foreground hover:bg-surface-hover"
                        )}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden mt-2">
        <div className="container-main">
          <div className="glass rounded-xl px-2 py-1.5">
            <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
              {navItems.map((item) => {
                const isActive =
                  pathnameWithoutLocale === item.href ||
                  pathnameWithoutLocale.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all",
                      isActive
                        ? "bg-brand-orange/15 text-brand-orange"
                        : "text-text-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {t(item.key)}
                    {item.key === "live" && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse-live" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
