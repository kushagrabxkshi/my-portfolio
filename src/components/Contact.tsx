'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useCallback } from 'react'
import MagneticButton from './MagneticButton'

// Cursor velocity effect hook for the Download CV button
function useVelocityEffect() {
  const rotate = useMotionValue(0)
  const scale = useMotionValue(1)
  const smoothRotate = useSpring(rotate, { stiffness: 200, damping: 20 })
  const smoothScale = useSpring(scale, { stiffness: 200, damping: 20 })

  const positions = useRef<{ x: number; y: number; t: number }[]>([])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now()
    positions.current.push({ x: e.clientX, y: e.clientY, t: now })
    // Keep only last 3 positions
    if (positions.current.length > 3) positions.current.shift()

    if (positions.current.length >= 2) {
      const prev = positions.current[positions.current.length - 2]
      const curr = positions.current[positions.current.length - 1]
      const dt = Math.max(curr.t - prev.t, 1)
      const vx = (curr.x - prev.x) / dt
      const vy = (curr.y - prev.y) / dt
      const speed = Math.sqrt(vx * vx + vy * vy)
      const angle = Math.atan2(vy, vx) * (180 / Math.PI)

      rotate.set(Math.min(speed * 0.015, 8) * Math.sign(angle))
      scale.set(Math.min(1 + speed * 0.0008, 1.04))
    }
  }, [rotate, scale])

  const onMouseLeave = useCallback(() => {
    rotate.set(0)
    scale.set(1)
    positions.current = []
  }, [rotate, scale])

  return { smoothRotate, smoothScale, onMouseMove, onMouseLeave }
}

export default function Contact() {
  const cvVelocity = useVelocityEffect()

  return (
    <section
      id="contact"
      style={{ padding: '120px 8vw 80px', textAlign: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#00e5ff',
            letterSpacing: '0.4em',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          CONTACT
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(42px, 6vw, 88px)',
            lineHeight: 1.06,
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#f0f4f8' }}>Open to Internships.</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Let&apos;s Talk.
          </span>
        </h2>

        {/* Email — REPLACE [KUSHAGRA_EMAIL] WITH YOUR REAL EMAIL */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#334155',
            letterSpacing: '0.25em',
            marginBottom: 64,
          }}
        >
          kushagrabakshi@gmail.com {/* ← replace with your real email */}
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {/* INITIALIZE CONTACT */}
          <MagneticButton
            href="kushagrabakshi@gmail.com" // ← replace with your real email
            stiffness={260}
            damping={16}
          >
            <span
              data-cursor="magnetic"
              style={{
                background: 'linear-gradient(135deg, #00e5ff, #0891b2)',
                color: '#050505',
                padding: '18px 56px',
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.28em',
                display: 'inline-block',
                cursor: 'none',
              }}
            >
              INITIALIZE CONTACT
            </span>
          </MagneticButton>

          {/* DOWNLOAD CV — has cursor velocity rotation effect */}
          <MagneticButton
            href="/cv.pdf"
            download
            stiffness={260}
            damping={16}
          >
            <motion.span
              data-cursor="magnetic"
              onMouseMove={cvVelocity.onMouseMove}
              onMouseLeave={cvVelocity.onMouseLeave}
              style={{
                border: '1px solid rgba(0,229,255,0.3)',
                color: '#00e5ff',
                padding: '18px 56px',
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.25em',
                display: 'inline-block',
                background: 'transparent',
                cursor: 'none',
                rotate: cvVelocity.smoothRotate,
                scale: cvVelocity.smoothScale,
                willChange: 'transform',
              }}
            >
              DOWNLOAD CV
            </motion.span>
          </MagneticButton>

          {/* GITHUB — REPLACE href with your real GitHub URL */}
          <MagneticButton
            href="https://github.com/kushagrabxkshi" // ← replace with your real GitHub URL
            stiffness={260}
            damping={16}
          >
            <span
              data-cursor="magnetic"
              style={{
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#4a5568',
                padding: '18px 40px',
                borderRadius: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.25em',
                display: 'inline-block',
                background: 'transparent',
                cursor: 'none',
              }}
            >
              GITHUB ↗
            </span>
          </MagneticButton>
        </div>

        {/* Social links — REPLACE hrefs with your real URLs */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <a
            href="www.linkedin.com/in/kushagra-bakshi-3a3408310" // ← replace with your real LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#334155',
              letterSpacing: '0.3em',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = '#00e5ff')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = '#334155')
            }
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/kushagrabxkshi" // ← replace with your real GitHub URL
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#334155',
              letterSpacing: '0.3em',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = '#00e5ff')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = '#334155')
            }
          >
            GITHUB
          </a>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(255,255,255,0.04)',
            margin: '64px 0 32px',
          }}
        />

        {/* Footer */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#0f172a',
            letterSpacing: '0.45em',
          }}
        >
          KUSHAGRA BAKSHI × VLSI × AI × SILICON ENGINEERING × 2026
        </p>
      </motion.div>
    </section>
  )
}