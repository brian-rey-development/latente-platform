import type { ReportTopic } from './types'

export const REPORT_TOPICS: readonly ReportTopic[] = [
  'INTELIGENCIA ARTIFICIAL',
  'BIO-INGENIERÍA',
  'GEOPOLÍTICA',
  'ECONOMÍA',
  'INFRAESTRUCTURA',
  'CULTURA',
] as const

export const TOPIC_LABELS: Record<ReportTopic, string> = {
  'INTELIGENCIA ARTIFICIAL': 'Inteligencia Artificial',
  'BIO-INGENIERÍA': 'Bio-Ingeniería',
  'GEOPOLÍTICA': 'Geopolítica',
  'ECONOMÍA': 'Economía',
  'INFRAESTRUCTURA': 'Infraestructura',
  'CULTURA': 'Cultura',
}
