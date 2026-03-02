'use client'

import { motion } from 'framer-motion'

export default function Vision() {
  return (
    <section id="vision" style={{ padding: '120px 8vw' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'left' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            VISION
          </p>
          <h2
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              lineHeight: 1.15,
              marginBottom: 48,
            }}
          >
            The Problem I&apos;m Building to Solve
          </h2>

          <div
            className="glass"
            style={{
              border: '1px solid rgba(0,229,255,0.2)',
              display: 'grid',
              gridTemplateColumns: 'auto 1px 1fr',
              gap: 52,
              padding: '48px 56px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 900,
                  fontSize: 88,
                  color: '#00e5ff',
                  lineHeight: 1,
                }}
              >
                70%
              </div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#4a5568',
                  letterSpacing: '0.3em',
                  marginTop: 8,
                }}
              >
                OF CHIP DESIGN TIME
              </p>
            </div>

            <div
              style={{
                width: 1,
                height: 80,
                background: 'rgba(255,255,255,0.08)',
                alignSelf: 'center',
              }}
            />

            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: '#4a5568',
                lineHeight: 1.9,
                alignSelf: 'center',
              }}
            >
              Is consumed by <span style={{ color: '#f0f4f8' }}>verification</span> — hunting
              functional bugs in RTL code before tape-out. One escaped bug costs millions. The
              process is largely manual, repetitive, and slow.
            </p>
          </div>

          <div
            style={{
              marginTop: 48,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: '#4a5568',
              lineHeight: 1.9,
            }}
          >
            <p>
              SiliconSpec is my answer. An AI-powered verification assistant that reads RTL code,
              understands design intent, and auto-generates SystemVerilog testbenches — flagging
              functional bugs before a single simulation runs.
            </p>
            <p>
              Companies like Cadence and Synopsys are investing billions into AI for EDA. I&apos;m
              building toward that problem from first principles as a 2nd year student.
            </p>
            <p style={{ fontWeight: 700, fontSize: 17, color: '#00e5ff' }}>
              Because the best time to solve hard problems is right now.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
