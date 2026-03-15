'use client'

import { LogIn } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { FormField } from '@/shared/ui/form-field'
import type { AuthFormData } from '../domain/types'

interface LoginFormProps {
  readonly formData: AuthFormData
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({ formData, onChange, onSubmit }: LoginFormProps) {
  const t = useTranslations('auth')

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField
        label={t('email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder={t('emailPlaceholder')}
        required
        theme="dark"
      />
      <FormField
        label={t('password')}
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        placeholder="••••••••"
        required
        theme="dark"
      />
      <Button type="submit" variant="cta" fullWidth>
        <LogIn size={24} /> {t('loginButton')}
      </Button>
    </form>
  )
}
