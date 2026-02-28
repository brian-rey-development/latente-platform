import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function DefaultOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#111111',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#E60000',
            }}
          />
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: '16px',
              fontWeight: 900,
              color: '#888888',
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
              color: '#F7F7F5',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            CARTOGRAFÍA
            <br />
            DEL FUTURO.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#555555',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            latente.xyz
          </span>
          <span
            style={{ fontFamily: 'monospace', fontSize: '24px', color: '#E60000' }}
          >
            {'///'}
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
