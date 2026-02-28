# Best Practices

Engineering standards for this codebase. Read this before writing any code.

## Non-negotiable rules

- **No `any` types.** Use `unknown` + type narrowing, or infer via `Parameters<typeof fn>[0]`
- **No spaghetti code.** One function, one reason to change. If a function does two things, split it.
- **No unnecessary comments.** Names document the *what*. Comments document the *why* — only when non-obvious.
- **No TODO comments** in committed code. Either do it or create a tracked task.
- **No magic numbers or strings.** Named constants in `domain/constants.ts` for business values.
- **No speculative abstractions.** Three real uses before extracting. Duplication is cheaper than the wrong abstraction.
- **Early returns.** Guard clauses at the top, happy path at the bottom. Flat nesting wins.
- **Immutability by default.** `const` over `let`, `readonly` on interfaces, no direct mutation.
- **Pure domain layer.** `domain/` files — zero side effects, no React, no I/O, no async.

## Component rules

- Components over ~80 lines are a smell — consider splitting.
- Functions over 20 lines are a smell — consider extracting.
- No nested ternaries. Use an early return or a named boolean instead.
- Props interfaces are `readonly`. If you're mutating a prop, something is wrong.

## TypeScript

- Strict mode is on. The compiler is your first reviewer — don't fight it.
- Infer types from function signatures when possible: `Parameters<typeof fn>[0]`
- Discriminated unions over boolean flags for state that has exclusive modes.
- `as` casting is a code smell. If you need it, the types are wrong upstream.

## Design system

All UI goes through the primitives in `src/shared/ui/`. See `docs/design-system.md`.

- **Buttons** → `<Button>` or `buttonVariants()` on `<Link>`
- **Label + input pairs** → `<FormField>`
- **Colors** → `@theme` tokens in `globals.css`. No new hex literals in components.

Run `/ds-audit` after any UI work to catch violations.

## Analytics

Every user-facing action must be evaluated for tracking before the feature ships. Ask:

1. What does the user do here?
2. What does the business need to know?
3. Does an event in `ANALYTICS_EVENTS` already cover it?
4. If not — add the constant first, then instrument. Never string literals.

Tracking belongs in the component closest to the action (usually a Client Component). It is not optional and does not get added "later".

## Error handling

- Validate at system boundaries: user input, external API responses, URL params, env vars.
- Trust internal code and framework guarantees — no defensive checks inside pure functions.
- API routes and auth code get extra scrutiny before editing.

## Git hygiene

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Never commit without asking first.
- Never push without asking first. Never force-push to main.
- Never bypass hooks (`--no-verify`).
