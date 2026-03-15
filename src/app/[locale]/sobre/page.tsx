import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { SITE_URL } from '@/shared/lib/site-config'

interface AboutPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const canonical = locale === 'es' ? `${SITE_URL}/sobre` : `${SITE_URL}/en/sobre`

  return {
    title: t('title'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/sobre`,
        en: `${SITE_URL}/en/sobre`,
      },
    },
  }
}

const COVER_KEYS = ['cover0', 'cover1', 'cover2', 'cover3', 'cover4'] as const

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return (
    <main className="bg-surface text-ink">
      <div className="px-6 md:px-10 pt-16 pb-24 max-w-3xl">
        <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tight mb-16">
          {t('title')}
        </h1>

        <section className="mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink mb-4">
            {t('whatTitle')}
          </h2>
          <p className="font-serif text-base leading-relaxed">{t('what')}</p>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink mb-4">
            {t('coversTitle')}
          </h2>
          <ul className="space-y-3">
            {COVER_KEYS.map((key) => (
              <li key={key} className="font-serif text-base leading-relaxed border-l-2 border-ink pl-4">
                {t(key)}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink mb-4">
            {t('forTitle')}
          </h2>
          <p className="font-serif text-base leading-relaxed">{t('for')}</p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink mb-4">
            {t('contactTitle')}
          </h2>
          <p className="font-mono text-sm">{t('contact')}</p>
        </section>
      </div>
    </main>
  )
}
