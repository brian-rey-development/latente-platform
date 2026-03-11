import { signalSanityRepository } from '../../infrastructure'
import type { Signal } from '../../domain/types'

export async function getSignalQuery(slug: string): Promise<Signal | null> {
  return signalSanityRepository.getBySlug(slug)
}
