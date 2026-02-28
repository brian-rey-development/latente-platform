'use client'
/**
 * Sanity Studio embedded at /studio.
 * Runs entirely client-side - protected by Sanity project membership.
 */
import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then((m) => m.NextStudio), {
  ssr: false,
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
