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
