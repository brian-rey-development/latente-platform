import type { Metadata } from 'next'
import { getArticleQuery } from '@/modules/articles/application/queries/get-article.query'
import { getArticleSlugsQuery } from '@/modules/articles/application/queries/get-article-slugs.query'
import { getArticleSlugsEnQuery } from '@/modules/articles/application/queries/get-article-slugs-en.query'
import { ArticleDetailView } from '@/modules/articles/views/article-detail.view'
import { urlFor } from '@/sanity/image'
import type { Locale } from '@/i18n/routing'

const BASE_URL = 'https://latente.xyz'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const [esSlugs, enSlugs] = await Promise.all([
    getArticleSlugsQuery().catch(() => [] as string[]),
    getArticleSlugsEnQuery().catch(() => [] as string[]),
  ])

  const esParams = esSlugs.map((slug) => ({ locale: 'es', slug }))
  const enParams = enSlugs.map((slug) => ({ locale: 'en', slug }))

  return [...esParams, ...enParams]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = localeParam as Locale
  const article = await getArticleQuery(slug)

  if (!article) return {}

  const title = locale === 'en' && article.titleEn ? article.titleEn : article.title
  const description =
    locale === 'en' && article.excerptEn ? article.excerptEn : article.excerpt

  const ogImage = article.coverImage
    ? urlFor(article.coverImage).width(1200).height(630).url()
    : undefined

  const canonical =
    locale === 'es'
      ? `${BASE_URL}/articulos/${slug}`
      : `${BASE_URL}/en/articulos/${slug}`

  const hasBothLocales = Boolean(article.titleEn && article.contentEn)

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical,
      ...(hasBothLocales && {
        languages: {
          es: `${BASE_URL}/articulos/${slug}`,
          en: `${BASE_URL}/en/articulos/${slug}`,
        },
      }),
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  return <ArticleDetailView slug={slug} locale={localeParam as Locale} />
}
