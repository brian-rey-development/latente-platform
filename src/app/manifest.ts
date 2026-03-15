import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LATENTE.',
    short_name: 'Latente',
    description: 'Inteligencia estratégica sobre las fuerzas que reconfiguran el mundo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F7F5',
    theme_color: '#111111',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
