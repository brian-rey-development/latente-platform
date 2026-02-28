'use client'

import { useState, useMemo } from 'react'
import type { ArticlePreview } from '@/modules/articles/domain/types'
import { SearchService } from '../domain/search.service'

interface UseSearchProps {
  readonly articles: ArticlePreview[]
}

export function useSearch({ articles }: UseSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo(
    () => SearchService.fuzzyFilter(articles, query),
    [articles, query],
  )

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setQuery('')
  }

  return { isOpen, query, setQuery, results, open, close }
}
