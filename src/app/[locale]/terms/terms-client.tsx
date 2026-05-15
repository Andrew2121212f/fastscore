"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export default function TermsClient() {
  const t = useTranslations("terms");

  const sections = [
    { title: t("section1Title"), text: t("section1Text") },
    { title: t("section2Title"), text: t("section2Text") },
    { title: t("section3Title"), text: t("section3Text") },
    { title: t("section4Title"), text: t("section4Text") },
    { title: t("section5Title"), text: t("section5Text") },
    { title: t("section6Title"), text: t("section6Text") },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-1">{t("title")}</h1>
        <p className="text-xs text-text-muted">{t("lastUpdated")}: May 2026</p>
      </div>

      <div className="card p-5">
        <p className="text-sm text-text-secondary leading-relaxed">{t("intro")}</p>
      </div>

      {/* Блок "О компании" — выделен иконкой/цветом, идёт сразу после интро.
          Юзер просил этот раздел именно на странице Terms. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-5 border-brand-orange/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-brand-dark text-brand-orange flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold">{t("aboutCompanyTitle")}</h2>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
          {t("aboutCompanyText")}
        </p>
      </motion.div>

      <div className="space-y-3">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="card p-5"
          >
            <h2 className="text-sm font-bold mb-2">{i + 1}. {section.title}</h2>
            <p className="text-xs text-text-secondary leading-relaxed">{section.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
