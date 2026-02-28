'use client'

import { UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { FormField } from '@/shared/ui/form-field'
import type { AuthFormData } from '../domain/types'

interface RegisterFormProps {
  readonly formData: AuthFormData
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly onSubmit: (e: React.FormEvent) => void
}

export function RegisterForm({ formData, onChange, onSubmit }: RegisterFormProps) {
  const t = useTranslations('auth')

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField
        label={t('email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder="tu@email.com"
        required
        theme="dark"
      />
      <FormField
        label={t('password')}
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        placeholder={t('passwordPlaceholder')}
        required
        minLength={8}
        theme="dark"
      />
      <Button type="submit" variant="cta" fullWidth>
        <UserPlus size={24} /> {t('registerButton')}
      </Button>
    </form>
  )
}
