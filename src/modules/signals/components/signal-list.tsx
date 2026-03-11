import type { SignalPreview } from '../domain/types'
import { SignalCard } from './signal-card'

interface SignalListProps {
  readonly signals: SignalPreview[]
}

export function SignalList({ signals }: SignalListProps) {
  return (
    <div className="flex flex-col divide-y-0">
      {signals.map((signal) => (
        <SignalCard key={signal._id} signal={signal} />
      ))}
    </div>
  )
}
