import { ArticlesListView } from '@/modules/articles/views/articles-list.view'
import type { ArticleCategory } from '@/modules/articles/domain/types'
import { ARTICLE_CATEGORIES } from '@/modules/articles/domain/constants'

interface HomePageProps {
  readonly searchParams: Promise<{ cat?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { cat } = await searchParams

  const category = ARTICLE_CATEGORIES.includes(cat as ArticleCategory)
    ? (cat as ArticleCategory)
    : undefined

  return <ArticlesListView category={category} />
}
