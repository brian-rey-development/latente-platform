import { sanityClient, isSanityConfigured } from '@/sanity/client'
import { REPORTS_LIST_QUERY, REPORT_BY_SLUG_QUERY, REPORT_SLUGS_QUERY } from '@/sanity/queries'
import type { ReportRepository } from '../domain/report.repository'
import type { Report, ReportPreview } from '../domain/types'

export const reportSanityRepository: ReportRepository = {
  getAll: async () => {
    if (!isSanityConfigured()) return []
    return sanityClient.fetch<ReportPreview[]>(
      REPORTS_LIST_QUERY,
      {},
      { next: { tags: ['reports'] } },
    )
  },

  getBySlug: async (slug: string) => {
    if (!isSanityConfigured()) return null
    return sanityClient.fetch<Report | null>(
      REPORT_BY_SLUG_QUERY,
      { slug },
      { next: { tags: [`report-${slug}`] } },
    )
  },

  getAllSlugs: async () => {
    if (!isSanityConfigured()) return []
    const results = await sanityClient.fetch<{ slug: string }[]>(REPORT_SLUGS_QUERY)
    return results.map((r) => r.slug)
  },
}
