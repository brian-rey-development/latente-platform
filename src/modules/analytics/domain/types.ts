import type { ANALYTICS_EVENTS } from './constants'

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]

export interface EventProperties {
  readonly slug?: string
  readonly category?: string
  readonly is_premium?: boolean
  readonly depth_percent?: 25 | 50 | 75 | 100
  readonly product_slug?: string
  readonly product_type?: string
  readonly price?: number
  readonly cart_total?: number
  readonly item_count?: number
}
