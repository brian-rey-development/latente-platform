import type { ArticleCategory } from './types'

export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  'GEOPOLÍTICA',
  'INTELIGENCIA ARTIFICIAL',
  'BIO-INGENIERÍA',
  'CULTURA SINTÉTICA',
  'ECONOMÍA',
] as const

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'GEOPOLÍTICA': 'Geopolítica',
  'INTELIGENCIA ARTIFICIAL': 'Inteligencia Artificial',
  'BIO-INGENIERÍA': 'Bio-Ingeniería',
  'CULTURA SINTÉTICA': 'Cultura Sintética',
  'ECONOMÍA': 'Economía',
}

export const ALL_CATEGORIES_LABEL = 'TODOS'
