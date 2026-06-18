"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Activity, BarChart3, CalendarClock, Globe, Zap, ScrollText, ArrowRight, ShieldCheck, Copyright, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function AboutClient() {
  const t = useTranslations("about");
  const locale = useLocale();

  const features = [
    { icon: Activity, title: t("feature1Title"), text: t("feature1Text"), color: "text-accent-green" },
    { icon: BarChart3, title: t("feature2Title"), text: t("feature2Text"), color: "text-accent-blue" },
    { icon: CalendarClock, title: t("feature3Title"), text: t("feature3Text"), color: "text-brand-orange" },
    { icon: Globe, title: t("feature4Title"), text: t("feature4Text"), color: "text-accent-purple" },
  ];

  const termsHighlights = [
    { icon: ShieldCheck, title: t("termsHighlight1Title"), text: t("termsHighlight1Text"), color: "text-accent-blue" },
    { icon: Copyright, title: t("termsHighlight2Title"), text: t("termsHighlight2Text"), color: "text-brand-orange" },
    { icon: HeartHandshake, title: t("termsHighlight3Title"), text: t("termsHighlight3Text"), color: "text-accent-green" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-brand-orange mb-4">
          <Zap className="h-3 w-3" /> FastScore
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-2">{t("title")}</h1>
        <p className="text-sm text-text-secondary leading-relaxed">{t("subtitle")}</p>
      </motion.div>

      <div className="card p-5">
        <h2 className="text-base font-bold mb-2">{t("mission")}</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{t("missionText")}</p>
      </div>

      <div>
        <h2 className="text-base font-bold mb-3">{t("features")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-4"
            >
              <feature.icon className={`h-5 w-5 ${feature.color} mb-2`} />
              <h3 className="text-sm font-bold mb-1">{feature.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="card p-5 border-brand-orange/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-brand-dark text-brand-orange flex items-center justify-center">
            <Zap className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold">{t("poweredBy")}</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">{t("poweredByText")}</p>
      </div>

      {/* Блок T&C — выжимка ключевых пунктов + ссылка на полную страницу.
          Юзер попросил Terms & Conditions именно на /about. */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <ScrollText className="h-4 w-4 text-brand-orange" />
          <h2 className="text-base font-bold">{t("termsTitle")}</h2>
        </div>
        <div className="card p-5">
          <p className="text-sm text-text-secondary leading-relaxed">{t("termsIntro")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {termsHighlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card p-4"
            >
              <h.icon className={`h-5 w-5 ${h.color} mb-2`} />
              <h3 className="text-sm font-bold mb-1">{h.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{h.text}</p>
            </motion.div>
          ))}
        </div>
        <Link
          href={`/${locale}/terms`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline"
        >
          {t("termsReadMore")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.section>
    </div>
  );
}
