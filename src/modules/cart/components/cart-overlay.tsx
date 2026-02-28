'use client'

import { useEffect } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCart } from '../hooks/use-cart'
import { CartItem as CartItemRow } from './cart-item'
import { CartSummary } from './cart-summary'

export function CartOverlay() {
  const t = useTranslations('cart')
  const { items, isOpen, closeCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-ink text-surface z-50 flex flex-col border-l-2 border-border">
        <div className="flex items-center justify-between p-6 border-b-2 border-border">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-brand" />
            <span className="font-sans font-black text-xl uppercase tracking-tight">{t('title')}</span>
          </div>
          <button
            onClick={closeCart}
            className="p-3 hover:text-brand transition-colors"
            aria-label={t('close')}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted">
              <ShoppingCart size={48} />
              <p className="font-mono text-sm uppercase tracking-widest">{t('empty')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <CartItemRow key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6">
            <CartSummary />
          </div>
        )}
      </aside>
    </>
  )
}
