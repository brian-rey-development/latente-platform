export const FEATURE_FLAGS = {
  STORE_ENABLED: process.env.NEXT_PUBLIC_FEATURE_STORE_ENABLED === 'true',
  PREMIUM_ENABLED: process.env.NEXT_PUBLIC_FEATURE_PREMIUM_ENABLED === 'true',
} as const
