'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ArticlePreview } from '@/modules/articles/domain/types'

interface SearchResultItemProps {
  readonly article: ArticlePreview
  readonly onClose: () => void
}

export function SearchResultItem({ article, onClose }: SearchResultItemProps) {
  const t = useTranslations('premium')

  return (
    <Link
      href={`/articulos/${article.slug}`}
      onClick={onClose}
      className="flex items-start justify-between gap-4 p-4 border-b border-ink-subtle hover:bg-ink-subtle transition-colors group"
    >
      <div className="flex-grow">
        <span className="font-mono text-[10px] font-bold tracking-widest text-brand uppercase block mb-1">
          {article.category}
          {article.premium && ` // ${t('label')}`}
        </span>
        <p className="font-sans font-bold text-sm uppercase leading-tight text-surface group-hover:text-white">
          {article.title}
        </p>
      </div>
      <ArrowUpRight
        size={16}
        className="text-muted group-hover:text-brand flex-shrink-0 mt-1 transition-colors"
      />
    </Link>
  )
}
