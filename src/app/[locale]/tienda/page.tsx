import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProductsListView } from '@/modules/products/views/products-list.view'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'
import { SITE_URL } from '@/shared/lib/site-config'

interface TiendaPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: TiendaPageProps): Promise<Metadata> {
  const { locale } = await params
  const canonical = locale === 'es' ? `${SITE_URL}/tienda` : `${SITE_URL}/en/tienda`

  const title = locale === 'es' ? 'Tienda' : 'Store'
  const description =
    locale === 'es'
      ? 'Publicaciones, objetos y membresías de Latente.'
      : 'Publications, objects, and memberships from Latente.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/tienda`,
        en: `${SITE_URL}/en/tienda`,
      },
    },
  }
}

export default function TiendaPage() {
  if (!FEATURE_FLAGS.STORE_ENABLED) {
    notFound()
  }
  return <ProductsListView />
}
