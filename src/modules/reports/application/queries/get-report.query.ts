import { reportSanityRepository } from '../../infrastructure'
import type { Report } from '../../domain/types'

export async function getReportQuery(slug: string): Promise<Report | null> {
  return reportSanityRepository.getBySlug(slug)
}
