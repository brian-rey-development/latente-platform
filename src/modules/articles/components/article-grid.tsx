import type { ArticlePreview } from '../domain/types'
import { ArticleCard } from './article-card'

interface ArticleGridProps {
  readonly articles: ArticlePreview[]
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-surface">
      {articles.map((article, idx) => (
        <ArticleCard key={article._id} article={article} index={idx} />
      ))}
    </div>
  )
}
