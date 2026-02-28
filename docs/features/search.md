# Feature: Search

Client-side fuzzy search over articles loaded from the server at layout level.

## Files

```
src/modules/search/
  domain/
    types.ts           SearchState
    search.service.ts  fuzzyFilter(articles, query) — pure fn
  components/
    search-overlay.tsx    Client — modal, controlled input, Escape key closes
    search-result-item.tsx Client — single result row with link
  hooks/
    use-search.ts  open/close state + filtered results via search.service
```

## Data Flow

```
app/layout.tsx (Server) → fetches all ArticlePreview[] from listArticlesQuery
  → passes articles prop to <Navbar>
  → Navbar passes to <SearchOverlay articles={articles}>
  → useSearch({ articles }) runs fuzzyFilter on every keystroke (pure, no network)
```

## Why No Server Search

Article list is small enough that client-side filtering has zero perceptible latency. If the article count grows significantly (>500), replace `search.service.ts` with a server-side API call (e.g. Sanity's native search or Algolia).

## Gotchas

- `setTimeout(() => inputRef.current?.focus(), 50)` on open — the 50ms delay is needed because the overlay renders conditionally and the DOM element may not exist immediately
- Body scroll is locked while overlay is open (same pattern as `CartOverlay`)
- Search indexes: `title`, `excerpt`, `author`, `category` — see `search.service.ts` for the exact fields
