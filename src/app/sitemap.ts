import type { MetadataRoute } from 'next'
import { getArticleSlugsQuery } from '@/modules/articles/application/queries/get-article-slugs.query'
import { getArticleSlugsEnQuery } from '@/modules/articles/application/queries/get-article-slugs-en.query'
import { SITE_URL } from '@/shared/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [esSlugs, enSlugs] = await Promise.all([
    getArticleSlugsQuery().catch(() => [] as string[]),
    getArticleSlugsEnQuery().catch(() => [] as string[]),
  ])

  const enSlugSet = new Set(enSlugs)

  const esArticleRoutes: MetadataRoute.Sitemap = esSlugs.map((slug) => ({
    url: `${SITE_URL}/articulos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    ...(enSlugSet.has(slug) && {
      alternates: {
        languages: {
          es: `${SITE_URL}/articulos/${slug}`,
          en: `${SITE_URL}/en/articulos/${slug}`,
        },
      },
    }),
  }))

  const enArticleRoutes: MetadataRoute.Sitemap = enSlugs.map((slug) => ({
    url: `${SITE_URL}/en/articulos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${SITE_URL}/articulos/${slug}`,
        en: `${SITE_URL}/en/articulos/${slug}`,
      },
    },
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: { languages: { es: SITE_URL, en: `${SITE_URL}/en` } },
    },
    {
      url: `${SITE_URL}/en`,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: { languages: { es: SITE_URL, en: `${SITE_URL}/en` } },
    },
    {
      url: `${SITE_URL}/articulos`,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${SITE_URL}/articulos`,
          en: `${SITE_URL}/en/articulos`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/articulos`,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${SITE_URL}/articulos`,
          en: `${SITE_URL}/en/articulos`,
        },
      },
    },
    {
      url: `${SITE_URL}/reportes`,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/reportes`,
          en: `${SITE_URL}/en/reportes`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/reportes`,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/reportes`,
          en: `${SITE_URL}/en/reportes`,
        },
      },
    },
    {
      url: `${SITE_URL}/labs`,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${SITE_URL}/labs`,
          en: `${SITE_URL}/en/labs`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/labs`,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${SITE_URL}/labs`,
          en: `${SITE_URL}/en/labs`,
        },
      },
    },
    { url: `${SITE_URL}/tienda`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/en/tienda`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  return [...staticRoutes, ...esArticleRoutes, ...enArticleRoutes]
}
