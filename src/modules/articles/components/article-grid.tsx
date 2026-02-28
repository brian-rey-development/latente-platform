import type { ArticlePreview } from '../domain/types'
import { ArticleCard } from './article-card'
import type { Locale } from '@/i18n/routing'

interface ArticleGridProps {
  readonly articles: ArticlePreview[]
  readonly locale: Locale
}

export function ArticleGrid({ articles, locale }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-surface">
      {articles.map((article, idx) => (
        <ArticleCard key={article._id} article={article} index={idx} locale={locale} />
      ))}
    </div>
  )
}
