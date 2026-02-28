export type OrderStatus = 'pending' | 'success' | 'error'

export interface CheckoutFormData {
  readonly name: string
  readonly email: string
  readonly cardNumber: string
  readonly expiry: string
  readonly cvv: string
}

export interface Order {
  readonly id: string
  readonly status: OrderStatus
  readonly total: number
  readonly items: import('../../products/domain/types').CartItem[]
}
