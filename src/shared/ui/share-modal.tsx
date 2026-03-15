'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Twitter, MessageCircle, Linkedin, Send, Link, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ShareModalLabels {
  readonly modalTitle: string
  readonly twitter: string
  readonly whatsapp: string
  readonly linkedin: string
  readonly telegram: string
  readonly copyLink: string
  readonly copied: string
  readonly close: string
}

interface ShareModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly url: string
  readonly articleTitle: string
  readonly labels: ShareModalLabels
}

function buildShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }
}

type SocialButton = { key: string; label: string; icon: LucideIcon; url: string }

function openPopup(shareUrl: string) {
  window.open(shareUrl, '_blank', 'noopener,noreferrer')
}

export function ShareModal({ isOpen, onClose, url, articleTitle, labels }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Cleanup copy timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access denied - silently ignore; user can copy from URL bar
    }
  }

  if (!isOpen) return null

  const shareUrls = buildShareUrls(url, articleTitle)

  const socialButtons: SocialButton[] = [
    { key: 'twitter', label: labels.twitter, icon: Twitter, url: shareUrls.twitter },
    { key: 'whatsapp', label: labels.whatsapp, icon: MessageCircle, url: shareUrls.whatsapp },
    { key: 'linkedin', label: labels.linkedin, icon: Linkedin, url: shareUrls.linkedin },
    { key: 'telegram', label: labels.telegram, icon: Send, url: shareUrls.telegram },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/80 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={labels.modalTitle}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] bg-surface border-2 border-ink shadow-brutal-lg w-[calc(100%-3rem)] max-w-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
          <p className="font-mono text-sm font-bold uppercase tracking-widest">
            {labels.modalTitle}
          </p>
          <button
            onClick={onClose}
            aria-label={labels.close}
            className="w-8 h-8 flex items-center justify-center hover:text-brand transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Social buttons */}
        <div className="p-5 flex flex-col gap-3">
          {socialButtons.map(({ key, label, icon: Icon, url: shareUrl }) => (
            <button
              key={key}
              onClick={() => openPopup(shareUrl)}
              className="w-full flex items-center gap-3 border-2 border-ink px-4 py-3 font-mono text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-surface transition-colors"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-3 border-2 border-ink px-4 py-3 font-mono text-sm font-bold uppercase tracking-wide hover:bg-brand hover:border-brand hover:text-surface transition-colors mt-1"
          >
            {copied ? <Check size={16} /> : <Link size={16} />}
            {copied ? labels.copied : labels.copyLink}
          </button>
        </div>
      </div>
    </>
  )
}
