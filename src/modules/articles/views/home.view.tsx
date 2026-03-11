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
  const [articles, signals] = await Promise.all([
    listArticlesQuery(),
    listSignalsQuery({ limit: SIGNALS_LIMIT }),
  ])

  if (articles.length === 0) {
    return <HomeSignalsSection signals={signals} featured locale={locale} />
  }

  const [hero, ...rest] = articles
  const featured = rest.slice(0, FEATURED_COUNT)
  const remaining = rest.slice(FEATURED_COUNT)

  return (
    <div>
      <ArticleHero article={hero} locale={locale} />
      <MarqueeTicker articles={articles} signals={signals} locale={locale} />
      {featured.length > 0 && <HomeFeaturedRow articles={featured} locale={locale} />}
      <HomeSignalsSection signals={signals} locale={locale} />
      {remaining.length > 0 && <ArticleGrid articles={remaining} locale={locale} />}
    </div>
  )
}
