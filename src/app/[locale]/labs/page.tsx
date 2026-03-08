import type { Metadata } from 'next'
import { LabsView } from '@/modules/labs/views/labs.view'
import { SITE_URL } from '@/shared/lib/site-config'

interface LabsPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LabsPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/labs` : `${SITE_URL}/en/labs`

  const title = 'Labs'
  const description =
    locale === 'es'
      ? 'Proyectos experimentales y ventures del ecosistema Latente.'
      : 'Experimental projects and ventures from the Latente ecosystem.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/labs`,
        en: `${SITE_URL}/en/labs`,
      },
    },
  }
}

export default function LabsPage() {
  return <LabsView />
}
