import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://latente.xyz'),
  title: { default: 'LATENTE.', template: '%s | LATENTE.' },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
