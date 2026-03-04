export type VentureVertical =
  | 'HEALTHTECH'
  | 'FINTECH'
  | 'AGRITECH'
  | 'PROPTECH'
  | 'LEGALTECH'
  | 'EDTECH'
  | 'CLIMATETECH'
  | 'OTRO'

export type VentureStatus = 'STEALTH' | 'BUILDING' | 'LAUNCHED' | 'ACQUIRED'

export interface SanityImageRef {
  readonly _type: 'image'
  readonly asset: { readonly _ref: string; readonly _type: 'reference' }
  readonly hotspot?: { x: number; y: number; width: number; height: number }
}

export interface VenturePreview {
  readonly _id: string
  readonly name: string
  readonly slug: string
  readonly tagline: string
  readonly taglineEn?: string
  readonly description: string
  readonly descriptionEn?: string
  readonly vertical: VentureVertical
  readonly status: VentureStatus
  readonly logo: SanityImageRef | null
  readonly url?: string
  readonly foundedYear?: number
}

export type Venture = VenturePreview
