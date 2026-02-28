'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

interface PostHogProviderProps {
  readonly children: React.ReactNode
}

function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'

    if (key && !posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        persistence: 'memory', // Cookie-less — RGPD compliant
        capture_pageview: false, // Manual page tracking via usePathname
      })
    }
  }, [])

  return null
}

export function AnalyticsProvider({ children }: PostHogProviderProps) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogInit />
      {children}
    </PostHogProvider>
  )
}
