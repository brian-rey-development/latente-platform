import type { SanityImageRef } from '../../articles/domain/types'

export type ProductType = 'DIGITAL' | 'FÍSICO' | 'MERCH' | 'SUSCRIPCIÓN'

export interface Product {
  readonly _id: string
  readonly name: string
  readonly slug: string
  readonly productType: ProductType
  readonly price: number
  readonly image: SanityImageRef | null
}

export interface CartItem extends Product {
  readonly qty: number
}
