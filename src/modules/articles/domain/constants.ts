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

export const CATEGORY_EN: Record<ArticleCategory, string> = {
  'INTELIGENCIA ARTIFICIAL': 'ARTIFICIAL INTELLIGENCE',
  'BIO-INGENIERÍA': 'BIOENGINEERING',
  'GEOPOLÍTICA': 'GEOPOLITICS',
  'ECONOMÍA': 'ECONOMICS',
  'INFRAESTRUCTURA': 'INFRASTRUCTURE',
  'CULTURA': 'CULTURE',
}

export function translateCategory(category: ArticleCategory, locale?: string): string {
  return locale === 'en' ? (CATEGORY_EN[category] ?? category) : category
}
