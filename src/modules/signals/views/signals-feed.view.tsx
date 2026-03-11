import Link from 'next/link'
import { listSignalsQuery } from '../application/queries/list-signals.query'
import { SignalList } from '../components/signal-list'
import { EmptySignals } from '../components/empty-signals'

const FEED_LIMIT = 7

export async function SignalsFeedView() {
  const signals = await listSignalsQuery({ limit: FEED_LIMIT })

  return (
    <aside className="border-l-2 border-ink pl-0">
      <div className="px-4 py-4 border-b-2 border-ink flex items-baseline justify-between">
        <Link
          href="/senales"
          className="font-mono text-xs font-bold uppercase tracking-widest text-brand hover:text-ink transition-colors"
        >
          Señales
        </Link>
        <Link
          href="/senales"
          className="font-mono text-xs font-bold uppercase tracking-widest text-muted hover:text-brand transition-colors"
        >
          Ver todas →
        </Link>
      </div>
      <div className="px-4 py-2">
        {signals.length === 0 ? <EmptySignals /> : <SignalList signals={signals} />}
      </div>
    </aside>
  )
}
