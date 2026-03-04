import type { ArticlePreview } from '../../articles/domain/types'

export const SearchService = {
  fuzzyFilter(
    articles: readonly ArticlePreview[],
    query: string,
  ): ArticlePreview[] {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.categories.some((cat) => cat.toLowerCase().includes(q)),
    )
  },
} as const
