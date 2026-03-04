"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { strings } from "@/shared/lib/strings";
import type { ArticlePreview } from "@/modules/articles/domain/types";

interface SearchResultItemProps {
  readonly article: ArticlePreview;
  readonly onClose: () => void;
}

export function SearchResultItem({ article, onClose }: SearchResultItemProps) {
  return (
    <Link
      href={`/articulos/${article.slug}`}
      onClick={onClose}
      role="listitem"
      className="flex items-center justify-between gap-4 py-5 px-4 border-b border-surface/20 hover:bg-ink transition-colors duration-150 group"
    >
      <div className="grow">
        <span className="font-mono text-sm font-bold tracking-widest text-surface/60 group-hover:text-brand-muted uppercase block mb-1.5 transition-colors duration-150">
          {article.categories.join(" / ")}
          {article.premium && ` // ${strings.premium.label}`}
        </span>
        <p className="font-sans font-bold text-base uppercase leading-tight text-surface">
          {article.title}
        </p>
      </div>
      <ArrowUpRight
        size={20}
        className="text-surface group-hover:text-brand-muted flex-shrink-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
