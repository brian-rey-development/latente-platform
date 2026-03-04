# Feature: Articles

Editorial content. The core product — long-form analysis pieces in Spanish.

## Files

```
src/modules/articles/
  domain/
    types.ts              Article, ArticlePreview, ArticleCategory, SanityImageRef
    constants.ts          ARTICLE_CATEGORIES array
    article.service.ts    filterByCategory(), search() — pure fns
    article.repository.ts ArticleRepository interface
  infrastructure/
    article-sanity.repository.ts  GROQ queries via Sanity client
  application/
    queries/
      list-articles.query.ts      getAll + optional category filter
      get-article.query.ts        getBySlug
      get-article-slugs.query.ts  for generateStaticParams
  components/
    article-card.tsx      Server RSC — thumbnail + link card
    article-grid.tsx      Server RSC — grid layout wrapper
    article-hero.tsx      Server RSC — featured article (first item)
    article-header.tsx    Server RSC — title, category, meta
    article-aside.tsx     Server RSC — author, read time, relative date, share strip
    article-content.tsx   Server RSC — <PortableText> renderer
    content-block.tsx     Server RSC — custom PortableText component map
    article-actions.tsx   Client — share (opens ShareModal) + bookmark toggle (localStorage)
    paywall-block.tsx     Client — premium gate → router.push('/auth')
    read-tracker.tsx      Client — IntersectionObserver scroll depth → PostHog
  views/
    articles-list.view.tsx   Server RSC — hero + ticker + grid
    article-detail.view.tsx  Server RSC — full article + JSON-LD
```

## Key Types

```typescript
type ArticleCategory =
  | 'GEOPOLÍTICA'
  | 'INTELIGENCIA ARTIFICIAL'
  | 'BIO-INGENIERÍA'
  | 'CULTURA SINTÉTICA'
  | 'ECONOMÍA'

interface ArticlePreview {
  _id: string; slug: string; title: string; excerpt: string
  category: ArticleCategory; premium: boolean; author: string
  publishedAt: string; readTimeMinutes: number
  coverImage?: SanityImageRef
}

interface Article extends ArticlePreview {
  content: PortableTextBlock[]
}
```

## Data Flow

```
Sanity CMS → GROQ query (infrastructure) → listArticlesQuery (application)
  → ArticlesListView (view/RSC) → ArticleCard / ArticleHero (components)
```

## Feature Flags

- `PREMIUM_ENABLED` — when `false`, premium articles render full content (no paywall)

## ISR

- `revalidatePath('/', 'layout')` and `revalidatePath('/articulos/[slug]', 'page')` triggered by Sanity webhook at `/api/revalidate`
- `generateStaticParams` in `app/articulos/[slug]/page.tsx` fetches all slugs at build time

## Content Block Styling (`content-block.tsx`)

Custom `PortableTextComponents` map. All styles follow the design system tokens.

| Element | Style rule |
|---------|-----------|
| `normal` (p) | `font-serif text-xl leading-[1.8] text-ink-subtle`. First paragraph gets a drop cap: `first-letter` in brand red, `text-7xl font-black`. |
| `h2` | `font-sans font-black text-3xl/4xl uppercase tracking-tighter` + `border-b-2 border-ink pb-4`. Section divider. |
| `h3` | `font-sans font-black text-2xl/3xl uppercase tracking-tighter`. Slightly smaller than h2, no decoration. |
| `h4` | `font-sans font-black text-lg uppercase text-muted tracking-tighter`. Subtle sub-heading, de-emphasized with `text-muted`. |
| `blockquote` | `border-l-4 border-brand bg-surface-dim p-8-10 shadow-brutal`. Pull quote in italic serif `text-2xl/3xl`. |
| `ul` | `space-y-3`. Each `li` rendered as flex row with a `2x2 bg-brand` square bullet. |
| `ol` | `space-y-3`. Each `li` rendered as flex row with `01.` counter in `font-mono text-sm text-brand`. |
| `strong` | `font-black text-ink` — darkens and fattens emphasis. |
| `em` | `italic text-muted` — serif italic, slightly de-emphasized. |
| `code` | `font-mono text-sm bg-surface-dim border border-divider px-1.5 py-0.5 text-brand`. Inline code. |
| `link` | `text-brand underline underline-offset-2 hover:text-ink transition-colors`. Opens in new tab. |
| `underline` | `underline underline-offset-2`. |
| `strike-through` | `line-through text-meta`. |
| `image` (type) | Full-bleed `aspect-video` figure with `shadow-brutal-lg`, `grayscale contrast-[1.1]`, optional mono caption. |

> **Note:** `@tailwindcss/typography` is NOT installed. Do not use `prose` classes — they have no effect. All typography is explicit.

## Gotchas

- Sanity `PortableText` renders via `<PortableText value={article.content} components={portableTextComponents} />` — custom block types are defined in `content-block.tsx`
- `ReadTracker` fires PostHog events at 25/50/75/100% scroll depth using `IntersectionObserver` on hidden sentinel elements
- `urlFor(image).width(n).height(n).url()` — must call `.url()` at the end or you get a builder object, not a string
- `ArticleAside` computes `relativeDate` server-side via `formatRelativeDate(article.publishedAt, locale)` and passes labels for `ShareModal` to the `ArticleActions` client component
- `ArticleActions` manages `isShareOpen` + `currentUrl` (set inside `useEffect` to avoid SSR) and renders `<ShareModal>` — no `navigator.share` or clipboard logic lives here
- `ArticleHeader` h1 uses `text-3xl sm:text-5xl` + `break-words` to prevent long uppercase words (e.g. "INFRAESTRUCTURA") from overflowing on 375px viewports
