import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { getSignalQuery } from '../application/queries/get-signal.query'
import { portableTextComponents } from '@/modules/articles/components/content-block'
import { CategoryBadge } from '@/shared/ui/category-badge'
import { formatDate } from '@/shared/lib/format-date'
import type { Locale } from '@/i18n/routing'

interface SignalDetailViewProps {
  readonly slug: string
  readonly locale: Locale
}

export async function SignalDetailView({ slug, locale }: SignalDetailViewProps) {
  const signal = await getSignalQuery(slug)

  if (!signal) {
    notFound()
  }

  const isEn = locale === 'en'
  const title = isEn && signal.titleEn ? signal.titleEn : signal.title
  const excerpt = isEn && signal.excerptEn ? signal.excerptEn : signal.excerpt
  const content = isEn && signal.contentEn?.length ? signal.contentEn : signal.content
  const sources = isEn && signal.sourcesEn?.length ? signal.sourcesEn : signal.sources

  const backHref = '/senales'

  return (
    <article className="min-h-screen bg-surface">
      <header className="bg-ink text-surface pt-8 md:pt-12 pb-14 md:pb-20 border-b-2 border-ink">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-brand border-2 border-brand px-4 py-2 hover:bg-brand hover:text-ink transition-colors mb-10 md:mb-14"
          >
            <ArrowLeft size={14} />
            {isEn ? 'Signals' : 'Señales'}
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            <CategoryBadge category={signal.category} locale={locale} />
            <span className="font-mono text-xs font-bold tracking-widest text-dim uppercase self-center">
              {signal.publishedAt ? formatDate(signal.publishedAt) : ''}
            </span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase leading-[0.9] tracking-tighter mb-8 text-surface break-words">
            {title}
          </h1>

          <p className="font-serif text-xl md:text-2xl text-dim max-w-3xl leading-snug border-l-4 border-brand pl-6">
            {excerpt}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-2xl font-serif text-xl text-ink leading-[1.8] space-y-8">
          <PortableText value={content} components={portableTextComponents} />
        </div>

        {sources && sources.length > 0 && (
          <div className="max-w-2xl mt-16 pt-10 border-t-4 border-ink">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-muted mb-6">
              {isEn ? 'Sources' : 'Fuentes'}
            </h2>
            <ul className="space-y-3">
              {sources.map((src, i) => (
                <li key={i} className="flex items-start gap-2 font-serif text-sm text-muted leading-snug">
                  <span className="font-mono text-xs font-bold text-brand mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  {src}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="max-w-2xl mt-16 pt-10 border-t-4 border-ink flex justify-between items-center font-mono font-bold uppercase tracking-widest text-ink">
          <span>{isEn ? 'End of signal' : 'Fin de señal'}</span>
          <span className="text-brand text-xl animate-pulse">{'///'}</span>
        </div>
      </div>
    </article>
  )
}
