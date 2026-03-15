'use server'

import { articleSanityRepository } from '../../infrastructure'
import type { ArticlePreview } from '../../domain/types'

export async function searchArticlesAction(): Promise<ArticlePreview[]> {
  return articleSanityRepository.getAll()
}
