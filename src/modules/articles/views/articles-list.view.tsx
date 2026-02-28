import { getTranslations } from 'next-intl/server'
import { listArticlesQuery } from '../application/queries/list-articles.query'
import { ArticleHero } from '../components/article-hero'
import { ArticleGrid } from '../components/article-grid'
import { MarqueeTicker } from '@/shared/ui/marquee-ticker'
import type { Locale } from '@/i18n/routing'

interface ArticlesListViewProps {
  readonly locale: Locale
}

export async function ArticlesListView({ locale }: ArticlesListViewProps) {
  const [articles, t] = await Promise.all([
    listArticlesQuery(),
    getTranslations('home'),
  ])

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="font-mono text-lg uppercase tracking-widest text-meta">
          {t('noArticles')}
        </p>
      </div>
    )
  }

  return (
    <div>
      <ArticleHero article={articles[0]} locale={locale} />
      <MarqueeTicker locale={locale} />
      <ArticleGrid articles={articles.slice(1)} locale={locale} />
    </div>
  )
}
