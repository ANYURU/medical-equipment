import { ImageResponse } from 'next/og'

export const alt = 'Gombaland Uganda Limited'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(to bottom right, #2563eb, #1e40af)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '24px',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#2563eb">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '72px', fontWeight: 'bold', lineHeight: 1 }}>
              GOMBALAND
            </div>
            <div style={{ fontSize: '32px', opacity: 0.9 }}>
              UGANDA LIMITED
            </div>
          </div>
        </div>
        <div style={{ fontSize: '28px', textAlign: 'center', opacity: 0.9 }}>
          Medical Equipment & Supplies
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
