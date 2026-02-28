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
    article-aside.tsx     Server RSC — author, read time, share strip
    article-content.tsx   Server RSC — <PortableText> renderer
    content-block.tsx     Server RSC — custom PortableText component map
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

## Gotchas

- Sanity `PortableText` renders via `<PortableText value={article.content} components={portableTextComponents} />` — custom block types are defined in `content-block.tsx`
- `ReadTracker` fires PostHog events at 25/50/75/100% scroll depth using `IntersectionObserver` on hidden sentinel elements
- `urlFor(image).width(n).height(n).url()` — must call `.url()` at the end or you get a builder object, not a string
