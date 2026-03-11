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

  resolveLocale(article: Article, locale?: string): Article {
    if (locale !== 'en') return article
    return {
      ...article,
      title: article.titleEn ?? article.title,
      subtitle: (article.subtitleEn ?? article.subtitle) as string | undefined,
      excerpt: article.excerptEn ?? article.excerpt,
      slug: article.slugEn ?? article.slug,
      content: article.contentEn ?? article.content,
    }
  },

  resolvePreviewLocale(article: ArticlePreview, locale?: string): ArticlePreview {
    if (locale !== 'en') return article
    return {
      ...article,
      title: article.titleEn ?? article.title,
      excerpt: article.excerptEn ?? article.excerpt,
      slug: article.slugEn ?? article.slug,
    }
  },
} as const
