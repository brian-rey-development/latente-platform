import type { Metadata } from 'next'
import { ArticlesListView } from '@/modules/articles/views/articles-list.view'
import type { ArticleCategory } from '@/modules/articles/domain/types'
import { ARTICLE_CATEGORIES } from '@/modules/articles/domain/constants'
import { SITE_URL } from '@/shared/lib/site-config'

interface HomePageProps {
  readonly params: Promise<{ locale: string }>
  readonly searchParams: Promise<{ cat?: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? SITE_URL : `${SITE_URL}/en`

  return {
    alternates: {
      canonical,
      languages: { es: SITE_URL, en: `${SITE_URL}/en` },
    },
  }
}

export default async function HomePage({ params, searchParams }: HomePageProps) {
  const [, { cat }] = await Promise.all([params, searchParams])

  const category = ARTICLE_CATEGORIES.includes(cat as ArticleCategory)
    ? (cat as ArticleCategory)
    : undefined

  return <ArticlesListView category={category} />
}
