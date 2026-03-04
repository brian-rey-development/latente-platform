import type { Article } from '../domain/types'
import { formatRelativeDate } from '@/shared/lib/format-date'
import { strings } from '@/shared/lib/strings'
import { ArticleActions } from './article-actions'

interface ArticleAsideProps {
  readonly article: Article
}

export function ArticleAside({ article }: ArticleAsideProps) {
  const relativeDate = article.publishedAt
    ? formatRelativeDate(article.publishedAt, 'es')
    : null

  return (
    <aside className="w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 md:p-8 lg:p-12 lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] bg-surface z-10">
      <div className="flex flex-col gap-6 lg:gap-0 lg:space-y-8">
        <div className="grid grid-cols-3 gap-4 lg:block lg:space-y-8">
          <div>
            <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
              {strings.article.author}
            </p>
            <p className="font-sans font-black text-base lg:text-xl uppercase">
              {article.author}
            </p>
          </div>

          {article.readTimeMinutes > 0 && (
            <div>
              <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
                {strings.article.readTimeLabel}
              </p>
              <p className="font-sans font-black text-base lg:text-xl uppercase">
                {article.readTimeMinutes} {strings.article.readTime}
              </p>
            </div>
          )}

          {relativeDate && (
            <div>
              <p className="font-mono text-xs font-bold text-meta mb-1 uppercase tracking-widest">
                {strings.article.publishedLabel}
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
          shareLabel={strings.article.shareLabel}
          bookmarkLabel={strings.article.bookmarkLabel}
          shareModalLabels={{
            modalTitle: strings.share.modalTitle,
            twitter: strings.share.twitter,
            whatsapp: strings.share.whatsapp,
            linkedin: strings.share.linkedin,
            telegram: strings.share.telegram,
            copyLink: strings.share.copyLink,
            copied: strings.share.copied,
          }}
        />
      </div>
    </aside>
  )
}
