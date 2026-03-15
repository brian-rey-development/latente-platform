import { reportSanityRepository } from '../../infrastructure'

export async function getReportSlugsEnQuery(): Promise<string[]> {
  return reportSanityRepository.getAllEnSlugs()
}
