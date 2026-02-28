import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Article } from '../domain/types'
import { formatDate } from '@/shared/lib/format-date'
import { CategoryBadge } from '@/shared/ui/category-badge'
import { PremiumBadge } from '@/shared/ui/premium-badge'
import { buttonVariants } from '@/shared/ui/button'
import type { Locale } from '@/i18n/routing'

interface ArticleHeaderProps {
  readonly article: Article
  readonly locale: Locale
}

export async function ArticleHeader({ article, locale: _locale }: ArticleHeaderProps) {
  const t = await getTranslations('article')

  return (
    <header className="bg-ink text-surface pt-24 md:pt-32 pb-16 border-b-2 border-ink">
      <div className="w-full flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/4 px-6 md:px-12 justify-start items-start">
          <Link
            href="/"
            className={`${buttonVariants({ variant: 'primary', size: 'md' })} w-max`}
          >
            <ArrowLeft size={16} /> {t('back')}
          </Link>
        </div>

        <div className="w-full lg:w-3/4 px-6 md:px-12 lg:px-24">
          <Link
            href="/"
            className={`${buttonVariants({ variant: 'primary', size: 'md' })} lg:hidden w-max mb-12`}
          >
            <ArrowLeft size={16} /> {t('back')}
          </Link>

          <div className="flex flex-wrap gap-4 mb-8">
            <CategoryBadge category={article.category} />
            {article.premium && <PremiumBadge />}
            {article.publishedAt && (
              <span className="font-mono text-xs font-bold uppercase tracking-widest border border-muted text-meta px-3 py-1">
                {formatDate(article.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="font-sans font-black text-4xl md:text-5xl lg:text-[4.5rem] uppercase leading-[0.95] tracking-tighter mb-8 text-surface">
            {article.title}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-dim max-w-3xl leading-snug border-l-4 border-brand pl-6">
            {article.excerpt}
          </p>
        </div>
      </div>
    </header>
  )
}
