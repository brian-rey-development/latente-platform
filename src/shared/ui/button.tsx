import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'cta' | 'icon'
export type ButtonSize = 'md' | 'lg'

interface ButtonVariantsOptions {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly fullWidth?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-surface hover:bg-brand',
  cta: 'bg-brand text-surface border-2 border-brand hover:bg-surface hover:text-brand',
  icon: 'bg-ink text-surface p-3 hover:bg-brand shadow-brutal-brand hover:shadow-none hover:translate-x-1 hover:translate-y-1',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'text-sm px-6 py-4',
  lg: 'text-xl px-8 py-5',
}

export function buttonVariants({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
}: ButtonVariantsOptions = {}): string {
  return [
    'font-sans font-black uppercase transition-colors flex items-center justify-center gap-3',
    VARIANT_CLASSES[variant],
    variant !== 'icon' ? SIZE_CLASSES[size] : '',
    fullWidth ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantsOptions {}

export function Button({ variant, size, fullWidth, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={[buttonVariants({ variant, size, fullWidth }), className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
