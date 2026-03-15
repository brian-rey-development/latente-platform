import { getTranslations } from 'next-intl/server'
import { listArticlesQuery } from '../application/queries/list-articles.query'
import { listSignalsQuery } from '@/modules/signals/application/queries/list-signals.query'
import { ArticleHero } from '../components/article-hero'
import { ArticleGrid } from '../components/article-grid'
import { HomeFeaturedRow } from '../components/home-featured-row'
import { HomeSignalsSection } from '@/modules/signals/components/home-signals-section'
import { MarqueeTicker } from '@/shared/ui/marquee-ticker'

const FEATURED_COUNT = 3
const SIGNALS_LIMIT = 6

interface HomeViewProps {
  readonly locale?: string
}

export async function HomeView({ locale }: HomeViewProps) {
  const [articles, signals, t] = await Promise.all([
    listArticlesQuery(),
    listSignalsQuery({ limit: SIGNALS_LIMIT }),
    getTranslations('home'),
  ])

  const tagline = (
    <div className="border-b-2 border-ink px-6 md:px-10 py-3">
      <p className="font-mono text-sm uppercase tracking-widest text-ink">{t('tagline')}</p>
    </div>
  )

  if (articles.length === 0) {
    return (
      <div>
        {tagline}
        <HomeSignalsSection signals={signals} featured locale={locale} />
      </div>
    )
  }

  const [hero, ...rest] = articles
  const featured = rest.slice(0, FEATURED_COUNT)
  const remaining = rest.slice(FEATURED_COUNT)

  return (
    <div>
      {tagline}
      <ArticleHero article={hero} locale={locale} />
      <MarqueeTicker articles={articles} signals={signals} locale={locale} />
      {featured.length > 0 && <HomeFeaturedRow articles={featured} locale={locale} />}
      <HomeSignalsSection signals={signals} locale={locale} />
      {remaining.length > 0 && <ArticleGrid articles={remaining} locale={locale} />}
    </div>
  )
}
