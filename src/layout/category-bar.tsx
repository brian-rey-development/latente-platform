"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ARTICLE_CATEGORIES,
  ALL_CATEGORIES_LABEL_ES,
} from "@/modules/articles/domain/constants";
import type { ArticleCategory } from "@/modules/articles/domain/types";

function CategoryBarInner() {
  const searchParams = useSearchParams();

  const activeCat = searchParams.get("cat") ?? ALL_CATEGORIES_LABEL_ES;

  const itemClass = (isActive: boolean) =>
    isActive
      ? "px-5 py-3 border-r-2 border-ink-subtle whitespace-nowrap cursor-pointer bg-brand text-surface hover:opacity-80 transition-opacity"
      : "px-5 py-3 border-r-2 border-ink-subtle whitespace-nowrap cursor-pointer hover:text-brand transition-colors";

  return (
    <div className="bg-ink text-surface overflow-x-auto scrollbar-hide border-b-2 border-ink">
      <div className="flex w-max font-mono text-sm font-bold uppercase tracking-widest">
        <Link
          href="/articulos"
          className={itemClass(activeCat === ALL_CATEGORIES_LABEL_ES)}
        >
          {ALL_CATEGORIES_LABEL_ES}
        </Link>

        {ARTICLE_CATEGORIES.map((cat: ArticleCategory) => (
          <Link
            key={cat}
            href={`/articulos?cat=${encodeURIComponent(cat)}`}
            className={itemClass(activeCat === cat)}
          >
            {cat}
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
