import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticleQuery } from '../application/queries/get-article.query'
import { ArticleService } from '../domain/article.service'
import { ArticleHeader } from '../components/article-header'
import { ArticleAside } from '../components/article-aside'
import { ArticleContent } from '../components/article-content'
import { PaywallBlock } from '../components/paywall-block'
import { ReadTracker } from '../components/read-tracker'
import { urlFor } from '@/sanity/image'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'
import type { Locale } from '@/i18n/routing'

interface ArticleDetailViewProps {
  readonly slug: string
  readonly locale: Locale
}

export async function ArticleDetailView({ slug, locale }: ArticleDetailViewProps) {
  const rawArticle = await getArticleQuery(slug)

  if (!rawArticle) {
    notFound()
  }

  const article = ArticleService.resolveLocale(rawArticle, locale)

  const coverSrc = article.coverImage
    ? urlFor(article.coverImage).width(1600).height(900).url()
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.publishedAt,
    image: coverSrc ?? undefined,
    publisher: {
      '@type': 'Organization',
      name: 'LATENTE',
      url: 'https://latente.xyz',
    },
  }

  return (
    <article className="min-h-screen bg-surface flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ReadTracker article={article} />

      <ArticleHeader article={article} locale={locale} />

      {coverSrc && (
        <div className="w-full h-[40vh] md:h-[60vh] bg-ink border-b-2 border-ink relative">
          <Image
            src={coverSrc}
            alt={article.title}
            fill
            className="object-cover grayscale contrast-[1.2] opacity-80"
            priority
          />
        </div>
      )}

      <div className="w-full flex flex-col lg:flex-row relative">
        <ArticleAside article={article} locale={locale} />

        {article.premium && FEATURE_FLAGS.PREMIUM_ENABLED ? (
          <div className="w-full lg:w-3/4 p-6 md:p-12 lg:px-24 lg:py-16 bg-surface">
            <PaywallBlock article={article} />
          </div>
        ) : (
          <ArticleContent article={article} locale={locale} />
        )}
      </div>
    </article>
  )
}
