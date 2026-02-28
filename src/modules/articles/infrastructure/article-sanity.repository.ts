import { sanityClient, isSanityConfigured } from '@/sanity/client'
import {
  ARTICLES_LIST_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLE_SLUGS_EN_QUERY,
} from '@/sanity/queries'
import type { ArticleRepository } from '../domain/article.repository'
import type { Article, ArticlePreview } from '../domain/types'

export const articleSanityRepository: ArticleRepository = {
  getAll: async () => {
    if (!isSanityConfigured()) return []
    return sanityClient.fetch<ArticlePreview[]>(
      ARTICLES_LIST_QUERY,
      {},
      { next: { tags: ['articles'] } },
    )
  },

  getBySlug: async (slug: string) => {
    if (!isSanityConfigured()) return null
    return sanityClient.fetch<Article | null>(
      ARTICLE_BY_SLUG_QUERY,
      { slug },
      { next: { tags: [`article-${slug}`] } },
    )
  },

  getAllSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
    return results.map((r) => r.slug)
  },

  getAllEnSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(ARTICLE_SLUGS_EN_QUERY)
    return results.map((r) => r.slug)
  },
}
