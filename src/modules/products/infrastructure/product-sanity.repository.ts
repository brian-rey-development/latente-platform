import { sanityClient, isSanityConfigured } from '@/sanity/client'
import { PRODUCTS_LIST_QUERY } from '@/sanity/queries'
import type { ProductRepository } from '../domain/product.repository'
import type { Product } from '../domain/types'

export const productSanityRepository: ProductRepository = {
  getAll: async () => {
    if (!isSanityConfigured()) return []
    return sanityClient.fetch<Product[]>(
      PRODUCTS_LIST_QUERY,
      {},
      { next: { tags: ['products'] } },
    )
  },

  getBySlug: async (slug: string) => {
    if (!isSanityConfigured()) return null
    return sanityClient.fetch<Product | null>(
      `*[_type == "product" && slug.current == $slug][0] { _id, name, "slug": slug.current, productType, price, image }`,
      { slug },
    )
  },
}
