import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Kushagra Bakshi — VLSI Engineer & AI Builder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            display: 'flex',
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, #00e5ff 39px, #00e5ff 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #00e5ff 39px, #00e5ff 40px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#f0f4f8',
              letterSpacing: '0.05em',
            }}
          >
            KUSHAGRA BAKSHI
          </span>
          <span
            style={{
              fontSize: 24,
              color: '#00e5ff',
              fontFamily: 'monospace',
            }}
          >
            VLSI Engineer &amp; AI Builder
          </span>
          <span
            style={{
              fontSize: 14,
              color: '#4a5568',
              fontFamily: 'monospace',
              marginTop: 24,
            }}
          >
            SiliconSpec · RTL · FPGA · AI
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
