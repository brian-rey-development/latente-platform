import { Share2, Bookmark } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Article } from '../domain/types'
import type { Locale } from '@/i18n/routing'

interface ArticleAsideProps {
  readonly article: Article
  readonly locale: Locale
}

export async function ArticleAside({ article, locale: _locale }: ArticleAsideProps) {
  const t = await getTranslations('article')

  return (
    <aside className="w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 md:p-8 lg:p-12 lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] bg-surface z-10">
      <div className="flex flex-wrap items-start gap-6 lg:block lg:space-y-8">
        <div>
          <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
            {t('author')}
          </p>
          <p className="font-sans font-black text-xl uppercase">{article.author}</p>
        </div>
        {article.readTimeMinutes > 0 && (
          <div>
            <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
              {t('readTimeLabel')}
            </p>
            <p className="font-sans font-black text-xl uppercase">
              {article.readTimeMinutes} {t('readTime')}
            </p>
          </div>
        )}
        <div className="flex gap-4 lg:pt-8 lg:border-t-2 lg:border-ink">
          <button
            aria-label={t('shareLabel')}
            className="w-12 h-12 border-2 border-ink flex items-center justify-center hover:bg-brand hover:border-brand hover:text-surface transition-all rounded-full text-ink shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Share2 size={18} />
          </button>
          <button
            aria-label={t('bookmarkLabel')}
            className="w-12 h-12 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-surface transition-all rounded-full text-ink shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </aside>
  )
}
