import type { Metadata } from 'next'
import { HomeView } from '@/modules/articles/views/home.view'
import { SITE_URL } from '@/shared/lib/site-config'

interface HomePageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? SITE_URL : `${SITE_URL}/en`

  return {
    alternates: {
      canonical,
      languages: { es: SITE_URL, en: `${SITE_URL}/en` },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  return <HomeView locale={locale} />
}
