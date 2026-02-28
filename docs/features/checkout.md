# Feature: Checkout

Checkout form flow. Payment is currently stubbed — no real payment processor.

## Files

```
src/modules/checkout/
  domain/
    types.ts             CheckoutFormData, Order, OrderStatus
    checkout.service.ts  validateOrder(), calculateTotal() — pure fns
  components/
    checkout-form.tsx   Client — uses <FormField> + <Button>
    order-summary.tsx   Client — reads Zustand cart
    success-screen.tsx  Client — post-submit state
  hooks/
    use-checkout.ts     Form state + no-op submit handler
  views/
    checkout.view.tsx   Client — orchestrates form + summary + success
```

## Flow

```
User clicks "Proceder al Pago" in CartSummary
  → navigates to /tienda/checkout
  → CheckoutView reads cart items from Zustand
  → renders CheckoutForm + OrderSummary side by side
  → on submit: status transitions idle → loading → success (stub)
  → SuccessScreen shown, cart cleared
```

## Stub Status

`use-checkout.ts` `handleSubmit` calls `e.preventDefault()` and sets `status = 'success'` after a timeout. When real payment is integrated (Stripe), replace the handler body.

## Feature Flag

Gated behind `STORE_ENABLED`. Route calls `notFound()` when disabled.
