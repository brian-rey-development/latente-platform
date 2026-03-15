import { revalidatePath, revalidateTag } from 'next/cache'
import crypto from 'crypto'

const LOCALES = ['es', 'en'] as const

// With localePrefix: 'as-needed', Spanish (default) has no prefix.
// English has /en/ prefix. We must revalidate both forms.
function localePath(locale: string, path: string): string {
  return locale === 'es' ? path : `/en${path}`
}

function isValidSecret(incoming: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET
  if (!incoming || !expected || incoming.length !== expected.length) return false
  return crypto.timingSafeEqual(Buffer.from(incoming), Buffer.from(expected))
}

export async function POST(request: Request) {
  if (!isValidSecret(request.headers.get('x-sanity-webhook-secret'))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { slug?: { current?: string }; _type?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  const slug = body?.slug?.current
  const type = body?._type

  // Revalidate root layout for all locales
  for (const locale of LOCALES) {
    revalidatePath(localePath(locale, '/'), 'layout')
    revalidatePath(localePath(locale, '/tienda'), 'page')
  }

  if (type === 'article') {
    revalidateTag('articles', 'default')
    if (slug) revalidateTag(`article-${slug}`, 'default')
    for (const locale of LOCALES) {
      revalidatePath(localePath(locale, '/articulos'), 'page')
      if (slug) revalidatePath(localePath(locale, `/articulos/${slug}`), 'page')
    }
  }

  if (type === 'report') {
    revalidateTag('reports', 'default')
    if (slug) revalidateTag(`report-${slug}`, 'default')
    for (const locale of LOCALES) {
      revalidatePath(localePath(locale, '/reportes'), 'page')
      if (slug) revalidatePath(localePath(locale, `/reportes/${slug}`), 'page')
    }
  }

  if (type === 'venture') {
    for (const locale of LOCALES) {
      revalidatePath(localePath(locale, '/labs'), 'page')
      if (slug) revalidatePath(localePath(locale, `/labs/${slug}`), 'page')
    }
  }

  if (type === 'signal') {
    revalidateTag('signals', 'default')
    if (slug) revalidateTag(`signal-${slug}`, 'default')
    for (const locale of LOCALES) {
      revalidatePath(localePath(locale, '/senales'), 'page')
      if (slug) revalidatePath(localePath(locale, `/senales/${slug}`), 'page')
    }
  }

  return Response.json({ revalidated: true, slug, type })
}
