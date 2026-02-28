'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Lock, Unlock } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useAnalytics } from '@/modules/analytics/hooks/use-analytics'
import { ANALYTICS_EVENTS } from '@/modules/analytics/domain/constants'
import type { Article } from '../domain/types'

interface PaywallBlockProps {
  readonly article: Pick<Article, 'slug' | 'category'>
}

export function PaywallBlock({ article }: PaywallBlockProps) {
  const router = useRouter()
  const t = useTranslations('paywall')
  const { track } = useAnalytics()

  const handleAuth = () => {
    track(ANALYTICS_EVENTS.PREMIUM_GATE_HIT, {
      slug: article.slug,
      category: article.category,
    })
    router.push('/auth')
  }

  return (
    <div className="my-16 p-8 md:p-12 border-4 border-ink bg-ink text-surface relative overflow-hidden shadow-brutal-xl">
      <div className="absolute top-0 right-0 p-8 opacity-20">
        <Lock size={120} className="text-brand" />
      </div>
      <h3 className="font-sans font-black text-4xl md:text-5xl uppercase mb-4 text-brand relative z-10">
        {t('title')}
      </h3>
      <p className="font-mono text-lg mb-8 max-w-xl relative z-10">
        {t('message')}
      </p>
      <div className="relative z-10">
        <Button variant="cta" onClick={handleAuth}>
          {t('cta')} <Unlock size={20} />
        </Button>
      </div>
    </div>
  )
}
