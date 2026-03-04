import { sanityClient, isSanityConfigured } from '@/sanity/client'
import { VENTURES_LIST_QUERY, VENTURE_BY_SLUG_QUERY, VENTURE_SLUGS_QUERY } from '@/sanity/queries'
import type { VentureRepository } from '../domain/venture.repository'
import type { Venture, VenturePreview } from '../domain/types'

export const ventureSanityRepository: VentureRepository = {
  getAll: async () => {
    if (!isSanityConfigured()) return []
    return sanityClient.fetch<VenturePreview[]>(
      VENTURES_LIST_QUERY,
      {},
      { next: { tags: ['ventures'] } },
    )
  },

  getBySlug: async (slug: string) => {
    if (!isSanityConfigured()) return null
    return sanityClient.fetch<Venture | null>(
      VENTURE_BY_SLUG_QUERY,
      { slug },
      { next: { tags: [`venture-${slug}`] } },
    )
  },

  getAllSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(VENTURE_SLUGS_QUERY)
    return results.map((r) => r.slug)
  },
}
