import type { Locale } from '@/i18n/routing'
import { ArticlesListView } from '@/modules/articles/views/articles-list.view'

interface HomePageProps {
  readonly params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  return <ArticlesListView locale={locale as Locale} />
}
