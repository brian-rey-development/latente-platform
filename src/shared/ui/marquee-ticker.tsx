import { MarqueeTickerClient } from './marquee-ticker-client'
import { ArticleService } from '@/modules/articles/domain/article.service'
import type { ArticlePreview } from '@/modules/articles/domain/types'

interface MarqueeTickerProps {
  readonly articles: ArticlePreview[]
}

export function MarqueeTicker({ articles }: MarqueeTickerProps) {
  const items = articles.map((a) => ArticleService.resolvePreviewLocale(a).title)

  return <MarqueeTickerClient items={items} />
}
