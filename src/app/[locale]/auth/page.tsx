import type { Metadata } from 'next'
import { AuthView } from '@/modules/auth/views/auth.view'

export const metadata: Metadata = {
  title: 'Acceso',
  description: 'Inicia sesión para acceder al contenido de Latente.',
}

export default AuthView
