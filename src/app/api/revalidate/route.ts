import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json() as { slug?: { current?: string }; _type?: string }
  const slug = body?.slug?.current
  const type = body?._type

  revalidatePath('/', 'layout')
  revalidatePath('/tienda', 'page')

  if (type === 'article' && slug) {
    revalidatePath(`/articulos/${slug}`)
  }

  if (type === 'report') {
    revalidatePath('/reportes', 'layout')
    if (slug) {
      revalidatePath(`/reportes/${slug}`, 'page')
    }
  }

  if (type === 'venture') {
    revalidatePath('/labs', 'layout')
    if (slug) {
      revalidatePath(`/labs/${slug}`, 'page')
    }
  }

  return Response.json({ revalidated: true, slug, type })
}
