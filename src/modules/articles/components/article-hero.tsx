import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { ArticlePreview } from '../domain/types'
import { ArticleService } from '../domain/article.service'
import { formatDate } from '@/shared/lib/format-date'
import { urlFor } from '@/sanity/image'
import { CategoryBadge } from '@/shared/ui/category-badge'
import { buttonVariants } from '@/shared/ui/button'
import type { Locale } from '@/i18n/routing'

interface ArticleHeroProps {
  readonly article: ArticlePreview
  readonly locale: Locale
}

export async function ArticleHero({ article, locale }: ArticleHeroProps) {
  const t = await getTranslations('article')
  const resolved = ArticleService.resolvePreviewLocale(article, locale)

  const coverSrc = resolved.coverImage
    ? urlFor(resolved.coverImage).width(1600).height(900).url()
    : null

  return (
    <section className="border-b-2 border-ink grid grid-cols-1 lg:grid-cols-12 relative bg-surface">
      <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <CategoryBadge category={resolved.category} />
            {resolved.publishedAt && (
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-widest">
                {t('updatedAt')} {formatDate(resolved.publishedAt)}
              </span>
            )}
          </div>
          <Link href={`/articulos/${resolved.slug}`}>
            <h2 className="font-sans font-black text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] tracking-tighter text-ink mb-8 uppercase hover:text-brand transition-colors">
              {resolved.title}
            </h2>
          </Link>
          <p className="font-serif text-xl md:text-2xl text-border leading-snug max-w-2xl border-l-4 border-brand pl-6 mb-12">
            {resolved.excerpt}
          </p>
        </div>
        <Link
          href={`/articulos/${resolved.slug}`}
          className={`${buttonVariants({ variant: 'primary' })} group w-full md:w-max justify-between gap-8 border-2 border-ink hover:border-brand`}
        >
          <span>{t('readArticle')}</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <Link
        href={`/articulos/${resolved.slug}`}
        className="lg:col-span-5 flex flex-col relative group cursor-pointer bg-ink"
      >
        <div className="flex-grow relative min-h-[40vh] md:min-h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={resolved.title}
              fill
              className="object-cover grayscale contrast-[1.2] brightness-90 group-hover:scale-105 transition-transform duration-700 opacity-90"
              priority
            />
          ) : (
            <div className="w-full h-full bg-border" />
          )}
        </div>
        <div className="border-t-2 border-border bg-surface p-4 sm:p-6 flex flex-wrap justify-between items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-ink">
          <span>{t('by')} {resolved.author}</span>
          <span>{resolved.readTimeMinutes} {t('readTime')}</span>
        </div>
      </Link>
    </section>
  )
}
