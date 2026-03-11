import type { Signal, SignalCategory, SignalPreview } from './types'

export const SignalService = {
  filterByCategory(
    signals: readonly SignalPreview[],
    category: SignalCategory,
  ): SignalPreview[] {
    return signals.filter((s) => s.category === category)
  },

  search(signals: readonly SignalPreview[], query: string): SignalPreview[] {
    const q = query.toLowerCase().trim()
    if (!q) return [...signals]
    return signals.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q),
    )
  },

  resolveLocale(signal: Signal): Signal {
    return signal
  },

  resolvePreviewLocale(signal: SignalPreview): SignalPreview {
    return signal
  },
} as const
