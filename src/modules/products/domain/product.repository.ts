import type { Product } from './types'

export interface ProductRepository {
  readonly getAll: () => Promise<Product[]>
  readonly getBySlug: (slug: string) => Promise<Product | null>
}
