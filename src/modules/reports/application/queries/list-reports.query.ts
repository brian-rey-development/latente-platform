import { reportSanityRepository } from '../../infrastructure'
import type { ReportPreview } from '../../domain/types'

export async function listReportsQuery(): Promise<ReportPreview[]> {
  return reportSanityRepository.getAll()
}
