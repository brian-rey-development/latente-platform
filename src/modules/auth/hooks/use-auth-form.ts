'use client'

import { useState } from 'react'
import type { AuthMode, AuthFormData } from '../domain/types'

export function useAuthForm() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [formData, setFormData] = useState<AuthFormData>({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const toggleMode = () => setMode((m) => (m === 'login' ? 'register' : 'login'))

  return { mode, formData, handleChange, handleSubmit, toggleMode }
}
