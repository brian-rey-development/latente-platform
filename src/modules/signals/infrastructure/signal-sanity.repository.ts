import { sanityClient, isSanityConfigured } from '@/sanity/client'
import {
  SIGNALS_LIST_QUERY,
  SIGNAL_BY_SLUG_QUERY,
  SIGNAL_SLUGS_QUERY,
  SIGNAL_SLUGS_EN_QUERY,
} from '@/sanity/queries'
import type { SignalRepository } from '../domain/signal.repository'
import type { Signal, SignalPreview } from '../domain/types'

export const signalSanityRepository: SignalRepository = {
  getAll: async () => {
    if (!isSanityConfigured()) return []
    return sanityClient.fetch<SignalPreview[]>(
      SIGNALS_LIST_QUERY,
      {},
      { next: { tags: ['signals'] } },
    )
  },

  getRecent: async (limit: number) => {
    if (!isSanityConfigured()) return []
    const all = await sanityClient.fetch<SignalPreview[]>(
      SIGNALS_LIST_QUERY,
      {},
      { next: { tags: ['signals'] } },
    )
    return all.slice(0, limit)
  },

  getBySlug: async (slug: string) => {
    if (!isSanityConfigured()) return null
    return sanityClient.fetch<Signal | null>(
      SIGNAL_BY_SLUG_QUERY,
      { slug },
      { next: { tags: [`signal-${slug}`] } },
    )
  },

  getAllSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(
      SIGNAL_SLUGS_QUERY,
      {},
      { next: { tags: ['signals'] } },
    )
    return results.map((r) => r.slug)
  },

  getAllEnSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(
      SIGNAL_SLUGS_EN_QUERY,
      {},
      { next: { tags: ['signals'] } },
    )
    return results.map((r) => r.slug)
  },
}
