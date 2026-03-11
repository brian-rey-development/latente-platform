import type { MetadataRoute } from 'next'
import { getArticleSlugsQuery } from '@/modules/articles/application/queries/get-article-slugs.query'
import { getArticleSlugsEnQuery } from '@/modules/articles/application/queries/get-article-slugs-en.query'
import { getSignalSlugsQuery } from '@/modules/signals/application/queries/get-signal-slugs.query'
import { getSignalSlugsEnQuery } from '@/modules/signals/application/queries/get-signal-slugs-en.query'
import { SITE_URL } from '@/shared/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [esSlugs, enSlugs, esSignalSlugs, enSignalSlugs] = await Promise.all([
    getArticleSlugsQuery().catch(() => [] as string[]),
    getArticleSlugsEnQuery().catch(() => [] as string[]),
    getSignalSlugsQuery().catch(() => [] as string[]),
    getSignalSlugsEnQuery().catch(() => [] as string[]),
  ])

  const enSlugSet = new Set(enSlugs)
  const enSignalSlugSet = new Set(enSignalSlugs)

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
    {
      url: `${SITE_URL}/senales`,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${SITE_URL}/senales`,
          en: `${SITE_URL}/en/senales`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/senales`,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${SITE_URL}/senales`,
          en: `${SITE_URL}/en/senales`,
        },
      },
    },
    { url: `${SITE_URL}/tienda`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/en/tienda`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const esSignalRoutes: MetadataRoute.Sitemap = esSignalSlugs.map((slug) => ({
    url: `${SITE_URL}/senales/${slug}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
    ...(enSignalSlugSet.has(slug) && {
      alternates: {
        languages: {
          es: `${SITE_URL}/senales/${slug}`,
          en: `${SITE_URL}/en/senales/${slug}`,
        },
      },
    }),
  }))

  const enSignalRoutes: MetadataRoute.Sitemap = enSignalSlugs.map((slug) => ({
    url: `${SITE_URL}/en/senales/${slug}`,
    changeFrequency: 'daily' as const,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${SITE_URL}/senales/${slug}`,
        en: `${SITE_URL}/en/senales/${slug}`,
      },
    },
  }))

  return [...staticRoutes, ...esArticleRoutes, ...enArticleRoutes, ...esSignalRoutes, ...enSignalRoutes]
}
