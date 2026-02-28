import type { Product } from '../domain/types'
import { ProductCard } from './product-card'

interface ProductGridProps {
  readonly products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-ink">
      {products.map((product, idx) => (
        <ProductCard key={product._id} product={product} index={idx} />
      ))}
    </div>
  )
}
