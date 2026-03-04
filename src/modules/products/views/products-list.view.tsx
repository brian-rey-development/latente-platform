import { strings } from '@/shared/lib/strings'
import { listProductsQuery } from '../application/queries/list-products.query'
import { ProductGrid } from '../components/product-grid'

export async function ProductsListView() {
  const products = await listProductsQuery()

  return (
    <div className="bg-surface min-h-screen">
      <header className="bg-brand text-surface p-6 md:p-16 border-b-2 border-ink">
        <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-display-lg uppercase leading-[0.9] tracking-tighter mb-4">
          {strings.store.heading1}
        </h1>
        <p className="font-mono text-lg font-bold uppercase tracking-widest max-w-xl">
          {strings.store.subtitle}
        </p>
      </header>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="p-16 text-center">
          <p className="font-mono uppercase tracking-widest text-meta">
            {strings.store.noProducts}
          </p>
        </div>
      )}
    </div>
  )
}
