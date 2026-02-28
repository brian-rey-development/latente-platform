import { articleSanityRepository } from '../../infrastructure'

export async function getArticleSlugsQuery(): Promise<string[]> {
  return articleSanityRepository.getAllSlugs()
}
