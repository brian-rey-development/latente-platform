'use client'

import { Share2, Bookmark, BookmarkCheck } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'
import { ShareModal } from '@/shared/ui/share-modal'
import type { ShareModalLabels } from '@/shared/ui/share-modal'

const BOOKMARKS_KEY = 'latente:bookmarks'

function getBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function toggleBookmark(slug: string): void {
  const bookmarks = getBookmarks()
  const next = bookmarks.includes(slug)
    ? bookmarks.filter((s) => s !== slug)
    : [...bookmarks, slug]
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next))
  // Notify useSyncExternalStore subscribers
  window.dispatchEvent(new StorageEvent('storage', { key: BOOKMARKS_KEY }))
}

// useSyncExternalStore: subscribes to storage events so bookmark state
// stays in sync across tabs and avoids the useEffect+setState anti-pattern.
function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

interface ArticleActionsProps {
  readonly slug: string
  readonly articleTitle: string
  readonly shareLabel: string
  readonly bookmarkLabel: string
  readonly shareModalLabels: ShareModalLabels
}

export function ArticleActions({
  slug,
  articleTitle,
  shareLabel,
  bookmarkLabel,
  shareModalLabels,
}: ArticleActionsProps) {
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  // useSyncExternalStore: client snapshot reads localStorage, server snapshot
  // returns false to avoid hydration mismatch. No useEffect needed.
  const isBookmarked = useSyncExternalStore(
    subscribe,
    () => getBookmarks().includes(slug),
    () => false,
  )

  function handleOpenShare() {
    setCurrentUrl(window.location.href)
    setIsShareOpen(true)
  }

  return (
    <>
      <div className="flex gap-4 lg:pt-8 lg:border-t-2 lg:border-ink">
        <button
          onClick={handleOpenShare}
          aria-label={shareLabel}
          className="w-12 h-12 border-2 border-ink flex items-center justify-center hover:bg-brand hover:border-brand hover:text-surface transition-all text-ink shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <Share2 size={18} />
        </button>
        <button
          onClick={() => toggleBookmark(slug)}
          aria-label={bookmarkLabel}
          className="w-12 h-12 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-surface transition-all text-ink shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        >
          {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={currentUrl}
        articleTitle={articleTitle}
        labels={shareModalLabels}
      />
    </>
  )
}
