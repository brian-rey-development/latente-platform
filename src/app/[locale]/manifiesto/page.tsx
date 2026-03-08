import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { buttonVariants } from '@/shared/ui/button'
import { SITE_URL } from '@/shared/lib/site-config'

interface ManifiestoPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ManifiestoPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'es' ? 'Manifiesto' : 'Manifesto'
  const canonical =
    locale === 'es' ? `${SITE_URL}/manifiesto` : `${SITE_URL}/en/manifiesto`

  const t = await getTranslations({ locale, namespace: 'manifesto' })

  return {
    title,
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/manifiesto`,
        en: `${SITE_URL}/en/manifiesto`,
      },
    },
  }
}

export default async function ManifiestoPage({ params }: ManifiestoPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'manifesto' })

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-ink text-surface px-6 md:px-16 pt-16 pb-12 border-b-2 border-border">
        <h1 className="font-sans font-black text-5xl md:text-7xl lg:text-[6rem] uppercase leading-[0.9] tracking-tighter">
          {t('titleLine1')} {t('titleLine2')}
        </h1>
      </header>

      <article className="px-6 md:px-16 lg:px-32 py-16 max-w-4xl">
        <div className="prose prose-xl font-serif text-ink leading-[1.8] space-y-8">
          <p className="first-letter:float-left first-letter:text-7xl first-letter:font-sans first-letter:font-black first-letter:text-brand first-letter:mr-3 first-letter:mt-2 first-letter:leading-none">
            {t('lead')}
          </p>

          <p>{t('body1')}</p>

          <p>
            <strong>LATENTE.</strong> {t('body2')}
          </p>

          <blockquote className="border-l-4 border-brand bg-surface-dim p-8 md:p-10 my-16 shadow-brutal">
            <p className="font-serif italic text-2xl md:text-3xl text-ink leading-snug">
              &ldquo;{t('quote')}&rdquo;
            </p>
            <footer className="font-mono text-xs font-bold uppercase tracking-widest mt-6 not-italic text-brand">
              {'///'} William Gibson
            </footer>
          </blockquote>

          <p>{t('body3')}</p>

          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            {t('protocol')}
          </p>
        </div>

        <div className="mt-16 pt-10 border-t-4 border-ink">
          <Link href="/" className={buttonVariants({ variant: 'primary' })}>
            {t('cta')}
          </Link>
        </div>
      </article>
    </div>
  )
}
