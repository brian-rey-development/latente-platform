import type { Metadata } from 'next'
import { getVentureQuery } from '@/modules/labs/application/queries/get-venture.query'
import { getVentureSlugsQuery } from '@/modules/labs/application/queries/get-venture-slugs.query'
import { VentureDetailView } from '@/modules/labs/views/venture-detail.view'
import { urlFor } from '@/sanity/image'

const BASE_URL = 'https://latente.xyz'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getVentureSlugsQuery().catch(() => [] as string[])
  return slugs.flatMap((slug) => [
    { locale: 'es', slug },
    { locale: 'en', slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const venture = await getVentureQuery(slug)

  if (!venture) return {}

  const title = locale === 'en' && venture.taglineEn
    ? `${venture.name} — ${venture.taglineEn}`
    : `${venture.name} — ${venture.tagline}`

  const description = locale === 'en' && venture.descriptionEn
    ? venture.descriptionEn
    : venture.description

  const ogImage = venture.logo
    ? urlFor(venture.logo).width(1200).height(630).url()
    : undefined

  const canonical =
    locale === 'es' ? `${BASE_URL}/labs/${slug}` : `${BASE_URL}/en/labs/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: { canonical },
  }
}

export default async function LabsVenturePage({ params }: PageProps) {
  const { slug } = await params
  return <VentureDetailView slug={slug} />
}
