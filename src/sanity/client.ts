import { createClient } from 'next-sanity'

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder').trim()
const rawDataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim()
const dataset = /^[a-z0-9_~][a-z0-9_-]*$/.test(rawDataset) ? rawDataset : 'production'
const apiVersion = '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

/** Returns true if Sanity is properly configured with a real project ID */
export const isSanityConfigured = (): boolean =>
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
