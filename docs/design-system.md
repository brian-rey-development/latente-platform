# Latente Design System

Latente uses a minimal, bespoke design system built on Tailwind v4 `@theme` tokens and typed React primitives. It is intentionally small - every component earns its place. When in doubt, check this doc before writing inline Tailwind.

---

## Token Architecture

Three layers, following the 2026 W3C Design Tokens Community Group recommendation:

| Layer | What it holds | Where it lives |
|-------|--------------|----------------|
| **Base** | Raw values (hex, px, ms) | `src/app/globals.css` → `@theme inline` |
| **Semantic** | Named roles (brand, surface, text) | Same `@theme`, aliased CSS vars |
| **Component** | Variant recipes | `src/shared/ui/*.tsx` |

### Color tokens (`globals.css`)

```css
@theme inline {
  --color-brand:        #E60000;  /* Signal Red */
  --color-brand-muted:  #FFB3B3;  /* Tint used on brand-red backgrounds (newsletter) */
  --color-ink:          #111111;  /* Obsidian Black - primary dark surface */
  --color-ink-subtle:   #222222;  /* Subtle dark (borders/dividers in dark contexts) */
  --color-surface:      #F7F7F5;  /* Paper Bone - page/card background */
  --color-surface-dim:  #F0F0EE;  /* Grayed surface - blockquotes, sidebars */
  --color-border:       #333333;  /* Dark-context borders */
  --color-divider:      #EEEEEE;  /* Light dividers (mobile nav menu) */
  --color-muted:        #555555;  /* Secondary body text */
  --color-meta:         #888888;  /* Labels, meta text, captions */
  --color-dim:          #AAAAAA;  /* Faint text on dark backgrounds */
}
```

These tokens are the **only** place raw hex values are defined. Everywhere else references them via Tailwind utilities generated from `@theme`.

> **Rule:** Never hardcode a hex color inline in a component. If a value isn't in `@theme`, it doesn't belong in the design system — add it there first.

### Shadow tokens (`globals.css`)

Brutalist shadows are token-driven. Always use the token class; never write `shadow-[...]` with hex.

```css
@theme inline {
  --shadow-brutal-sm:       2px 2px 0px var(--color-ink);
  --shadow-brutal-sm-brand: 2px 2px 0px var(--color-brand);
  --shadow-brutal:          4px 4px 0px var(--color-ink);
  --shadow-brutal-brand:    4px 4px 0px var(--color-brand);
  --shadow-brutal-lg:       8px 8px 0px var(--color-brand);
  --shadow-brutal-xl:      12px 12px 0px var(--color-brand);
}
```

| Class | Usage |
|-------|-------|
| `shadow-brutal-sm` | Small ink shadow (share/bookmark buttons) |
| `shadow-brutal-sm-brand` | Small brand shadow |
| `shadow-brutal` | Standard ink shadow (blockquotes) |
| `shadow-brutal-brand` | Standard brand shadow (product add-to-cart) |
| `shadow-brutal-lg` | Large brand shadow (content images) |
| `shadow-brutal-xl` | XL brand shadow (paywall block) |

---

## Typography

All typography is set via font families applied at the layout level:

| Family | CSS var | Tailwind class | Role |
|--------|---------|----------------|------|
| Geist Sans | `--font-geist-sans` | `font-sans` | Headlines, labels, buttons |
| Geist Mono | `--font-geist-mono` | `font-mono` | Body meta, captions, code, badges |
| Serif (system) | — | `font-serif` | Long-form article body |

### Typographic patterns

```tsx
// Section heading
<h2 className="font-sans font-black text-4xl uppercase tracking-tighter">

// Body text (article)
<p className="font-serif text-xl leading-[1.8]">

// Label / meta
<span className="font-mono text-xs font-bold uppercase tracking-widest text-meta">
```

---

## Components

### `<Button>`

**File:** `src/shared/ui/button.tsx`

Covers all interactive `<button>` elements. For `<Link>` elements styled as buttons, export `buttonVariants()` and apply the returned class string.

#### Props

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   'primary' | 'cta' | 'icon'  // default: 'primary'
  size?:      'md' | 'lg'                  // default: 'lg' (ignored for 'icon')
  fullWidth?: boolean                      // default: false
}
```

#### Variants

| Variant | Resting state | Hover state | Usage |
|---------|--------------|-------------|-------|
| `primary` | Ink bg, surface text | Brand bg | Default CTA, form submit on light bg |
| `cta` | Brand bg, surface text + border | Surface bg, brand text | Primary marketing action, auth forms |
| `icon` | Ink bg, surface text, `p-3`, brand shadow | Brand bg, shadow removed, shifted 1px | Icon-only actions (add to cart) |

#### Sizes

Ignored for `icon` variant (padding is built into the variant).

| Size | Padding | Font size |
|------|---------|-----------|
| `lg` | `px-8 py-5` | `text-xl` |
| `md` | `px-6 py-4` | `text-sm` |

#### Usage — button element

```tsx
import { Button } from '@/shared/ui/button'

// Form submit (primary, full-width)
<Button type="submit" variant="primary" fullWidth>
  <CreditCard size={24} /> Confirmar Pedido
</Button>

// Marketing CTA (cta, default size)
<Button variant="cta" onClick={handleAuth}>
  Autenticar / Suscribirse <Unlock size={20} />
</Button>

// Icon-only action (add to cart)
<Button variant="icon" onClick={handleAddToCart} aria-label="Agregar al carrito">
  <Plus size={24} />
</Button>
```

#### Usage — link styled as button

```tsx
import Link from 'next/link'
import { buttonVariants } from '@/shared/ui/button'

<Link href="/" className={buttonVariants({ variant: 'primary' })}>
  Volver al Inicio
</Link>

// With overrides
<Link
  href="/tienda"
  className={`${buttonVariants({ variant: 'cta', size: 'md' })} inline-flex`}
>
  Ir a la tienda
</Link>
```

#### Anti-patterns

```tsx
// BAD - inline button styles with hex colors
<button className="bg-[#111] text-[#F7F7F5] font-sans font-black uppercase px-8 py-5 hover:bg-[#E60000] transition-colors">
  Submit
</button>

// BAD - using <Link> with manual button classes (use buttonVariants instead)
<Link className="bg-brand font-black uppercase ...">Click</Link>

// BAD - icon button without Button variant="icon"
<button className="bg-[#111] text-[#F7F7F5] p-3 hover:bg-[#E60000] shadow-[4px_4px_0px_#E60000]">
  <Plus size={24} />
</button>
```

---

### `<FormField>`

**File:** `src/shared/ui/form-field.tsx`

Covers all label + input pairs. Handles accessibility (`htmlFor`/`id` linkage) and theme switching between light and dark backgrounds.

#### Props

```typescript
interface FormFieldProps {
  label:        string
  name:         string                   // used for both id and name attributes
  type?:        HTMLInputTypeAttribute   // default: 'text'
  value:        string
  onChange:     (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?:    boolean
  maxLength?:   number
  minLength?:   number
  theme?:       'light' | 'dark'         // default: 'light'
}
```

#### Themes

| Theme | When to use | Border | Background | Text |
|-------|-------------|--------|------------|------|
| `light` | White / surface background (checkout) | `border-ink` | `bg-surface` | `text-ink` |
| `dark` | Dark background (auth modal) | `border-border` | transparent | `text-surface` |

Focus state is always `border-brand` regardless of theme.

#### Usage

```tsx
import { FormField } from '@/shared/ui/form-field'

// Light theme (default) - checkout form
<FormField
  label="Nombre completo"
  name="name"
  value={formData.name}
  onChange={onChange}
  placeholder="Tu nombre"
  required
/>

// Dark theme - auth form
<FormField
  label="Contraseña"
  name="password"
  type="password"
  value={formData.password}
  onChange={onChange}
  placeholder="Mínimo 8 caracteres"
  required
  minLength={8}
  theme="dark"
/>

// Grid layout (two fields side by side)
<div className="grid grid-cols-2 gap-4">
  <FormField label="Expiración" name="expiry" maxLength={5} ... />
  <FormField label="CVV" name="cvv" maxLength={4} ... />
</div>
```

#### Anti-patterns

```tsx
// BAD - raw label + input (no FormField)
<div>
  <label className="font-mono text-xs font-bold uppercase tracking-widest text-meta block mb-2">
    Email
  </label>
  <input className="w-full border-2 border-ink bg-surface p-4 font-mono text-sm focus:outline-none focus:border-brand" />
</div>

// BAD - no htmlFor/id linkage (accessibility violation)
<label>Email</label>
<input name="email" />
```

---

### `<CategoryBadge>`

**File:** `src/shared/ui/category-badge.tsx`

Displays an article category. Stateless, server-renderable.

```tsx
import { CategoryBadge } from '@/shared/ui/category-badge'

<CategoryBadge category={article.category} />
// → <span class="font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest bg-brand text-surface">
//     INTELIGENCIA ARTIFICIAL
//   </span>
```

**Prop:** `category: ArticleCategory` — one of `'GEOPOLÍTICA' | 'INTELIGENCIA ARTIFICIAL' | 'BIO-INGENIERÍA' | 'CULTURA SINTÉTICA' | 'ECONOMÍA'`

---

### `<PremiumBadge>`

**File:** `src/shared/ui/premium-badge.tsx`

Indicates premium/gated content. Stateless, server-renderable. No props.

```tsx
import { PremiumBadge } from '@/shared/ui/premium-badge'

<PremiumBadge />
// → <span class="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-2 py-1 border border-brand text-brand uppercase tracking-widest">
//     🔒 CLASIFICADO
//   </span>
```

---

### `<MarqueeTicker>`

**File:** `src/shared/ui/marquee-ticker.tsx`

Horizontally scrolling ticker. Client component (CSS animation). Items are doubled internally for seamless looping.

```tsx
import { MarqueeTicker } from '@/shared/ui/marquee-ticker'

<MarqueeTicker items={['ITEM A', 'ITEM B', 'ITEM C']} />
```

**Prop:** `items: string[]`

---

## Shared Utilities

### `formatDate(iso: string): string`

Converts ISO 8601 datetime to `DD.MM.YYYY` using UTC methods.

```ts
import { formatDate } from '@/shared/lib/format-date'
formatDate('2025-03-15T10:00:00Z') // → '15.03.2025'
```

### `formatPrice(amount: number): string`

USD formatting via `Intl.NumberFormat`.

```ts
import { formatPrice } from '@/shared/lib/format-price'
formatPrice(24.99) // → '$24.99'
```

### `FEATURE_FLAGS`

Environment-variable-driven feature switches. See `CLAUDE.md → Feature Flags` for the full table.

```ts
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'

if (FEATURE_FLAGS.STORE_ENABLED) { ... }
```

---

## Adding a new component

1. Create `src/shared/ui/<component-name>.tsx`
2. Mark `'use client'` only if the component uses browser APIs, hooks, or event handlers
3. Export it from `src/shared/ui/index.ts`
4. Add a section to this document (props table, variants, usage, anti-patterns)
5. Run `/ds-audit` to verify no raw patterns remain that could be replaced

---

## Known anti-patterns

These are patterns the system explicitly prohibits. `/ds-audit` should catch all of them.

| Pattern | Why it's wrong | Use instead |
|---------|---------------|-------------|
| `bg-[#E60000]` | Raw hex — not in `@theme` | `bg-brand` |
| `text-[#111]` | Raw hex | `text-ink` |
| `bg-[#F7F7F5]` | Raw hex | `bg-surface` |
| `text-[#555]` | Raw hex | `text-muted` |
| `text-[#888]` | Raw hex | `text-meta` |
| `text-[#AAA]` | Raw hex | `text-dim` |
| `border-[#333]` | Raw hex | `border-border` |
| `border-[#EEE]` | Raw hex | `border-divider` |
| `bg-[#222]` | Raw hex | `bg-ink-subtle` |
| `bg-[#F0F0EE]` | Raw hex | `bg-surface-dim` |
| `text-[#FFB3B3]` | Raw hex | `text-brand-muted` |
| `shadow-[2px_2px_0px_#111]` | Raw shadow with hex | `shadow-brutal-sm` |
| `shadow-[4px_4px_0px_#E60000]` | Raw shadow with hex | `shadow-brutal-brand` |
| `shadow-[8px_8px_0px_#E60000]` | Raw shadow with hex | `shadow-brutal-lg` |
| `shadow-[12px_12px_0px_#E60000]` | Raw shadow with hex | `shadow-brutal-xl` |
| `<Link className="bg-brand ...">` | Use `buttonVariants()` instead | `buttonVariants({ variant: 'cta' })` |
| Inline category span | Use `<CategoryBadge>` | `<CategoryBadge category={...} />` |
| Inline premium span | Use `<PremiumBadge>` | `<PremiumBadge />` |
| Inline icon button | Use `<Button variant="icon">` | `<Button variant="icon">` |

---

## Quick reference — what to use when

| Need | Use |
|------|-----|
| Interactive button (submit, click handler) | `<Button>` |
| Icon-only button (add to cart, etc.) | `<Button variant="icon">` |
| Link that looks like a button | `buttonVariants()` on `<Link>` |
| Label + input pair | `<FormField>` |
| Article category label | `<CategoryBadge>` |
| Premium content indicator | `<PremiumBadge>` |
| Scrolling text banner | `<MarqueeTicker>` |
| Date string | `formatDate()` |
| Price in USD | `formatPrice()` |
| Feature toggle | `FEATURE_FLAGS.*` |
