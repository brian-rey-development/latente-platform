import type { Metadata } from 'next'
import { getReportQuery } from '@/modules/reports/application/queries/get-report.query'
import { getReportSlugsQuery } from '@/modules/reports/application/queries/get-report-slugs.query'
import { ReportDetailView } from '@/modules/reports/views/report-detail.view'
import { urlFor } from '@/sanity/image'

const BASE_URL = 'https://latente.xyz'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getReportSlugsQuery().catch(() => [] as string[])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const report = await getReportQuery(slug)

  if (!report) return {}

  const ogImage = report.coverImage
    ? urlFor(report.coverImage).width(1200).height(630).url()
    : undefined

  const canonical = `${BASE_URL}/reportes/${slug}`

  return {
    title: report.title,
    description: report.excerpt,
    openGraph: {
      type: 'article',
      title: report.title,
      description: report.excerpt,
      publishedTime: report.publishedAt,
      authors: [report.author],
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: report.title,
      description: report.excerpt,
      images: ogImage ? [ogImage] : [],
    },
    alternates: { canonical },
  }
}

export default async function ReportePage({ params }: PageProps) {
  const { slug } = await params
  return <ReportDetailView slug={slug} />
}
