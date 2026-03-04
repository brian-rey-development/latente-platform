import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageRef } from '@/modules/articles/domain/types'

export type ReportTopic =
  | 'INTELIGENCIA ARTIFICIAL'
  | 'BIO-INGENIERÍA'
  | 'GEOPOLÍTICA'
  | 'ECONOMÍA'
  | 'INFRAESTRUCTURA'
  | 'CULTURA'

export interface ReportPreview {
  readonly _id: string
  readonly title: string
  readonly titleEn?: string
  readonly slug: string
  readonly slugEn?: string
  readonly topic: ReportTopic
  readonly premium: boolean
  readonly excerpt: string
  readonly excerptEn?: string
  readonly author: string
  readonly publishedAt: string
  readonly readTimeMinutes: number
  readonly pageCount?: number
  readonly coverImage: SanityImageRef | null
}

export interface Report extends ReportPreview {
  readonly content: PortableTextBlock[]
  readonly contentEn?: PortableTextBlock[]
}
