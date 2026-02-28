import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CheckoutView } from '@/modules/checkout/views/checkout.view'
import { FEATURE_FLAGS } from '@/shared/lib/feature-flags'

export const metadata: Metadata = {
  title: 'Finalizar Pedido',
}

export default function CheckoutPage() {
  if (!FEATURE_FLAGS.STORE_ENABLED) {
    notFound()
  }
  return <CheckoutView />
}
