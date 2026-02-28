'use client'

interface MarqueeTickerClientProps {
  readonly items: readonly string[]
}

export function MarqueeTickerClient({ items }: MarqueeTickerClientProps) {
  const repeated = [...items, ...items]

  return (
    <div className="border-b-2 border-ink bg-ink text-surface overflow-hidden py-3 font-mono font-bold text-sm tracking-widest uppercase flex items-center">
      <div className="animate-marquee whitespace-nowrap flex-shrink-0">
        {repeated.map((item, i) => (
          <span key={i}>
            <span className="mx-6 text-brand">{'///'}</span>
            <span className="mx-6">{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
