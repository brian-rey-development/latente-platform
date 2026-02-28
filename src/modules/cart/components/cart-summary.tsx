'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useCart } from '../hooks/use-cart'
import { formatPrice } from '@/shared/lib/format-price'
import { buttonVariants } from '@/shared/ui/button'

export function CartSummary() {
  const t = useTranslations('cart')
  const { total, closeCart } = useCart()

  return (
    <div className="border-t-2 border-border pt-6 mt-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-meta">
          {t('total')}
        </span>
        <span className="font-sans font-black text-2xl">{formatPrice(total)}</span>
      </div>
      <Link
        href="/tienda/checkout"
        onClick={closeCart}
        className={buttonVariants({ variant: 'cta', size: 'md', fullWidth: true })}
      >
        {t('checkout')}
      </Link>
    </div>
  )
}
