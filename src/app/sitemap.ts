import type { MetadataRoute } from 'next'
import { getArticleSlugsQuery } from '@/modules/articles/application/queries/get-article-slugs.query'
import { getArticleSlugsEnQuery } from '@/modules/articles/application/queries/get-article-slugs-en.query'

const BASE_URL = 'https://latente.xyz'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [esSlugs, enSlugs] = await Promise.all([
    getArticleSlugsQuery().catch(() => [] as string[]),
    getArticleSlugsEnQuery().catch(() => [] as string[]),
  ])

  const enSlugSet = new Set(enSlugs)

  const esArticleRoutes: MetadataRoute.Sitemap = esSlugs.map((slug) => ({
    url: `${BASE_URL}/articulos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    ...(enSlugSet.has(slug) && {
      alternates: {
        languages: {
          es: `${BASE_URL}/articulos/${slug}`,
          en: `${BASE_URL}/en/articulos/${slug}`,
        },
      },
    }),
  }))

  const enArticleRoutes: MetadataRoute.Sitemap = enSlugs.map((slug) => ({
    url: `${BASE_URL}/en/articulos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${BASE_URL}/articulos/${slug}`,
        en: `${BASE_URL}/en/articulos/${slug}`,
      },
    },
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: { languages: { es: BASE_URL, en: `${BASE_URL}/en` } },
    },
    {
      url: `${BASE_URL}/en`,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: { languages: { es: BASE_URL, en: `${BASE_URL}/en` } },
    },
    { url: `${BASE_URL}/tienda`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/manifiesto`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  return [...staticRoutes, ...esArticleRoutes, ...enArticleRoutes]
}
