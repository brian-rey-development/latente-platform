import type { Metadata } from 'next'
import { getSignalQuery } from '@/modules/signals/application/queries/get-signal.query'
import { getSignalSlugsQuery } from '@/modules/signals/application/queries/get-signal-slugs.query'
import { getSignalSlugsEnQuery } from '@/modules/signals/application/queries/get-signal-slugs-en.query'
import { SignalDetailView } from '@/modules/signals/views/signal-detail.view'
import type { Locale } from '@/i18n/routing'
import { SITE_URL } from '@/shared/lib/site-config'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const [esSlugs, enSlugs] = await Promise.all([
    getSignalSlugsQuery().catch(() => [] as string[]),
    getSignalSlugsEnQuery().catch(() => [] as string[]),
  ])

  const esParams = esSlugs.map((slug) => ({ locale: 'es', slug }))
  const enParams = enSlugs.map((slug) => ({ locale: 'en', slug }))

  return [...esParams, ...enParams]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = localeParam as Locale
  const signal = await getSignalQuery(slug)

  if (!signal) return {}

  const isEn = locale === 'en'
  const title = isEn && signal.titleEn ? signal.titleEn : signal.title
  const description = isEn && signal.excerptEn ? signal.excerptEn : signal.excerpt

  const canonical =
    locale === 'es'
      ? `${SITE_URL}/senales/${slug}`
      : `${SITE_URL}/en/senales/${slug}`

  const hasBothLocales = Boolean(signal.titleEn && signal.contentEn?.length && signal.slugEn)

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: signal.publishedAt,
      authors: [signal.author],
    },
    alternates: {
      canonical,
      ...(hasBothLocales && {
        languages: {
          es: `${SITE_URL}/senales/${signal.slug}`,
          en: `${SITE_URL}/en/senales/${signal.slugEn}`,
        },
      }),
    },
  }
}

export default async function SignalPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  return <SignalDetailView slug={slug} locale={localeParam as Locale} />
}
