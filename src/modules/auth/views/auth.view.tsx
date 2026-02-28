'use client'

import { Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useAuthForm } from '../hooks/use-auth-form'
import { LoginForm } from '../components/login-form'
import { RegisterForm } from '../components/register-form'
import { AuthToggle } from '../components/auth-toggle'

export function AuthView() {
  const t = useTranslations('auth')
  const { mode, formData, handleChange, handleSubmit, toggleMode } = useAuthForm()

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-surface">
      <div className="bg-ink text-surface p-8 md:p-12 lg:p-24 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-border">
        <div className="mb-8">
          <Lock size={48} className="text-brand animate-pulse" />
        </div>
        <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.9] tracking-tighter mb-6">
          {t('panelTitle1')}
        </h1>
        <p className="font-mono text-sm md:text-lg text-meta uppercase tracking-widest max-w-sm">
          {t('panelSubtitle')}
        </p>
      </div>

      <div className="p-8 md:p-12 lg:p-24 flex flex-col justify-center">
        <h2 className="font-sans font-black text-4xl uppercase tracking-tighter mb-10">
          {mode === 'login' ? t('loginTitle') : t('registerTitle')}
        </h2>

        {mode === 'login' ? (
          <LoginForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        ) : (
          <RegisterForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        )}

        <AuthToggle mode={mode} onToggle={toggleMode} />
      </div>
    </div>
  )
}
