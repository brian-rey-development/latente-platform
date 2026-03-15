import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SITE_URL } from '@/shared/lib/site-config'

interface LabsPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LabsPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/labs` : `${SITE_URL}/en/labs`

  const t = await getTranslations({ locale, namespace: 'labs' })
  const title = t('title')
  const description = t('subtitle')

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

export default async function LabsPage() {
  const t = await getTranslations('labs')

  return (
    <div>
      <div className="px-6 md:px-10 py-16 border-b border-border">
        <p className="font-sans text-xs font-bold uppercase tracking-widest text-muted mb-4">
          {t('label')}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-black uppercase tracking-tight">
          {t('title')}
        </h1>
        <p className="font-sans text-base md:text-lg text-muted mt-4 max-w-xl">
          {t('subtitle')}
        </p>
      </div>
      <div className="px-6 md:px-10 py-24">
        <p className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight text-muted">
          {t('empty')}
        </p>
      </div>
    </div>
  )
}
