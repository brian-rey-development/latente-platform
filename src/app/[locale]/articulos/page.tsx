import type { Locale } from '@/i18n/routing'
import { ArticlesArchiveView } from '@/modules/articles/views/articles-archive.view'
import type { ArticleCategory } from '@/modules/articles/domain/types'
import { ARTICLE_CATEGORIES } from '@/modules/articles/domain/constants'

interface ArticlesPageProps {
  readonly params: Promise<{ locale: string }>
  readonly searchParams: Promise<{ cat?: string }>
}

export default async function ArticlesPage({ params, searchParams }: ArticlesPageProps) {
  const [{ locale }, { cat }] = await Promise.all([params, searchParams])

  const category = ARTICLE_CATEGORIES.includes(cat as ArticleCategory)
    ? (cat as ArticleCategory)
    : undefined

  return <ArticlesArchiveView locale={locale as Locale} category={category} />
}
