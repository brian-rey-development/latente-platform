'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '@/shared/ui/button'

export function SuccessScreen() {
  const t = useTranslations('checkout')

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <CheckCircle size={80} className="text-brand mx-auto mb-8" />
        <h1 className="font-sans font-black text-5xl uppercase tracking-tighter mb-4">
          {t('successTitle')}
        </h1>
        <p className="font-mono text-lg uppercase tracking-widest text-muted mb-12">
          {t('successMessage')}
        </p>
        <Link href="/" className={buttonVariants({ variant: 'primary' })}>
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
