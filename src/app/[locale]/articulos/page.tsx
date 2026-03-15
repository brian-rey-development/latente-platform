import type { Metadata } from 'next'
import { ArticlesArchiveView } from '@/modules/articles/views/articles-archive.view'
import type { ArticleCategory } from '@/modules/articles/domain/types'
import { ARTICLE_CATEGORIES } from '@/modules/articles/domain/constants'
import { SITE_URL } from '@/shared/lib/site-config'

interface ArticlesPageProps {
  readonly params: Promise<{ locale: string }>
  readonly searchParams: Promise<{ cat?: string }>
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/articulos` : `${SITE_URL}/en/articulos`

  const title = locale === 'es' ? 'Artículos' : 'Articles'
  const description =
    locale === 'es'
      ? 'Artículos de análisis sobre inteligencia artificial, geopolítica tecnológica, bio-ingeniería y economía. Sin ruido, sin publicidad - solo señal.'
      : 'Analysis on artificial intelligence, tech geopolitics, bioengineering and economics. No noise, no ads - signal only.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/articulos`,
        en: `${SITE_URL}/en/articulos`,
      },
    },
  }
}

export default async function ArticlesPage({ params, searchParams }: ArticlesPageProps) {
  const [{ locale }, { cat }] = await Promise.all([params, searchParams])

  const category = ARTICLE_CATEGORIES.includes(cat as ArticleCategory)
    ? (cat as ArticleCategory)
    : undefined

  return <ArticlesArchiveView category={category} locale={locale} />
}
