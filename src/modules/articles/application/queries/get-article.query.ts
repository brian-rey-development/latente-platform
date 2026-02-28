import { articleSanityRepository } from '../../infrastructure'
import type { Article } from '../../domain/types'

export async function getArticleQuery(slug: string): Promise<Article | null> {
  return articleSanityRepository.getBySlug(slug)
}
