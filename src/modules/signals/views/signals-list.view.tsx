import { listSignalsQuery } from '../application/queries/list-signals.query'
import { SignalList } from '../components/signal-list'
import { EmptySignals } from '../components/empty-signals'

export async function SignalsListView() {
  const signals = await listSignalsQuery()

  if (signals.length === 0) {
    return (
      <div>
        <div className="px-6 md:px-10 py-8 border-b-2 border-ink flex items-baseline justify-between">
          <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">
            Señales
          </h1>
        </div>
        <div className="px-6 md:px-10 py-16">
          <EmptySignals />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-6 md:px-10 py-8 border-b-2 border-ink flex items-baseline justify-between">
        <h1 className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">
          Señales
        </h1>
        <span className="font-mono text-sm font-bold uppercase tracking-widest text-muted">
          {signals.length}
        </span>
      </div>
      <div className="px-6 md:px-10 py-8">
        <SignalList signals={signals} />
      </div>
    </div>
  )
}
