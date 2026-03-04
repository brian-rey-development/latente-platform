import type { Article, ArticleCategory, ArticlePreview } from './types'

export const ArticleService = {
  filterByCategory(
    articles: readonly ArticlePreview[],
    category: ArticleCategory,
  ): ArticlePreview[] {
    return articles.filter((a) => a.categories.includes(category))
  },

  search(
    articles: readonly ArticlePreview[],
    query: string,
  ): ArticlePreview[] {
    const q = query.toLowerCase().trim()
    if (!q) return [...articles]
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q),
    )
  },

  resolveLocale(article: Article): Article {
    return article
  },

  resolvePreviewLocale(article: ArticlePreview): ArticlePreview {
    return article
  },
} as const
