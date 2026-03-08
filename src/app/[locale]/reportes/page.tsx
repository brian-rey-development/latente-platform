import type { Metadata } from 'next'
import { ReportsListView } from '@/modules/reports/views/reports-list.view'
import { SITE_URL } from '@/shared/lib/site-config'

interface ReportesPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ReportesPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/reportes` : `${SITE_URL}/en/reportes`

  const title = locale === 'es' ? 'Reportes' : 'Reports'
  const description =
    locale === 'es'
      ? 'Análisis profundos y documentados sobre las fuerzas que reconfiguran el mundo.'
      : 'Deep, documented analysis on the forces reshaping the world.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/reportes`,
        en: `${SITE_URL}/en/reportes`,
      },
    },
  }
}

export default function ReportesPage() {
  return <ReportsListView />
}
