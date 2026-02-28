import { articleSanityRepository } from '../../infrastructure'

export async function getArticleSlugsEnQuery(): Promise<string[]> {
  return articleSanityRepository.getAllEnSlugs()
}
