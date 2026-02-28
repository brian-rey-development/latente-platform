# References

Curated resources that informed architectural and design decisions in this project. Updated as the stack evolves.

---

## Design Systems

### Foundations

- [The Design System Guide — Documentation](https://thedesignsystem.guide/documentation)
  Core principles: anatomy, variants, usage guidelines, and what every component doc needs.

- [How to Document Design System Components — StackBlitz](https://blog.stackblitz.com/posts/design-system-component-documentation/)
  Practical structure: include all variants visually, provide copy-paste snippets per variant.

- [Design Tokens That Scale in 2026 (Tailwind v4 + CSS Variables) — Mavik Labs](https://www.maviklabs.com/blog/design-tokens-tailwind-v4-2026)
  Three-layer token model: base (raw values) → semantic (purpose) → component (variants). The `@theme` directive in Tailwind v4 collapses design token sprawl into a single CSS-first source of truth.

### Tailwind v4

- [Tailwind CSS Best Practices 2025-2026: Design Tokens — FrontendTools](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
  How to use `@theme inline` for project-wide tokens. Recommends moving away from `@apply` in favor of explicit component primitives.

- [Exploring Typesafe Design Tokens in Tailwind 4 — DEV Community](https://dev.to/wearethreebears/exploring-typesafe-design-tokens-in-tailwind-4-372d)
  Generating type-safe utility classes from `@theme` tokens.

- [Tailwind CSS 4 @theme: The Future of Design Tokens — Medium](https://medium.com/@sureshdotariya/tailwind-css-4-theme-the-future-of-design-tokens-at-2025-guide-48305a26af06)
  Deep-dive into the `@theme` API — how tokens become CSS variables and Tailwind utilities simultaneously.

- [Don't Use Tailwind for Your Design System — sancho.dev](https://sancho.dev/blog/tailwind-and-design-systems)
  Counter-argument worth reading: when utility-first becomes a liability at scale, and when to extract component primitives (as we do with `<Button>`, `<FormField>`).

### Variant Patterns

- [Integrating Design Tokens with Tailwind — Michael Mangialardi](https://www.michaelmang.dev/blog/integrating-design-tokens-with-tailwind/)
  Token-to-utility integration patterns. Related to our `buttonVariants()` recipe approach (similar to shadcn/ui's `cva`).

---

## Component Libraries (for reference, not dependencies)

- [Best Type-Safe UI Component Libraries for React in 2026 — DEV Community](https://dev.to/ninarao/best-type-safe-ui-component-libraries-for-react-in-2026-f22)
  2026 landscape: first-class TypeScript, WCAG accessibility, RSC compatibility, and tree-shakeable packages.

- [14 Best React UI Component Libraries in 2026 — Untitled UI](https://www.untitledui.com/blog/react-component-libraries)
  Comparative overview including shadcn/ui, Radix, Ark UI — useful for evaluating future additions.

---

## Enforcement & Linting

- [How ESLint Can Enforce Your Design System Best Practices — Backlight](https://backlight.dev/blog/best-practices-w-eslint-part-1)
  Part 1: using ESLint to detect and ban raw platform components in favor of design system components.

- [Translating Your Design System Best Practices to ESLint — Backlight](https://backlight.dev/blog/best-practices-w-eslint-part-2)
  Part 2: writing custom rules that surface actionable error messages with fix suggestions.

- [Encouraging Design System Best Practices with ESLint Rules — Backlight](https://backlight.dev/blog/best-practices-w-eslint-part-3)
  Part 3: strategies for incremental adoption — warning vs error severity, per-directory configs.

- [eslint-plugin-design-system — GitHub (dslounge)](https://github.com/dslounge/eslint-plugin-design-system)
  Reference implementation: how production teams ship ESLint plugins for design system enforcement.

---

## Architecture

- [Ultimate TypeScript Project Structure for 2026 — Medium](https://medium.com/@mernstackdevbykevin/an-ultimate-typescript-project-structure-2026-edition-4a2d02faf2e0)
  Feature-first architecture patterns in TypeScript. Validates the DDD module structure used in `src/modules/`.

- [Feature-Sliced Design — ESLint Config Guide](https://feature-sliced.design/blog/mastering-eslint-config)
  Layer-based import rules that prevent hidden coupling between modules.

---

## Next.js / React

- [Frontend Handbook: React / Tailwind Best Practices — Infinum](https://infinum.com/handbook/frontend/react/tailwind/best-practices)
  Production rules: extract repeated class patterns (>3 uses) into components, use `clsx` for conditionals, keep component trees flat.

- [Creating a Component Design System Using React, TypeScript and Storybook — DEV Community](https://dev.to/andrewbaisden/creating-a-component-design-system-using-react-typescript-and-storybook-381g)
  Full workflow for a typed component library with visual regression testing. Relevant if Storybook is added in the future.
