'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCart } from '@/modules/cart/hooks/use-cart'
import { useAnalytics } from '@/modules/analytics/hooks/use-analytics'
import { ANALYTICS_EVENTS } from '@/modules/analytics/domain/constants'
import { formatPrice } from '@/shared/lib/format-price'
import { Button } from '@/shared/ui/button'
import type { Product } from '../domain/types'
import { urlFor } from '@/sanity/image'

interface ProductCardProps {
  readonly product: Product
  readonly index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const t = useTranslations('store')
  const { addItem } = useCart()
  const { track } = useAnalytics()
  const isLast = index === 3

  const imageSrc = product.image
    ? urlFor(product.image).width(600).height(600).url()
    : null

  const handleAddToCart = () => {
    addItem(product)
    track(ANALYTICS_EVENTS.ADD_TO_CART, {
      product_slug: product.slug,
      product_type: product.productType,
      price: product.price,
    })
  }

  return (
    <div
      className={`flex flex-col border-b-2 md:border-b-0 border-ink ${!isLast ? 'md:border-r-2' : ''} bg-surface group`}
    >
      <div className="aspect-square border-b-2 border-ink bg-ink overflow-hidden relative">
        <div className="absolute inset-0 bg-brand mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity z-10 pointer-events-none" />
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover grayscale contrast-[1.2]"
          />
        ) : (
          <div className="w-full h-full bg-ink-subtle" />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <span className="font-mono text-xs font-bold tracking-widest text-brand uppercase mb-2 block">
            {product.productType}
          </span>
          <h3 className="font-sans font-black text-2xl uppercase leading-tight mb-4 text-ink">
            {product.name}
          </h3>
        </div>
        <div className="flex items-end justify-between mt-8">
          <span className="font-mono text-2xl font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          <Button
            variant="icon"
            onClick={handleAddToCart}
            aria-label={t('addToCart', { name: product.name })}
          >
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}
