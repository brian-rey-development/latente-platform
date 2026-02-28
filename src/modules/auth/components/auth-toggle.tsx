'use client'

import { useTranslations } from 'next-intl'
import type { AuthMode } from '../domain/types'

interface AuthToggleProps {
  readonly mode: AuthMode
  readonly onToggle: () => void
}

export function AuthToggle({ mode, onToggle }: AuthToggleProps) {
  const t = useTranslations('auth')

  return (
    <div className="mt-8 text-center">
      <p className="font-mono text-sm text-muted">
        {mode === 'login' ? t('noAccount') : t('hasAccount')}
      </p>
      <button
        onClick={onToggle}
        className="font-mono text-sm font-bold text-brand uppercase tracking-widest hover:underline mt-2"
      >
        {mode === 'login' ? t('register') : t('login')}
      </button>
    </div>
  )
}
