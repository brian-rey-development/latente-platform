# Architecture

DDD/Clean Architecture on Next.js 16 App Router. Read this before adding a module, changing the data flow, or touching the infrastructure layer.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript strict mode |
| Styling | Tailwind CSS v4 — tokens in `src/app/globals.css` via `@theme inline` |
| Fonts | Geist via `next/font/google` — `font-sans` / `font-mono` |
| CMS | Sanity — `src/sanity/` (client, GROQ queries, schemas, image builder) |
| State | Zustand — `src/modules/cart/store/cart.store.ts` |
| Analytics | PostHog — `src/modules/analytics/` |
| Newsletter | Beehiiv — `src/app/api/newsletter/route.ts` |
| Path alias | `@/*` → `src/` |

## Module Layer Structure

Every module under `src/modules/<name>/` follows this strict order:

```
domain/         Pure TypeScript only. Types, constants, pure service functions.
                No React, no I/O, no async, no side effects.

infrastructure/ Sanity repository implementations of the domain interface.
                Swappable — only this layer knows about Sanity.

application/    CQRS query handlers. Orchestrate domain + infrastructure.
                Called directly from Server Component views.

components/     React components. Server RSC by default.
                'use client' only when hooks/browser APIs are required.

hooks/          Client hooks — Zustand selectors, interactive state.

views/          Composable page views (Server RSC).
                Call application queries, compose components, no business logic.
```

The `app/` directory is a thin shell — each `page.tsx` imports a view and exports it. Zero logic lives in `app/`.

## Module List

| Module | Purpose | Feature flag |
|--------|---------|-------------|
| `articles` | Blog content, detail view, premium paywall | `PREMIUM_ENABLED` |
| `products` | Store product catalog | `STORE_ENABLED` |
| `cart` | Zustand cart store + drawer overlay | `STORE_ENABLED` |
| `checkout` | Checkout form (payment stub) | `STORE_ENABLED` |
| `auth` | Login/register forms (auth stub) | — |
| `search` | Client-side fuzzy search overlay | — |
| `analytics` | PostHog provider + typed event hook | — |

## Shared

```
src/shared/ui/       Design system primitives (Button, FormField, badges, ticker)
src/shared/lib/      Utilities (formatDate, formatPrice, FEATURE_FLAGS)
src/layout/          App shell components (Navbar, SiteFooter, NewsletterSection)
src/sanity/          Sanity client, GROQ queries, image builder, schemas
```

## Data Flow (articles example)

```
Sanity CMS
  → GROQ query (infrastructure/article-sanity.repository.ts)
  → listArticlesQuery() (application/queries/list-articles.query.ts)
  → ArticlesListView (views/articles-list.view.tsx) — Server RSC, awaits query
  → ArticleHero + ArticleGrid (components) — Server RSC, pure render
  → app/page.tsx — exports ArticlesListView directly
```

## Server vs Client boundary

Server Components are the default. A file needs `'use client'` only if it uses:
- React hooks (`useState`, `useEffect`, `useRef`, etc.)
- Browser APIs (`window`, `document`, `IntersectionObserver`)
- Zustand (`useCart`, `useCartStore`)
- PostHog (`useAnalytics`, `usePostHog`)
- `useRouter` from `next/navigation`

## Routes

```
/                     → ArticlesListView (SSG)
/articulos/[slug]     → ArticleDetailView + generateStaticParams (SSG)
/tienda               → ProductsListView (SSG, STORE_ENABLED flag)
/tienda/checkout      → CheckoutView (SSG, STORE_ENABLED flag)
/auth                 → AuthView (SSG)
/manifiesto           → Static content (SSG)
/studio/[[...tool]]   → Sanity Studio (Dynamic, client-only)
/api/revalidate       → ISR webhook (Dynamic)
/api/newsletter       → Beehiiv subscribe (Dynamic)
/sitemap.xml          → MetadataRoute.Sitemap (SSG)
/robots.txt           → MetadataRoute.Robots (SSG)
/opengraph-image      → @vercel/og default OG (Edge)
```

## Feature Flags

`src/shared/lib/feature-flags.ts` — `NEXT_PUBLIC_*` env vars, accessible server and client.

| Flag | Env var | Gates |
|------|---------|-------|
| `STORE_ENABLED` | `NEXT_PUBLIC_FEATURE_STORE_ENABLED=true` | `/tienda`, `/tienda/checkout`, cart button |
| `PREMIUM_ENABLED` | `NEXT_PUBLIC_FEATURE_PREMIUM_ENABLED=true` | Article paywall |

Adding a flag: update `feature-flags.ts`, `.env.example`, this table, and the feature doc.

## ISR (On-Demand Revalidation)

```
Writer publishes in Sanity Studio
  → Sanity webhook POST /api/revalidate (header: x-sanity-webhook-secret)
  → revalidatePath('/', 'layout') + revalidatePath('/articulos/[slug]', 'page')
  → ISR cache cleared → next request renders fresh → live in <5s
```

## Build Notes

- Sanity Studio requires `'use client'` + `dynamic(() => ..., { ssr: false })` — Turbopack SSR incompatibility
- `serverExternalPackages: ['sanity']` required in `next.config.ts`
- `isSanityConfigured()` guard in repositories — returns empty data when `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset at build time
- `revalidatePath(path, type)` requires second arg in Next.js 16
- `///` in JSX must be `{'///'}` — avoids `react/jsx-no-comment-textnodes` lint error
- `CartItem` naming conflict: the type lives in `products/domain/types.ts`, the component is exported as `CartItemRow` from `cart/components/index.ts`
