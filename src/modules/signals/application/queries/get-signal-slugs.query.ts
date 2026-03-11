import { signalSanityRepository } from '../../infrastructure'

export async function getSignalSlugsQuery(): Promise<string[]> {
  return signalSanityRepository.getAllSlugs()
}
