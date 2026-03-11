import type { Signal, SignalPreview } from './types'

export interface SignalRepository {
  readonly getAll: () => Promise<SignalPreview[]>
  readonly getRecent: (limit: number) => Promise<SignalPreview[]>
  readonly getBySlug: (slug: string) => Promise<Signal | null>
  readonly getAllSlugs: () => Promise<string[]>
  readonly getAllEnSlugs: () => Promise<string[]>
}
