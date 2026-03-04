import type { Venture, VenturePreview } from './types'

export interface VentureRepository {
  readonly getAll: () => Promise<VenturePreview[]>
  readonly getBySlug: (slug: string) => Promise<Venture | null>
  readonly getAllSlugs: () => Promise<string[]>
}
