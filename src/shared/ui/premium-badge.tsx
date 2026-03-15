"use client";

import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export function PremiumBadge() {
  const t = useTranslations("premium");

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-sm font-bold px-2 py-1 border border-brand text-brand uppercase tracking-widest">
      <Lock size={10} />
      {t("label")}
    </span>
  );
}
