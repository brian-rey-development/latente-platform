# Feature: Products (Store)

E-commerce product catalog. Currently gated behind `STORE_ENABLED` feature flag.

## Files

```
src/modules/products/
  domain/
    types.ts              Product, ProductType, CartItem
    constants.ts          PRODUCT_TYPES
    product.service.ts    formatPrice(), validateProduct() — pure fns
    product.repository.ts ProductRepository interface
  infrastructure/
    product-sanity.repository.ts  GROQ queries via Sanity client
  application/
    queries/
      list-products.query.ts  getAll products
  components/
    product-card.tsx   Client — addItem to cart + ADD_TO_CART analytics
    product-grid.tsx   Server RSC — grid layout
  views/
    products-list.view.tsx  Server RSC — calls listProductsQuery
```

## Key Types

```typescript
type ProductType = 'DIGITAL' | 'FÍSICO' | 'MEMBRESÍA'

interface Product {
  _id: string; slug: string; name: string
  productType: ProductType; price: number
  image?: SanityImageRef
}

interface CartItem extends Product {
  qty: number
}
```

## Feature Flag

Route `app/tienda/page.tsx` calls `notFound()` when `FEATURE_FLAGS.STORE_ENABLED === false`. Same for `app/tienda/checkout/page.tsx`. Cart button is hidden from navbar.

## Gotchas

- `ProductCard` is `'use client'` solely for `useCart().addItem()`. If cart is removed, this becomes a Server Component.
- Price is stored in USD cents or dollars depending on Sanity input — confirm with schema. Currently treated as dollars: `formatPrice(product.price)`.
