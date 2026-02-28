# Platform

Next.js blog for Latente. All production code lives here.

## Commands

```bash
pnpm dev        # Dev server at localhost:3000
pnpm build      # Production build (Turbopack)
pnpm lint       # ESLint
pnpm start      # Start production server
```

---

## Documentation — source of truth

Read the relevant doc before starting any task. Update it before closing any task.

| Topic | File |
|-------|------|
| Architecture, stack, routes, build notes | `docs/architecture.md` |
| Code quality and engineering standards | `docs/best-practices.md` |
| Design system (components, tokens, rules) | `docs/design-system.md` |
| References and reading list | `docs/references.md` |
| Feature: Articles | `docs/features/articles.md` |
| Feature: Products | `docs/features/products.md` |
| Feature: Cart | `docs/features/cart.md` |
| Feature: Checkout | `docs/features/checkout.md` |
| Feature: Auth | `docs/features/auth.md` |
| Feature: Search | `docs/features/search.md` |
| Feature: Analytics | `docs/features/analytics.md` |

### Docs maintenance (mandatory)

- **New feature** → create `docs/features/<name>.md`, add to this index
- **Modified feature** → update its feature doc
- **New/modified UI component** → update `docs/design-system.md` + `.claude/skills/ds-audit.md`
- **Analytics** — every user-facing action needs a tracked event. Never ship without it.

---

## Env vars

See `.env.example` — all variables with inline documentation.
