export type AuthMode = 'login' | 'register'

export interface AuthFormData {
  readonly email: string
  readonly password: string
}
