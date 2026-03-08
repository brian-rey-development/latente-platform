import type { Metadata } from 'next'
import { getReportQuery } from '@/modules/reports/application/queries/get-report.query'
import { getReportSlugsQuery } from '@/modules/reports/application/queries/get-report-slugs.query'
import { ReportDetailView } from '@/modules/reports/views/report-detail.view'
import { urlFor } from '@/sanity/image'
import { SITE_URL } from '@/shared/lib/site-config'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getReportSlugsQuery().catch(() => [] as string[])
  return slugs.flatMap((slug) => [
    { locale: 'es', slug },
    { locale: 'en', slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const report = await getReportQuery(slug)

  if (!report) return {}

  const title = locale === 'en' && report.titleEn ? report.titleEn : report.title
  const description = locale === 'en' && report.excerptEn ? report.excerptEn : report.excerpt

  const ogImage = report.coverImage
    ? urlFor(report.coverImage).width(1200).height(630).url()
    : undefined

  const canonical =
    locale === 'es' ? `${SITE_URL}/reportes/${slug}` : `${SITE_URL}/en/reportes/${slug}`

  const hasBothLocales = Boolean(report.titleEn && report.excerptEn)

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: report.publishedAt,
      authors: [report.author],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical,
      ...(hasBothLocales && {
        languages: {
          es: `${SITE_URL}/reportes/${slug}`,
          en: `${SITE_URL}/en/reportes/${slug}`,
        },
      }),
    },
  }
}

export default async function ReportePage({ params }: PageProps) {
  const { slug } = await params
  return <ReportDetailView slug={slug} />
}
