'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCart } from '../hooks/use-cart'
import { formatPrice } from '@/shared/lib/format-price'
import type { CartItem as CartItemType } from '../../products/domain/types'

interface CartItemProps {
  readonly item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const t = useTranslations('cart')
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex gap-4 border-b-2 border-ink-subtle pb-6">
      <div className="flex-grow">
        <span className="font-mono text-[10px] font-bold tracking-widest text-brand uppercase block mb-1">
          {item.productType}
        </span>
        <p className="font-sans font-black text-sm uppercase leading-tight mb-2">{item.name}</p>
        <p className="font-mono text-sm font-bold">{formatPrice(item.price)}</p>
      </div>

      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        <button
          onClick={() => removeItem(item._id)}
          className="p-2 -mr-2 text-muted hover:text-brand transition-colors"
          aria-label={t('removeItem')}
        >
          <Trash2 size={16} />
        </button>
        <div className="flex items-center border-2 border-border">
          <button
            onClick={() => updateQty(item._id, -1)}
            className="p-3 hover:bg-border transition-colors"
            aria-label={t('decreaseQty')}
          >
            <Minus size={14} />
          </button>
          <span className="font-mono text-sm font-bold w-6 text-center">{item.qty}</span>
          <button
            onClick={() => updateQty(item._id, 1)}
            className="p-3 hover:bg-border transition-colors"
            aria-label={t('increaseQty')}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
