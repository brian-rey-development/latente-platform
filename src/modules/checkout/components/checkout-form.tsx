'use client'

import { CreditCard } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { FormField } from '@/shared/ui/form-field'
import type { CheckoutFormData } from '../domain/types'

interface CheckoutFormProps {
  readonly formData: CheckoutFormData
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly onSubmit: (e: React.FormEvent) => void
}

export function CheckoutForm({ formData, onChange, onSubmit }: CheckoutFormProps) {
  const t = useTranslations('checkout')

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormField
        label={t('fullName')}
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder={t('namePlaceholder')}
        required
      />
      <FormField
        label={t('email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder="tu@email.com"
        required
      />
      <FormField
        label={t('cardNumber')}
        name="cardNumber"
        value={formData.cardNumber}
        onChange={onChange}
        placeholder={t('cardPlaceholder')}
        required
        maxLength={19}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label={t('expiration')}
          name="expiry"
          value={formData.expiry}
          onChange={onChange}
          placeholder={t('expPlaceholder')}
          required
          maxLength={5}
        />
        <FormField
          label={t('cvv')}
          name="cvv"
          value={formData.cvv}
          onChange={onChange}
          placeholder={t('cvvPlaceholder')}
          required
          maxLength={4}
        />
      </div>
      <Button type="submit" variant="primary" fullWidth>
        <CreditCard size={24} /> {t('submit')}
      </Button>
    </form>
  )
}
