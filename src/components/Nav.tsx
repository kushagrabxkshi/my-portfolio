'use client'

import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'VISION', href: '#vision' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 64,
        padding: '0 7vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.96), transparent)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <a
        href="/"
        data-cursor="hover"
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 900,
          fontSize: 14,
          color: '#00e5ff',
          letterSpacing: '0.5em',
          textDecoration: 'none',
        }}
      >
        KB
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            data-cursor="hover"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#4a5568',
              letterSpacing: '0.3em',
              textDecoration: 'none',
              transition: 'color 200ms',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = '#f0f4f8')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = '#4a5568')
            }
          >
            {link.label}
          </a>
        ))}

        <MagneticButton href="#contact">
          <span
            data-cursor="magnetic"
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #0891b2)',
              color: '#050505',
              padding: '9px 24px',
              borderRadius: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.2em',
              display: 'inline-block',
            }}
          >
            HIRE ME →
          </span>
        </MagneticButton>
      </div>
    </motion.nav>
  )
}
