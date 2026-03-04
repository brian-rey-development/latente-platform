import type { ArticleCategory } from './types'

export const ARTICLE_CATEGORIES: readonly ArticleCategory[] = [
  'INTELIGENCIA ARTIFICIAL',
  'BIO-INGENIERÍA',
  'GEOPOLÍTICA',
  'ECONOMÍA',
  'INFRAESTRUCTURA',
  'CULTURA',
] as const

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'INTELIGENCIA ARTIFICIAL': 'Inteligencia Artificial',
  'BIO-INGENIERÍA': 'Bio-Ingeniería',
  'GEOPOLÍTICA': 'Geopolítica',
  'ECONOMÍA': 'Economía',
  'INFRAESTRUCTURA': 'Infraestructura',
  'CULTURA': 'Cultura',
}

export const ALL_CATEGORIES_LABEL_ES = 'TODOS'
export const ALL_CATEGORIES_LABEL = ALL_CATEGORIES_LABEL_ES
