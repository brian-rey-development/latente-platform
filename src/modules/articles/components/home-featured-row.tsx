import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { ArticlePreview } from '../domain/types'
import { ArticleService } from '../domain/article.service'
import { translateCategory } from '../domain/constants'
import { formatDate } from '@/shared/lib/format-date'
import { urlFor } from '@/sanity/image'

interface HomeFeaturedRowProps {
  readonly articles: readonly ArticlePreview[]
  readonly locale?: string
}

export async function HomeFeaturedRow({ articles, locale }: HomeFeaturedRowProps) {
  const t = await getTranslations('home')

  return (
    <section className="border-b-2 border-ink">
      <div className="px-6 md:px-10 py-3 border-b-2 border-ink">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
          {t('featured')}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {articles.map((article, idx) => (
          <FeaturedCard
            key={article._id}
            article={article}
            isLast={idx === articles.length - 1}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}

interface FeaturedCardProps {
  readonly article: ArticlePreview
  readonly isLast: boolean
  readonly locale?: string
}

function FeaturedCard({ article, isLast, locale }: FeaturedCardProps) {
  const resolved = ArticleService.resolvePreviewLocale(article, locale)
  const coverSrc = resolved.coverImage
    ? urlFor(resolved.coverImage).width(600).height(380).url()
    : null

  return (
    <Link
      href={`/articulos/${resolved.slug}`}
      className={`group flex flex-col border-b-2 md:border-b-0 border-ink hover:bg-ink hover:text-surface transition-colors duration-300
        ${!isLast ? 'md:border-r-2 md:border-ink' : ''}`}
    >
      <div className="aspect-[16/9] overflow-hidden border-b-2 border-ink relative bg-border">
        <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-70 transition-opacity z-10" />
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt=""
            fill
            className="object-cover grayscale contrast-[1.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-border" />
        )}
      </div>
      <div className="p-5 md:p-6 flex flex-col grow gap-2">
        <span className="font-mono text-xs font-bold tracking-widest text-brand uppercase">
          {resolved.categories[0] ? translateCategory(resolved.categories[0], locale) : ''}
        </span>
        <h3 className="font-sans font-black text-xl md:text-2xl leading-[1.05] uppercase group-hover:text-surface">
          {resolved.title}
        </h3>
        <p className="font-serif text-sm text-muted group-hover:text-dim leading-snug grow">
          {resolved.excerpt}
        </p>
        <div className="mt-2 pt-3 border-t-2 border-ink group-hover:border-border flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-muted group-hover:text-dim">
          <span>{resolved.publishedAt ? formatDate(resolved.publishedAt) : ''}</span>
          <ArrowUpRight
            size={14}
            className="text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </div>
      </div>
    </Link>
  )
}
