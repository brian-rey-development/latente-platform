import type { Article, ArticleCategory, ArticlePreview } from './types'
import type { Locale } from '@/i18n/routing'

export const ArticleService = {
  filterByCategory(
    articles: readonly ArticlePreview[],
    category: ArticleCategory,
  ): ArticlePreview[] {
    return articles.filter((a) => a.category === category)
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

  resolveLocale(article: Article, locale: Locale): Article {
    if (locale === 'en' && article.titleEn && article.contentEn) {
      return {
        ...article,
        title: article.titleEn,
        excerpt: article.excerptEn ?? article.excerpt,
        content: article.contentEn,
      }
    }
    return article
  },

  resolvePreviewLocale(article: ArticlePreview, locale: Locale): ArticlePreview {
    if (locale === 'en' && article.titleEn) {
      return {
        ...article,
        title: article.titleEn,
        excerpt: article.excerptEn ?? article.excerpt,
      }
    }
    return article
  },
} as const
