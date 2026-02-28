# Feature: Analytics

PostHog event tracking. Cookie-less (RGPD compliant) via `persistence: 'memory'`.

## Files

```
src/modules/analytics/
  domain/
    types.ts      AnalyticsEvent, EventProperties
    constants.ts  ANALYTICS_EVENTS — all event name strings
  infrastructure/
    posthog.provider.tsx  Client — initializes PostHog on first mount
  hooks/
    use-analytics.ts  useAnalytics() — typed wrapper around usePostHog()
```

## Event Catalogue

```typescript
ANALYTICS_EVENTS = {
  ARTICLE_VIEWED:       'article_viewed',        // { slug, category, is_premium }
  ARTICLE_READ_DEPTH:   'article_read_depth',    // { slug, depth_percent: 25|50|75|100 }
  CATEGORY_FILTERED:    'category_filtered',     // { category }
  PREMIUM_GATE_HIT:     'premium_gate_hit',      // { slug, category }
  PRODUCT_VIEWED:       'product_viewed',        // { product_slug, product_type }
  ADD_TO_CART:          'add_to_cart',           // { product_slug, product_type, price }
  CHECKOUT_STARTED:     'checkout_started',      // { cart_total, item_count }
  CHECKOUT_COMPLETED:   'checkout_completed',    // { cart_total }
  NEWSLETTER_SUBSCRIBED:'newsletter_subscribed',
}
```

## Usage

```typescript
import { useAnalytics } from '@/modules/analytics/hooks/use-analytics'
import { ANALYTICS_EVENTS } from '@/modules/analytics/domain/constants'

const { track } = useAnalytics()
track(ANALYTICS_EVENTS.ARTICLE_VIEWED, { slug, category, is_premium: article.premium })
```

## Config

- `persistence: 'memory'` — no cookies written, no consent banner needed
- `PostHogProvider` wraps the full app in `app/layout.tsx`
- New events: add to `ANALYTICS_EVENTS` const in `domain/constants.ts` first, then use the const key — never string literals

## Gotchas

- `useAnalytics()` returns a no-op `track` function when PostHog is not initialized (e.g. missing env var). Safe to call anywhere.
- `ARTICLE_VIEWED` fires in `ReadTracker` (client component) on mount, not in the RSC — this is intentional since PostHog requires the client
