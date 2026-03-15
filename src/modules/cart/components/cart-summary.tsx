'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useCart } from '../hooks/use-cart'
import { formatPrice } from '@/shared/lib/format-price'
import { buttonVariants } from '@/shared/ui/button'

export function CartSummary() {
  const { total, closeCart } = useCart()
  const t = useTranslations('cart')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center font-mono font-bold uppercase tracking-widest text-lg">
        <span>{t('total')}</span>
        <span className="font-sans font-black text-2xl">{formatPrice(total)}</span>
      </div>
      <Link
        href="/tienda/checkout"
        onClick={closeCart}
        className={`${buttonVariants({ variant: 'primary', size: 'md', fullWidth: true })} border-2 border-surface hover:border-ink`}
      >
        {t('checkout')}
      </Link>
    </div>
  )
}
