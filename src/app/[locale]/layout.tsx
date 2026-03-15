import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Navbar } from '@/layout/navbar'
import { SiteFooter } from '@/layout/site-footer'
import { CartOverlay } from '@/modules/cart/components/cart-overlay'
import { AnalyticsProvider } from '@/modules/analytics/infrastructure/posthog.provider'
import type { Locale } from '@/i18n/routing'
import { SITE_NAME } from '@/shared/lib/site-config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

interface LocaleLayoutProps {
  readonly children: React.ReactNode
  readonly params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  const description =
    locale === 'es'
      ? 'Publicación sobre geopolítica, inteligencia artificial, bio-ingeniería y economía. Análisis lento y profundo sobre las fuerzas que reconfiguran el mundo.'
      : 'A publication on geopolitics, artificial intelligence, bioengineering and economics. Deep analysis on the forces reshaping the world.'

  return {
    description,
    openGraph: {
      siteName: SITE_NAME,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_MX'],
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale as Locale)

  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations('a11y'),
  ])

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider>
            <div className="w-full min-h-screen flex flex-col bg-surface">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-brand focus:text-surface focus:font-mono focus:font-bold focus:text-sm focus:uppercase focus:tracking-widest"
              >
                {t('skipToContent')}
              </a>
              <Navbar />
              <CartOverlay />
              <main id="main-content" className="grow flex flex-col">{children}</main>
              <SiteFooter />
            </div>
          </AnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
