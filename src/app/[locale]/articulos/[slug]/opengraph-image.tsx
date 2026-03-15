import { ImageResponse } from '@vercel/og'
import { getArticleQuery } from '@/modules/articles/application/queries/get-article.query'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const BRAND_COLORS = {
  background: '#111111',
  white: '#F7F7F5',
  gray: '#888888',
  grayDim: '#555555',
  red: '#E60000',
} as const

function FallbackLayout() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: BRAND_COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '24px', height: '24px', backgroundColor: BRAND_COLORS.red }} />
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: '16px',
            fontWeight: 900,
            color: BRAND_COLORS.gray,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          LATENTE.
        </span>
      </div>
      <div>
        <p
          style={{
            fontFamily: 'sans-serif',
            fontSize: '96px',
            fontWeight: 900,
            color: BRAND_COLORS.white,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          INTELIGENCIA
          <br />
          {'ESTRATÉGICA.'}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            color: BRAND_COLORS.grayDim,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          latente.xyz
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '24px', color: BRAND_COLORS.red }}>
          {'///'}
        </span>
      </div>
    </div>
  )
}

export default async function ArticleOgImage({ params }: Props) {
  const { locale, slug } = await params

  const article = await getArticleQuery(slug).catch(() => null)

  if (!article) {
    return new ImageResponse(<FallbackLayout />, { ...size })
  }

  const title = locale === 'en' && article.titleEn ? article.titleEn : article.title
  const author = article.author.toUpperCase()
  const byline = locale === 'en' ? `BY ${author}` : `POR ${author}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: BRAND_COLORS.background,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        {/* Top: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: BRAND_COLORS.red }} />
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: '16px',
              fontWeight: 900,
              color: BRAND_COLORS.gray,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            LATENTE.
          </span>
        </div>

        {/* Middle: Article title */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
          <p
            style={{
              fontFamily: 'sans-serif',
              fontSize: '72px',
              fontWeight: 900,
              color: BRAND_COLORS.white,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: 0,
              maxWidth: '960px',
            }}
          >
            {title}
          </p>
        </div>

        {/* Bottom: Author left, domain + /// right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: BRAND_COLORS.grayDim,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {byline}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: BRAND_COLORS.grayDim,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              latente.xyz
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '24px', color: BRAND_COLORS.red }}>
              {'///'}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
