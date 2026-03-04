import type { Report, ReportPreview, ReportTopic } from './types'

export const ReportService = {
  filterByTopic(reports: readonly ReportPreview[], topic: ReportTopic): ReportPreview[] {
    return reports.filter((r) => r.topic === topic)
  },

  resolveLocale(report: Report): Report {
    return report
  },

  resolvePreviewLocale(report: ReportPreview): ReportPreview {
    return report
  },
} as const
