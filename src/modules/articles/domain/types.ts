import type { PortableTextBlock } from '@portabletext/react'

export type ArticleCategory =
  | 'GEOPOLÍTICA'
  | 'INTELIGENCIA ARTIFICIAL'
  | 'BIO-INGENIERÍA'
  | 'CULTURA SINTÉTICA'
  | 'ECONOMÍA'

export interface ArticlePreview {
  readonly _id: string
  readonly title: string
  readonly titleEn?: string
  readonly slug: string
  readonly category: ArticleCategory
  readonly premium: boolean
  readonly excerpt: string
  readonly excerptEn?: string
  readonly author: string
  readonly publishedAt: string
  readonly readTimeMinutes: number
  readonly coverImage: SanityImageRef | null
}

export interface Article extends ArticlePreview {
  readonly content: PortableTextBlock[]
  readonly contentEn?: PortableTextBlock[]
}

// Minimal Sanity image reference shape
export interface SanityImageRef {
  readonly _type: 'image'
  readonly asset: { readonly _ref: string; readonly _type: 'reference' }
  readonly hotspot?: { x: number; y: number; width: number; height: number }
}
