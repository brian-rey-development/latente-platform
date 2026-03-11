import { signalSanityRepository } from '../../infrastructure'

export async function getSignalSlugsEnQuery(): Promise<string[]> {
  return signalSanityRepository.getAllEnSlugs()
}
