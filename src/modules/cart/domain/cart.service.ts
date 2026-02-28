import type { CartItem } from '../../products/domain/types'

export const CartService = {
  calculateTotal(items: readonly CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  calculateItemCount(items: readonly CartItem[]): number {
    return items.reduce((sum, item) => sum + item.qty, 0)
  },

  applyQuantityUpdate(items: readonly CartItem[], id: string, delta: number): CartItem[] {
    return items
      .map((item) =>
        item._id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item,
      )
      .filter((item) => item.qty > 0)
  },
} as const
