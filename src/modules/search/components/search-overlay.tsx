'use client'

import { useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ArticlePreview } from '@/modules/articles/domain/types'
import { useSearch } from '../hooks/use-search'
import { SearchResultItem } from './search-result-item'

interface SearchOverlayProps {
  readonly articles: ArticlePreview[]
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function SearchOverlay({ articles, isOpen, onClose }: SearchOverlayProps) {
  const t = useTranslations('search')
  const { query, setQuery, results } = useSearch({ articles })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
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
    <>
      <div className="fixed inset-0 bg-black/70 z-40" onClick={onClose} aria-hidden="true" />

      <div className="fixed top-0 left-0 right-0 z-50 bg-ink border-b-2 border-border max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b border-ink-subtle">
          <Search size={20} className="text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="flex-grow bg-transparent font-mono text-lg text-surface focus:outline-none placeholder:text-muted"
          />
          <button onClick={onClose} className="p-2 text-muted hover:text-surface transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto">
          {query && results.length === 0 && (
            <p className="font-mono text-sm text-muted uppercase tracking-widest p-8 text-center">
              {t('noResults', { query })}
            </p>
          )}
          {results.map((article) => (
            <SearchResultItem key={article._id} article={article} onClose={onClose} />
          ))}
        </div>
      </div>
    </>
  )
}
