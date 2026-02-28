import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductsListView } from '@/modules/products/views/products-list.view'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Publicaciones, objetos y membresías de Latente.',
}

export default function TiendaPage() {
  if (!FEATURE_FLAGS.STORE_ENABLED) {
    notFound()
  }
  return <ProductsListView />
}
