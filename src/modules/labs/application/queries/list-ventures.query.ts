import { ventureSanityRepository } from '../../infrastructure'
import type { VenturePreview } from '../../domain/types'

export async function listVenturesQuery(): Promise<VenturePreview[]> {
  return ventureSanityRepository.getAll()
}
