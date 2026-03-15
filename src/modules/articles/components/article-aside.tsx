import { getTranslations, getLocale } from 'next-intl/server'
import type { Article } from '../domain/types'
import { formatRelativeDate } from '@/shared/lib/format-date'
import { ArticleActions } from './article-actions'

interface ArticleAsideProps {
  readonly article: Article
}

export async function ArticleAside({ article }: ArticleAsideProps) {
  const [t, tShare, locale] = await Promise.all([
    getTranslations('article'),
    getTranslations('share'),
    getLocale(),
  ])

  const relativeDate = article.publishedAt
    ? formatRelativeDate(article.publishedAt, locale)
    : null

  return (
    <aside className="w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 md:p-8 lg:p-12 lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] bg-surface z-10">
      <div className="flex flex-col gap-6 lg:gap-0 lg:space-y-8">
        <div className="grid grid-cols-3 gap-4 lg:block lg:space-y-8">
          <div>
            <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
              {t('author')}
            </p>
            <p className="font-sans font-black text-base lg:text-xl uppercase">
              {article.author}
            </p>
          </div>

          {article.readTimeMinutes > 0 && (
            <div>
              <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
                {t('readTimeLabel')}
              </p>
              <p className="font-sans font-black text-base lg:text-xl uppercase">
                {article.readTimeMinutes} {t('readTime')}
              </p>
            </div>
          )}

          {relativeDate && (
            <div>
              <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
                {t('publishedLabel')}
              </p>
              <p className="font-sans font-black text-base lg:text-xl uppercase">
                {relativeDate}
              </p>
            </div>
          )}
        </div>

        <ArticleActions
          slug={article.slug}
          articleTitle={article.title}
          shareLabel={t('shareLabel')}
          bookmarkLabel={t('bookmarkLabel')}
          shareModalLabels={{
            modalTitle: tShare('modalTitle'),
            twitter: tShare('twitter'),
            whatsapp: tShare('whatsapp'),
            linkedin: tShare('linkedin'),
            telegram: tShare('telegram'),
            copyLink: tShare('copyLink'),
            copied: tShare('copied'),
            close: tShare('close'),
          }}
        />
      </div>
    </aside>
  )
}
