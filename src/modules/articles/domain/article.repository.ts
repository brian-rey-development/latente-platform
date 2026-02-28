import type { Article, ArticlePreview } from './types'

export interface ArticleRepository {
  readonly getAll: () => Promise<ArticlePreview[]>
  readonly getBySlug: (slug: string) => Promise<Article | null>
  readonly getAllSlugs: () => Promise<string[]>
  readonly getAllEnSlugs: () => Promise<string[]>
}
