"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ARTICLE_CATEGORIES, translateCategory } from "@/modules/articles/domain/constants";
import type { ArticleCategory } from "@/modules/articles/domain/types";

function CategoryBarInner() {
  const searchParams = useSearchParams();
  const t = useTranslations("categories");
  const locale = useLocale();

  const isAllActive = !searchParams.get("cat");

  const itemClass = (isActive: boolean) =>
    isActive
      ? "px-5 py-3 border-r-2 border-ink-subtle whitespace-nowrap cursor-pointer bg-brand text-surface hover:opacity-80 transition-opacity"
      : "px-5 py-3 border-r-2 border-ink-subtle whitespace-nowrap cursor-pointer hover:text-brand transition-colors";

  return (
    <div className="bg-ink text-surface overflow-x-auto scrollbar-hide border-b-2 border-ink">
      <div className="flex w-max font-mono text-sm font-bold uppercase tracking-widest">
        <Link
          href="/articulos"
          className={itemClass(isAllActive)}
        >
          {t("all")}
        </Link>

        {ARTICLE_CATEGORIES.map((cat: ArticleCategory) => (
          <Link
            key={cat}
            href={`/articulos?cat=${encodeURIComponent(cat)}`}
            className={itemClass(searchParams.get("cat") === cat)}
          >
            {translateCategory(cat, locale)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategoryBar() {
  return (
    <Suspense
      fallback={<div className="bg-ink border-b-2 border-ink h-[42px]" />}
    >
      <CategoryBarInner />
    </Suspense>
  );
}
