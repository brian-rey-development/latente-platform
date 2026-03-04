import type { Report, ReportPreview } from './types'

export interface ReportRepository {
  readonly getAll: () => Promise<ReportPreview[]>
  readonly getBySlug: (slug: string) => Promise<Report | null>
  readonly getAllSlugs: () => Promise<string[]>
}
