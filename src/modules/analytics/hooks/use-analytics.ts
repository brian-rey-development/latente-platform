'use client'

import { usePostHog } from 'posthog-js/react'
import type { AnalyticsEventName, EventProperties } from '../domain/types'

export function useAnalytics() {
  const posthog = usePostHog()

  const track = (event: AnalyticsEventName, properties?: EventProperties) => {
    posthog?.capture(event, properties)
  }

  return { track }
}
