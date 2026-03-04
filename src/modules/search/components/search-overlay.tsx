'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { strings } from '@/shared/lib/strings'
import type { ArticlePreview } from '@/modules/articles/domain/types'
import { useSearch } from '../hooks/use-search'
import { SearchResultItem } from './search-result-item'

interface SearchOverlayProps {
  readonly articles: ArticlePreview[]
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function SearchOverlay({ articles, isOpen, onClose }: SearchOverlayProps) {
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
    <div className="fixed inset-0 z-[100] bg-brand animate-search-in flex flex-col">
      {/* Single container — X button and content share the same grid */}
      <div className="flex flex-col px-6 md:px-10 max-w-5xl mx-auto w-full pt-6 md:pt-10 flex-1 min-h-0">

        {/* Close button */}
        <div className="flex justify-end mb-8 md:mb-12">
          <button
            onClick={onClose}
            className="text-surface hover:rotate-90 transition-transform duration-200 cursor-pointer"
            aria-label={strings.search.close}
          >
            <X size={48} />
          </button>
        </div>

        {/* Label */}
        <span className="font-mono text-lg md:text-xl font-bold tracking-widest text-surface uppercase mb-4 w-full">
          {strings.search.label}{' '}
          <span className="text-brand-muted">{'///'}</span>
        </span>

        {/* Input */}
        <div className="w-full border-b-8 border-ink pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={strings.search.placeholder}
            aria-label={strings.search.placeholder}
            className="w-full bg-transparent font-sans font-black text-4xl md:text-5xl lg:text-6xl text-surface placeholder:text-surface/40 focus:outline-none uppercase"
          />
        </div>

        {/* Screen-reader live region for result count */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {query && results.length > 0 ? `${results.length} resultados` : ''}
        </span>

        {/* Results */}
        <div
          className="flex-1 overflow-y-auto mt-6 min-h-0 pb-10"
          role="list"
        >
          {query && results.length === 0 && (
            <p className="font-mono text-sm text-surface/70 uppercase tracking-widest p-8 text-center font-bold">
              {`Sin resultados para "${query}"`}
            </p>
          )}
          {results.map((article) => (
            <SearchResultItem key={article._id} article={article} onClose={onClose} />
          ))}
        </div>

      </div>
    </div>
  )
}
