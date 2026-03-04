import { reportSanityRepository } from '../../infrastructure'

export async function getReportSlugsQuery(): Promise<string[]> {
  return reportSanityRepository.getAllSlugs()
}
