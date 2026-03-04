/**
 * Formats an ISO 8601 date string to "DD.MM.YYYY" (Latente house format).
 */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}.${month}.${year}`
}

/**
 * Returns a human-readable relative date string using Intl.RelativeTimeFormat.
 * Examples: "yesterday", "hace 2 días", "last month", "hace 3 semanas"
 */
export function formatRelativeDate(iso: string, locale: string): string {
  const diffMs = new Date(iso).getTime() - Date.now()
  const days = Math.round(diffMs / 86_400_000)
  const weeks = Math.round(days / 7)
  const months = Math.round(days / 30)
  const years = Math.round(days / 365)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (Math.abs(days) < 7) return rtf.format(days, 'day')
  if (Math.abs(weeks) < 4) return rtf.format(weeks, 'week')
  if (Math.abs(months) < 12) return rtf.format(months, 'month')
  return rtf.format(years, 'year')
}
