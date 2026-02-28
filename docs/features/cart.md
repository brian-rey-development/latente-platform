# Feature: Cart

Client-side cart using Zustand with localStorage persistence.

## Files

```
src/modules/cart/
  domain/
    types.ts          CartState, CartStore interfaces
    cart.service.ts   calculateTotal() — pure fn
  store/
    cart.store.ts     Zustand store (persist middleware, skipHydration: true)
  components/
    cart-overlay.tsx  Client — drawer, body scroll lock
    cart-item.tsx     Client — qty controls (+/-)
    cart-summary.tsx  Client — total + checkout link
  hooks/
    use-cart.ts       Selector wrappers around useCartStore
```

## State Shape

```typescript
interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem(product: Product): void    // increments qty if already in cart
  removeItem(id: string): void
  updateQty(id: string, delta: number): void  // removes item if qty reaches 0
  clearCart(): void
  openCart(): void
  closeCart(): void
  itemCount: number                  // derived selector
  total: number                      // derived selector
}
```

## Persistence

- Zustand `persist` middleware, localStorage key: `latente-cart`
- `skipHydration: true` prevents SSR mismatch — store hydrates on first client render
- Barrel export: `cart-item.tsx` component is exported as `CartItemRow` from `components/index.ts` to avoid collision with the `CartItem` type from `products/domain/types.ts`

## Gotchas

- `CartOverlay` prevents body scroll while open via `document.body.style.overflow = 'hidden'`. Always reset in cleanup: `return () => { document.body.style.overflow = '' }`
- Cart is gated: when `FEATURE_FLAGS.STORE_ENABLED === false`, `CartOverlay` is not rendered in layout and the navbar cart button is hidden
