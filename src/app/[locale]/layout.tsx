import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/layout/navbar";
import { SiteFooter } from "@/layout/site-footer";
import { NewsletterSection } from "@/layout/newsletter-section";
import { CartOverlay } from "@/modules/cart/components/cart-overlay";
import { AnalyticsProvider } from "@/modules/analytics/infrastructure/posthog.provider";
import { listArticlesQuery } from "@/modules/articles/application/queries/list-articles.query";
import type { Locale } from "@/i18n/routing";

const BASE_URL = "https://latente.xyz";

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const description =
    locale === "es"
      ? "Publicación sobre geopolítica, inteligencia artificial, bio-ingeniería y economía. Análisis lento y profundo sobre las fuerzas que reconfiguran el mundo."
      : "A publication on geopolitics, artificial intelligence, bioengineering and economics. Deep analysis on the forces reshaping the world.";

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: "LATENTE.", template: "%s | LATENTE." },
    description,
    openGraph: {
      siteName: "LATENTE.",
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_MX"],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: BASE_URL,
      languages: { es: BASE_URL, en: `${BASE_URL}/en` },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const articles = await listArticlesQuery().catch(() => []);

  return (
    <NextIntlClientProvider messages={messages}>
      <AnalyticsProvider>
        <div className="w-full min-h-screen flex flex-col bg-surface">
          <Navbar articles={articles} />
          <CartOverlay />
          <main className="grow flex flex-col">{children}</main>
          <NewsletterSection />
          <SiteFooter />
        </div>
      </AnalyticsProvider>
    </NextIntlClientProvider>
  );
}
