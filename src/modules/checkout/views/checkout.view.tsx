'use client'

import { useTranslations } from 'next-intl'
import { useCart } from '@/modules/cart/hooks/use-cart'
import { useCheckout } from '../hooks/use-checkout'
import { CheckoutForm } from '../components/checkout-form'
import { OrderSummary } from '../components/order-summary'
import { SuccessScreen } from '../components/success-screen'

export function CheckoutView() {
  const t = useTranslations('checkout')
  const { items } = useCart()
  const { formData, status, handleChange, handleSubmit } = useCheckout()

  if (status === 'success') {
    return <SuccessScreen />
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="font-mono text-lg uppercase tracking-widest text-meta">
          {t('emptyCart')}
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-ink text-surface p-6 md:p-16 border-b-2 border-border">
        <h1 className="font-sans font-black text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter">
          {t('heading1')}
          <br />
          {t('heading2')}
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-ink">
          <h2 className="font-sans font-black text-2xl uppercase mb-8 tracking-tight">
            {t('paymentData')}
          </h2>
          <CheckoutForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </div>

        <div className="p-8 md:p-16">
          <h2 className="font-sans font-black text-2xl uppercase mb-8 tracking-tight">
            {t('yourOrder')}
          </h2>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
