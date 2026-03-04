'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

const phrases = [
  'Architecting the intersection of silicon and intelligence.',
  'Accelerating RTL. Automating verification.',
  'Designing the hardware that thinks.',
  'RTL Designer. FPGA Engineer. AI Tool Builder. Your next intern.',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex]

    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1))
        }, 55)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, 2400)
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(text.slice(0, -1))
        }, 28)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % phrases.length)
        }, 400)
      }
    }
  }, [text, phraseIndex, isDeleting])

  useEffect(() => {
    tick()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [tick])

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 14,
        color: '#00e5ff',
        height: 28,
        marginTop: 24,
      }}
    >
      {text}
      <span style={{ animation: 'blink 0.8s steps(1) infinite' }}>▮</span>
    </div>
  )
}

function WordReveal({
  word,
  index,
  style,
}: {
  word: string
  index: number
  style?: React.CSSProperties
}) {
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.3em', paddingBottom: '0.12em' }}>
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{
          ease: [0.22, 1, 0.36, 1],
          duration: 0.9,
          delay: index * 0.08,
        }}
        style={{ display: 'inline-block', ...style }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function HeroUI() {
  const line1Words = ['DESIGNING']
  const line2Words = ['THE', 'HARDWARE']
  const line3Words = ['THAT', 'THINKS.']

  let wordIndex = 0

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 8vw',
        paddingTop: 80,
        paddingBottom: '10vh',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: '#00e5ff',
          opacity: 0.75,
          letterSpacing: '0.5em',
          marginBottom: 20,
        }}
      >
        ▸ VLSI × AI × SILICON ENGINEERING
      </motion.p>

      <h1
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(52px, 8vw, 110px)',
          lineHeight: 1.06,
        }}
      >
        <div>
          {line1Words.map((word) => {
            const i = wordIndex++
            return <WordReveal key={word + i} word={word} index={i} style={{ color: '#f0f4f8' }} />
          })}
        </div>
        <div>
          {line2Words.map((word) => {
            const i = wordIndex++
            return (
              <WordReveal
                key={word + i}
                word={word}
                index={i}
                style={{
                  background: 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              />
            )
          })}
        </div>
        <div>
          {line3Words.map((word) => {
            const i = wordIndex++
            return <WordReveal key={word + i} word={word} index={i} style={{ color: '#f0f4f8' }} />
          })}
        </div>
      </h1>

      <Typewriter />

      <div style={{ display: 'flex', gap: 16, marginTop: 48, pointerEvents: 'auto' }}>
        <MagneticButton href="#work">
          <span
            data-cursor="magnetic"
            style={{
              background: 'linear-gradient(135deg, #00e5ff, #0891b2)',
              color: '#050505',
              padding: '15px 40px',
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.25em',
              display: 'inline-block',
            }}
          >
            VIEW WORK →
          </span>
        </MagneticButton>

        <MagneticButton href="/cv.pdf" download>
          <span
            data-cursor="magnetic"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0, 229, 255, 0.32)',
              color: '#00e5ff',
              padding: '15px 40px',
              borderRadius: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.25em',
              display: 'inline-block',
            }}
          >
            DOWNLOAD CV
          </span>
        </MagneticButton>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 1,
            height: 44,
            background: 'linear-gradient(rgba(0,229,255,0.5), transparent)',
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#1e293b',
            letterSpacing: '0.4em',
            marginTop: 8,
          }}
        >
          SCROLL
        </span>
      </div>

      <div style={{ position: 'absolute', bottom: 40, right: '8vw' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#1e293b',
            letterSpacing: '0.3em',
          }}
        >
          KUSHAGRA BAKSHI // 2026
        </span>
      </div>
    </div>
  )
}
