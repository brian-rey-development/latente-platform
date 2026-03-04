import { ventureSanityRepository } from '../../infrastructure'
import type { Venture } from '../../domain/types'

export async function getVentureQuery(slug: string): Promise<Venture | null> {
  return ventureSanityRepository.getBySlug(slug)
}
