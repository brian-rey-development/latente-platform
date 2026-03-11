interface SignalSourcesProps {
  readonly sources: readonly string[]
}

export function SignalSources({ sources }: SignalSourcesProps) {
  if (sources.length === 0) return null

  return (
    <div className="mt-8 pt-6 border-t-2 border-ink">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted mb-3">
        Fuentes
      </p>
      <ul className="flex flex-col gap-1">
        {sources.map((src) => (
          <li key={src}>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted underline underline-offset-4 hover:text-brand transition-colors break-all"
            >
              {src}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
