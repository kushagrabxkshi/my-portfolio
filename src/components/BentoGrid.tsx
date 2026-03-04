'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiliconSpec from './SiliconSpec'

gsap.registerPlugin(ScrollTrigger)

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function BentoCard({
  children,
  accent,
  style,
}: {
  children: React.ReactNode
  accent: string
  style?: React.CSSProperties
}) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!innerRef.current) return
    const st = ScrollTrigger.create({
      trigger: innerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity() / 1000
        gsap.to(innerRef.current, {
          skewY: v * 0.012,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <motion.div variants={item} style={style}>
      <div
        ref={innerRef}
        className="glass"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          willChange: 'transform',
          clipPath: `polygon(
            0% 12px, 12px 0%,
            calc(100% - 12px) 0%, 100% 12px,
            100% calc(100% - 12px), calc(100% - 12px) 100%,
            12px 100%, 0% calc(100% - 12px)
          )`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="hover"
      >
        <motion.div
          animate={{
            clipPath: isHovered
              ? 'ellipse(130% 130% at 50% 50%)'
              : 'ellipse(0% 0% at 50% 50%)',
          }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(${accent}1e 0%, transparent 65%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
      </div>
    </motion.div>
  )
}

function AndGateSVG() {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4H20C28.8366 4 36 11.1634 36 20V20C36 24.4183 32.4183 28 28 28H4V4Z"
        stroke="#7c3aed"
        strokeWidth="2"
        fill="none"
      />
      <line x1="0" y1="12" x2="4" y2="12" stroke="#7c3aed" strokeWidth="2" />
      <line x1="0" y1="20" x2="4" y2="20" stroke="#7c3aed" strokeWidth="2" />
      <line x1="36" y1="16" x2="40" y2="16" stroke="#7c3aed" strokeWidth="2" />
    </svg>
  )
}

function FPGAGridSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={4 + c * 14}
            y={4 + r * 14}
            width="8"
            height="8"
            rx="1"
            stroke="#00ff88"
            strokeWidth="1.5"
            fill="none"
          />
        ))
      )}
      <line x1="12" y1="8" x2="18" y2="8" stroke="#00ff88" strokeWidth="1" />
      <line x1="26" y1="8" x2="32" y2="8" stroke="#00ff88" strokeWidth="1" />
      <line x1="12" y1="22" x2="18" y2="22" stroke="#00ff88" strokeWidth="1" />
      <line x1="8" y1="12" x2="8" y2="18" stroke="#00ff88" strokeWidth="1" />
      <line x1="22" y1="12" x2="22" y2="18" stroke="#00ff88" strokeWidth="1" />
    </svg>
  )
}

function NeuralSVG() {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="5" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="16" r="5" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="24" r="5" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
      <line x1="13" y1="10" x2="19" y2="14" stroke="#f59e0b" strokeWidth="1" />
      <line x1="29" y1="18" x2="35" y2="22" stroke="#f59e0b" strokeWidth="1" />
      <line x1="13" y1="8" x2="35" y2="24" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

export default function BentoGrid() {
  return (
    <section id="work" style={{ padding: '0 8vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#00e5ff',
            letterSpacing: '0.4em',
            marginBottom: 16,
          }}
        >
          THE ENGINE ROOM
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
          What I Build
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {/* CARD 1: SiliconSpec */}
          <BentoCard accent="#00e5ff" style={{ gridColumn: 'span 2', gridRow: 'span 2', minHeight: 380 }}>
            <SiliconSpec />
          </BentoCard>

          {/* CARD 2: RTL Design Suite */}
          <BentoCard accent="#7c3aed" style={{ minHeight: 200 }}>
            <div style={{ padding: 24 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#00e5ff',
                  letterSpacing: '0.3em',
                }}
              >
                COMING SOON
              </span>
              <div style={{ margin: '16px 0' }}>
                <AndGateSVG />
              </div>
              <h3
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#f0f4f8',
                  marginBottom: 8,
                }}
              >
                RTL Design Suite
              </h3>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 13,
                  color: '#4a5568',
                  lineHeight: 1.7,
                }}
              >
                4-bit ALU, UART controller, memory interfaces — SystemVerilog with full UVM
                testbench coverage.
              </p>
            </div>
          </BentoCard>

          {/* CARD 3: FPGA Prototyping Lab */}
          <BentoCard accent="#00ff88" style={{ minHeight: 200 }}>
            <div style={{ padding: 24 }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#00e5ff',
                  letterSpacing: '0.3em',
                }}
              >
                IN BUILD
              </span>
              <div style={{ margin: '16px 0' }}>
                <FPGAGridSVG />
              </div>
              <h3
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#f0f4f8',
                  marginBottom: 8,
                }}
              >
                FPGA Prototyping Lab
              </h3>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 13,
                  color: '#4a5568',
                  lineHeight: 1.7,
                }}
              >
                Real-time logic deployment on Xilinx hardware with timing constraint analysis and
                synthesis reports.
              </p>
            </div>
          </BentoCard>

          {/* CARD 4: Neural Net → Silicon */}
          <BentoCard accent="#f59e0b" style={{ gridColumn: 'span 3', minHeight: 160 }}>
            <div
              style={{
                padding: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <NeuralSVG />
                <div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#00e5ff',
                      letterSpacing: '0.3em',
                      display: 'block',
                      marginBottom: 8,
                    }}
                  >
                    RESEARCH
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      color: '#f0f4f8',
                    }}
                  >
                    Neural Net → Silicon
                  </h3>
                </div>
              </div>

              <div
                style={{
                  width: 1,
                  height: 60,
                  background: 'rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }}
              />

              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: 13,
                  color: '#4a5568',
                  lineHeight: 1.7,
                }}
              >
                Exploring HLS-based neural network acceleration — mapping ML inference to custom RTL
                datapaths for edge SoC deployment. Targeting sub-5ms inference on custom FPGA fabric.
              </p>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
