import type { PortableTextBlock } from '@portabletext/react'
import type { ArticleCategory } from '@/modules/articles/domain/types'

export type { ArticleCategory as SignalCategory }

export interface SignalPreview {
  readonly _id: string
  readonly title: string
  readonly titleEn?: string
  readonly slug: string
  readonly slugEn?: string
  readonly category: ArticleCategory
  readonly premium: boolean
  readonly excerpt: string
  readonly excerptEn?: string
  readonly author: string
  readonly publishedAt: string
  readonly sources?: readonly string[]
}

export interface Signal extends SignalPreview {
  readonly content: PortableTextBlock[]
  readonly contentEn?: PortableTextBlock[]
  readonly sourcesEn?: readonly string[]
}
