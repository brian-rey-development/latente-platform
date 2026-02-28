'use client'

import { useMemo } from 'react'
import { useCartStore } from '../store/cart.store'
import { CartService } from '../domain/cart.service'

export function useCart() {
  const { items, isOpen, addItem, removeItem, updateQty, clearCart, openCart, closeCart } =
    useCartStore()

  const total = useMemo(() => CartService.calculateTotal(items), [items])
  const itemCount = useMemo(() => CartService.calculateItemCount(items), [items])

  return {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    openCart,
    closeCart,
    total,
    itemCount,
  }
}
