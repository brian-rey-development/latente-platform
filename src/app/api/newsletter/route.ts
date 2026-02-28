export async function POST(request: Request) {
  const body = await request.json() as { email?: string }
  const email = body?.email

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Email inválido' }, { status: 400 })
  }

  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    return Response.json({ error: 'Newsletter not configured' }, { status: 500 })
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, reactivate_existing: true }),
    },
  )

  if (!res.ok) {
    return Response.json({ error: 'Subscription failed' }, { status: 502 })
  }

  return Response.json({ success: true })
}
