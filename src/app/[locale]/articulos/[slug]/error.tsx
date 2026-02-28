'use client'

import Link from 'next/link'

export default function ArticleError() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-brand mb-4">Error</p>
        <h1 className="font-sans font-black text-5xl uppercase tracking-tighter mb-6">
          Error al cargar.
        </h1>
        <Link href="/" className="font-mono text-sm underline hover:text-brand transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
