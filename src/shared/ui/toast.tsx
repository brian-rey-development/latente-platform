'use client'

import { Check } from 'lucide-react'

interface ToastProps {
  readonly message: string
  readonly visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-8 left-1/2 z-[300] bg-ink text-surface font-mono text-sm font-bold uppercase tracking-widest px-5 py-3 flex items-center gap-2 shadow-brutal animate-toast-in"
    >
      <Check size={14} strokeWidth={3} />
      {message}
    </div>
  )
}
