import type { ArticleCategory } from "@/modules/articles/domain/types";
import { translateCategory } from "@/modules/articles/domain/constants";

interface CategoryBadgeProps {
  readonly category: ArticleCategory;
  readonly locale?: string;
}

export function CategoryBadge({ category, locale }: CategoryBadgeProps) {
  const label = translateCategory(category, locale)

  return (
    <span className="font-mono text-sm font-bold px-3 py-1 uppercase tracking-widest inline-flex items-center bg-brand text-surface">
      {label}
    </span>
  );
}
