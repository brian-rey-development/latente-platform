'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../../products/domain/types'
import type { Product } from '../../products/domain/types'
import { CartService } from '../domain/cart.service'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item._id === product._id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
              ),
              isOpen: true,
            }
          }
          return { items: [...state.items, { ...product, qty: 1 }], isOpen: true }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),

      updateQty: (id, delta) =>
        set((state) => ({
          items: CartService.applyQuantityUpdate(state.items, id, delta),
        })),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'latente-cart', skipHydration: true },
  ),
)
