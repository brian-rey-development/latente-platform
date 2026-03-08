import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CheckoutView } from '@/modules/checkout/views/checkout.view'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'

interface CheckoutPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'es' ? 'Finalizar Pedido' : 'Checkout'

  return {
    title,
    robots: { index: false, follow: false },
  }
}

export default function CheckoutPage() {
  if (!FEATURE_FLAGS.STORE_ENABLED) {
    notFound()
  }
  return <CheckoutView />
}
