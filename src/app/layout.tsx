import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://latente.xyz'),
  title: { default: 'LATENTE.', template: '%s | LATENTE.' },
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return children as React.ReactElement
}
