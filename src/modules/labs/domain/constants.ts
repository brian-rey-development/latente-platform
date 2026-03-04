import type { VentureVertical, VentureStatus } from './types'

export const VENTURE_VERTICALS: readonly VentureVertical[] = [
  'HEALTHTECH',
  'FINTECH',
  'AGRITECH',
  'PROPTECH',
  'LEGALTECH',
  'EDTECH',
  'CLIMATETECH',
  'OTRO',
] as const

export const VENTURE_STATUSES: readonly VentureStatus[] = [
  'STEALTH',
  'BUILDING',
  'LAUNCHED',
  'ACQUIRED',
] as const

export const VERTICAL_LABELS: Record<VentureVertical, string> = {
  HEALTHTECH: 'Healthtech',
  FINTECH: 'Fintech',
  AGRITECH: 'Agritech',
  PROPTECH: 'Proptech',
  LEGALTECH: 'Legaltech',
  EDTECH: 'Edtech',
  CLIMATETECH: 'Climatetech',
  OTRO: 'Otro',
}

export const STATUS_LABELS: Record<VentureStatus, string> = {
  STEALTH: 'Stealth',
  BUILDING: 'Building',
  LAUNCHED: 'Launched',
  ACQUIRED: 'Acquired',
}
