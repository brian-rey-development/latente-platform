'use client'

import { useEffect, useRef } from 'react'
import { useAnalytics } from '@/modules/analytics/hooks/use-analytics'
import { ANALYTICS_EVENTS } from '@/modules/analytics/domain/constants'
import type { ArticlePreview } from '../domain/types'

interface ReadTrackerProps {
  readonly article: Pick<ArticlePreview, 'slug' | 'category'>
}

const DEPTH_THRESHOLDS = [25, 50, 75, 100] as const

export function ReadTracker({ article }: ReadTrackerProps) {
  const { track } = useAnalytics()
  const firedDepths = useRef(new Set<number>())

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = Math.round((scrollTop / docHeight) * 100)

      for (const threshold of DEPTH_THRESHOLDS) {
        if (percent >= threshold && !firedDepths.current.has(threshold)) {
          firedDepths.current.add(threshold)
          track(ANALYTICS_EVENTS.ARTICLE_READ_DEPTH, {
            slug: article.slug,
            category: article.category,
            depth_percent: threshold,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [article, track])

  // Renders nothing - pure side-effect component
  return null
}
