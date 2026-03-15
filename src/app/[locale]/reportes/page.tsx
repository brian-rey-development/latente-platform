import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ReportsListView } from '@/modules/reports/views'
import { SITE_URL } from '@/shared/lib/site-config'

interface ReportesPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ReportesPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/reportes` : `${SITE_URL}/en/reportes`

  const t = await getTranslations({ locale, namespace: 'reports' })
  const title = locale === 'es' ? 'Reportes' : 'Reports'
  const description = t('subtitle')

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

export default async function ReportesPage() {
  return <ReportsListView />
}
