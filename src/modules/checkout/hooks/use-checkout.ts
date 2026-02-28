'use client'

import { useState } from 'react'
import type { CheckoutFormData } from '../domain/types'
import { useCart } from '@/modules/cart/hooks/use-cart'
import { useAnalytics } from '@/modules/analytics/hooks/use-analytics'
import { ANALYTICS_EVENTS } from '@/modules/analytics/domain/constants'

type CheckoutStatus = 'idle' | 'success' | 'error'

const EMPTY_FORM: CheckoutFormData = {
  name: '',
  email: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
}

export function useCheckout() {
  const [formData, setFormData] = useState<CheckoutFormData>(EMPTY_FORM)
  const [status, setStatus] = useState<CheckoutStatus>('idle')
  const { items, total, clearCart } = useCart()
  const { track } = useAnalytics()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    track(ANALYTICS_EVENTS.CHECKOUT_COMPLETED, { cart_total: total })
    clearCart()
    setStatus('success')
    setFormData(EMPTY_FORM)
  }

  return { formData, status, items, total, handleChange, handleSubmit }
}
