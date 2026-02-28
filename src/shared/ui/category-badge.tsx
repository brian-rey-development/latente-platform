import type { ArticleCategory } from '@/modules/articles/domain/types'

interface CategoryBadgeProps {
  readonly category: ArticleCategory
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest inline-flex items-center bg-brand text-surface">
      {category}
    </span>
  )
}
