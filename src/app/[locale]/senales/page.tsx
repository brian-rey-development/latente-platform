import type { Metadata } from 'next'
import { SignalsListView } from '@/modules/signals/views/signals-list.view'
import { SITE_URL } from '@/shared/lib/site-config'

interface SignalsPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: SignalsPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/senales` : `${SITE_URL}/en/senales`

  const title = locale === 'es' ? 'Señales' : 'Signals'
  const description =
    locale === 'es'
      ? 'Señales rápidas sobre IA, geopolítica, bio-ingeniería e infraestructura. Contexto inmediato sobre lo que está pasando ahora.'
      : 'Quick signals on AI, geopolitics, bioengineering and infrastructure. Immediate context on what is happening now.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/senales`,
        en: `${SITE_URL}/en/senales`,
      },
    },
  }
}

export default async function SignalsPage() {
  return <SignalsListView />
}
