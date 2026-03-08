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
import { SITE_URL, SITE_NAME } from '@/shared/lib/site-config'
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

  const article = ArticleService.resolveLocale(rawArticle)

  const coverSrc = article.coverImage
    ? urlFor(article.coverImage).width(1600).height(900).url()
    : null

  const articleUrl =
    locale === 'es' ? `${SITE_URL}/articulos/${slug}` : `${SITE_URL}/en/articulos/${slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    url: articleUrl,
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.publishedAt,
    image: coverSrc ?? undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return (
    <article className="min-h-screen bg-surface flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <ReadTracker article={article} />

      <ArticleHeader article={article} />

      {coverSrc && (
        <div className="w-full h-[40vh] md:h-[60vh] bg-ink border-b-2 border-ink relative">
          <Image
            src={coverSrc}
            alt=""
            fill
            className="object-cover grayscale contrast-[1.2] opacity-80"
            priority
          />
        </div>
      )}

      <div className="w-full flex flex-col lg:flex-row relative">
        <ArticleAside article={article} />

        {article.premium && FEATURE_FLAGS.PREMIUM_ENABLED ? (
          <div className="w-full lg:w-3/4 p-6 md:p-12 lg:px-24 lg:py-16 bg-surface">
            <PaywallBlock article={article} />
          </div>
        ) : (
          <ArticleContent article={article} />
        )}
      </div>
    </article>
  )
}
