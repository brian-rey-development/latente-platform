import { ventureSanityRepository } from '../../infrastructure'

export async function getVentureSlugsQuery(): Promise<string[]> {
  return ventureSanityRepository.getAllSlugs()
}
