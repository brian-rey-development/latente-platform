import { signalSanityRepository } from '../../infrastructure'
import { SignalService } from '../../domain/signal.service'
import type { SignalCategory, SignalPreview } from '../../domain/types'

interface ListSignalsFilters {
  readonly category?: SignalCategory
  readonly search?: string
  readonly limit?: number
}

export async function listSignalsQuery(filters?: ListSignalsFilters): Promise<SignalPreview[]> {
  const signals = await signalSanityRepository.getAll()

  let result = signals

  if (filters?.category) {
    result = SignalService.filterByCategory(result, filters.category)
  }

  if (filters?.search) {
    result = SignalService.search(result, filters.search)
  }

  if (filters?.limit !== undefined) {
    result = result.slice(0, filters.limit)
  }

  return result
}
