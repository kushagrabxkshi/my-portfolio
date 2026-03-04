'use client'

import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '0 8vw 80px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#00e5ff',
            letterSpacing: '0.4em',
            marginBottom: 16,
          }}
        >
          CONTACT
        </p>

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
          <span className="gradient-text">Let&apos;s Talk.</span>
        </h2>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#334155',
            letterSpacing: '0.25em',
            marginBottom: 64,
          }}
        >
          [KUSHAGRA_EMAIL]
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <MagneticButton href="mailto:[KUSHAGRA_EMAIL]" stiffness={260} damping={16}>
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
              }}
            >
              INITIALIZE CONTACT
            </span>
          </MagneticButton>

          <MagneticButton href="/cv.pdf" download stiffness={260} damping={16}>
            <span
              data-cursor="magnetic"
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
              }}
            >
              DOWNLOAD CV
            </span>
          </MagneticButton>

          <MagneticButton href="[KUSHAGRA_GITHUB]" target="_blank" stiffness={260} damping={16}>
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
              }}
            >
              GITHUB ↗
            </span>
          </MagneticButton>
        </div>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 32 }}>
          <a
            href="[KUSHAGRA_LINKEDIN]"
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
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#00e5ff')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#334155')}
          >
            LINKEDIN
          </a>
          <a
            href="[KUSHAGRA_GITHUB]"
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
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#00e5ff')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#334155')}
          >
            GITHUB
          </a>
        </div>

        <div
          style={{
            width: '100%',
            height: 1,
            background: 'rgba(255,255,255,0.04)',
            margin: '64px 0 32px',
          }}
        />

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
