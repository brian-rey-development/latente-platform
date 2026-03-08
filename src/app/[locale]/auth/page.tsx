import type { Metadata } from 'next'
import { AuthView } from '@/modules/auth/views/auth.view'

interface AuthPageProps {
  readonly params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AuthPageProps): Promise<Metadata> {
  const { locale } = await params

  const title = locale === 'es' ? 'Acceso' : 'Sign In'
  const description =
    locale === 'es'
      ? 'Inicia sesión para acceder al contenido de Latente.'
      : 'Sign in to access Latente content.'

  return {
    title,
    description,
    robots: { index: false },
  }
}

export default AuthView
