import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { SignalPreview } from '../domain/types'
import { translateCategory } from '@/modules/articles/domain/constants'
import { formatDate } from '@/shared/lib/format-date'

interface HomeSignalsSectionProps {
  readonly signals: readonly SignalPreview[]
  readonly locale?: string
  readonly featured?: boolean
}

export async function HomeSignalsSection({
  signals,
  locale,
  featured = false,
}: HomeSignalsSectionProps) {
  const t = await getTranslations('signals')

  const gridCols =
    signals.length === 1
      ? 'grid-cols-1'
      : signals.length === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="bg-ink text-surface border-b-2 border-ink">
      <div className="px-6 md:px-10 py-4 border-b-2 border-white/10 flex items-baseline justify-between">
        <div className="flex items-baseline gap-4">
          <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-surface">
            {t('heading')}
          </h2>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
            {t('sub')}
          </span>
        </div>
        <Link
          href="/senales"
          className="font-mono text-xs font-bold uppercase tracking-widest text-white/50 hover:text-brand transition-colors flex items-center gap-1"
        >
          {t('viewAll')} <ArrowRight size={12} />
        </Link>
      </div>

      {signals.length === 0 ? (
        <div className="px-6 md:px-10 py-12">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
            {t('soon')}
          </p>
        </div>
      ) : (
        <div className={`grid ${gridCols} divide-y divide-white/10 md:divide-y-0 md:divide-x`}>
          {signals.map((signal) => (
            <SignalCard key={signal._id} signal={signal} locale={locale} featured={featured} />
          ))}
        </div>
      )}
    </section>
  )
}

interface SignalCardProps {
  readonly signal: SignalPreview
  readonly locale?: string
  readonly featured: boolean
}

function SignalCard({ signal, locale, featured }: SignalCardProps) {
  const isEn = locale === 'en'
  const title = (isEn && signal.titleEn) ? signal.titleEn : signal.title
  const excerpt = (isEn && signal.excerptEn) ? signal.excerptEn : signal.excerpt
  const slug = (isEn && signal.slugEn) ? signal.slugEn : signal.slug

  return (
    <Link
      href={`/senales/${slug}`}
      className={`group flex flex-col gap-4 hover:bg-white/5 transition-colors border-b border-white/10 last:border-b-0 md:border-b-0 ${featured ? 'p-8 md:p-12' : 'p-6 md:p-8'}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-widest text-brand uppercase">
          {translateCategory(signal.category, locale)}
        </span>
        <span className="font-mono text-xs text-white/50">
          {signal.publishedAt ? formatDate(signal.publishedAt) : ''}
        </span>
      </div>
      <h3
        className={`font-sans font-black leading-[1.05] uppercase text-surface group-hover:text-brand transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}
      >
        {title}
      </h3>
      <p
        className={`font-serif text-white/75 leading-snug grow ${featured ? 'text-base' : 'text-sm'}`}
      >
        {excerpt}
      </p>
      <div className="flex justify-end pt-2 border-t border-white/10">
        <ArrowUpRight
          size={featured ? 18 : 14}
          className="text-white/30 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </Link>
  )
}
