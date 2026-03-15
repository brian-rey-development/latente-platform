'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { searchArticlesAction } from '@/modules/articles/application/actions/search-articles.action'
import { lockBodyScroll, unlockBodyScroll } from '@/shared/lib/overflow-lock'
import type { ArticlePreview } from '@/modules/articles/domain/types'
import { useSearch } from '../hooks/use-search'
import { SearchResultItem } from './search-result-item'

interface SearchOverlayProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const t = useTranslations('search')
  const [articles, setArticles] = useState<ArticlePreview[]>([])
  const { query, setQuery, results } = useSearch({ articles })
  const inputRef = useRef<HTMLInputElement>(null)
  const premiumLabel = useTranslations('premium')('label')

  useEffect(() => {
    if (isOpen && articles.length === 0) {
      searchArticlesAction().then(setArticles).catch(() => setArticles([]))
    }
  }, [isOpen, articles.length])

  useEffect(() => {
    if (!isOpen) return

    lockBodyScroll()
    const id = setTimeout(() => inputRef.current?.focus(), 50)

    return () => {
      clearTimeout(id)
      unlockBodyScroll()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-brand animate-search-in flex flex-col">
      <div className="flex flex-col px-6 md:px-10 max-w-5xl mx-auto w-full pt-6 md:pt-10 flex-1 min-h-0">

        {/* Close button */}
        <div className="flex justify-end mb-8 md:mb-12">
          <button
            onClick={onClose}
            className="text-surface hover:rotate-90 transition-transform duration-200 cursor-pointer"
            aria-label={t('close')}
          >
            <X size={48} />
          </button>
        </div>

        {/* Label */}
        <span className="font-mono text-lg md:text-xl font-bold tracking-widest text-surface uppercase mb-4 w-full">
          {t('label')}{' '}
          <span className="text-brand-muted">{'///'}</span>
        </span>

        {/* Input */}
        <div className="w-full border-b-8 border-ink pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            className="w-full bg-transparent font-sans font-black text-4xl md:text-5xl lg:text-6xl text-surface placeholder:text-surface/40 focus:outline-none uppercase"
          />
        </div>

        {/* Screen-reader live region */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {query && results.length > 0 ? t('resultCount', { count: results.length }) : ''}
        </span>

        {/* Results */}
        <div
          className="flex-1 overflow-y-auto mt-6 min-h-0 pb-10"
          role="list"
        >
          {query && results.length === 0 && (
            <p className="font-mono text-sm text-surface/70 uppercase tracking-widest p-8 text-center font-bold">
              {t('noResults', { query })}
            </p>
          )}
          {results.map((article) => (
            <SearchResultItem
              key={article._id}
              article={article}
              premiumLabel={premiumLabel}
              onClose={onClose}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
