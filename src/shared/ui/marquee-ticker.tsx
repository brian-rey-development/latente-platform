import { getTranslations } from 'next-intl/server'
import { MarqueeTickerClient } from './marquee-ticker-client'
import type { Locale } from '@/i18n/routing'

interface MarqueeTickerProps {
  readonly locale: Locale
}

export async function MarqueeTicker({ locale: _locale }: MarqueeTickerProps) {
  const t = await getTranslations('ticker')
  const items = t.raw('items') as string[]

  return <MarqueeTickerClient items={items} />
}
