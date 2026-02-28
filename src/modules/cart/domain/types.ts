export type { CartItem } from '../../products/domain/types'

export interface CartState {
  readonly items: import('../../products/domain/types').CartItem[]
  readonly addItem: (product: import('../../products/domain/types').Product) => void
  readonly removeItem: (id: string) => void
  readonly updateQty: (id: string, delta: number) => void
  readonly clearCart: () => void
}
