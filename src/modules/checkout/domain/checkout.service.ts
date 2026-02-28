import type { CheckoutFormData } from './types'

export const CheckoutService = {
  validateForm(data: Partial<CheckoutFormData>): string[] {
    const errors: string[] = []
    if (!data.name?.trim()) errors.push('Nombre requerido')
    if (!data.email?.includes('@')) errors.push('Email inválido')
    if (!data.cardNumber || data.cardNumber.replace(/\s/g, '').length < 16) {
      errors.push('Número de tarjeta inválido')
    }
    if (!data.expiry) errors.push('Fecha de expiración requerida')
    if (!data.cvv || data.cvv.length < 3) errors.push('CVV inválido')
    return errors
  },
} as const
