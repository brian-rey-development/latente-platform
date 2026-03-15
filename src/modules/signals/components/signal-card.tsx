import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { SignalPreview } from '../domain/types'
import { SignalService } from '../domain/signal.service'
import { formatDate } from '@/shared/lib/format-date'

interface SignalCardProps {
  readonly signal: SignalPreview
}

export function SignalCard({ signal }: SignalCardProps) {
  const resolved = SignalService.resolvePreviewLocale(signal)

  return (
    <Link
      href={`/senales/${resolved.slug}`}
      className="group grid grid-cols-[1fr_auto] gap-4 items-start border-b-2 border-ink/10 py-6 hover:bg-surface-dim transition-colors duration-200 px-2 -mx-2"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-widest text-brand uppercase">
            {resolved.category}
          </span>
          <span className="text-meta text-xs">·</span>
          <span className="font-mono text-xs font-bold tracking-widest text-meta uppercase">
            {resolved.publishedAt ? formatDate(resolved.publishedAt) : ''}
          </span>
        </div>
        <h3 className="font-sans font-black text-lg md:text-xl leading-tight uppercase group-hover:text-brand transition-colors">
          {resolved.title}
        </h3>
        <p className="font-serif text-muted text-sm leading-snug">
          {resolved.excerpt}
        </p>
        {resolved.sources && resolved.sources.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
            {resolved.sources.slice(0, 2).map((src, i) => (
              <span key={i} className="font-mono text-xs text-muted/60 truncate max-w-[200px]">
                {src}
              </span>
            ))}
          </div>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="text-brand mt-1 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
      />
    </Link>
  )
}
