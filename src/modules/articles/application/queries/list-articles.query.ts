import { articleSanityRepository } from '../../infrastructure'
import { ArticleService } from '../../domain/article.service'
import type { ArticleCategory, ArticlePreview } from '../../domain/types'

interface ListArticlesFilters {
  readonly category?: ArticleCategory
  readonly search?: string
}

export async function listArticlesQuery(
  filters?: ListArticlesFilters,
): Promise<ArticlePreview[]> {
  const articles = await articleSanityRepository.getAll()

  let result = articles

  if (filters?.category) {
    result = ArticleService.filterByCategory(result, filters.category)
  }

  if (filters?.search) {
    result = ArticleService.search(result, filters.search)
  }

  return result
}
