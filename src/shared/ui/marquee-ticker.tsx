import { MarqueeTickerClient } from './marquee-ticker-client'
import type { ArticlePreview } from '@/modules/articles/domain/types'
import type { SignalPreview } from '@/modules/signals/domain/types'

interface MarqueeTickerProps {
  readonly articles: ArticlePreview[]
  readonly signals?: SignalPreview[]
  readonly locale?: string
}

export function MarqueeTicker({ articles, signals, locale }: MarqueeTickerProps) {
  const isEn = locale === 'en'

  const articleTitles = articles.map((a) =>
    isEn && a.titleEn ? a.titleEn : a.title
  )

  const signalTitles = (signals ?? []).map((s) =>
    isEn && s.titleEn ? s.titleEn : s.title
  )

  const items = [...articleTitles, ...signalTitles]

  return <MarqueeTickerClient items={items} />
}
