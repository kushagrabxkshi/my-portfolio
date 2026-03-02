'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const skillRows = [
  {
    color: '#00e5ff',
    label: 'HARDWARE',
    pills: ['Verilog', 'SystemVerilog', 'UVM', 'Formal Verification', 'FPGA'],
  },
  {
    color: '#7c3aed',
    label: 'AI & SOFTWARE',
    pills: ['Python', 'C/C++', 'MATLAB/Simulink', 'TensorFlow', 'PyTorch'],
  },
  {
    color: '#00ff88',
    label: 'EDA TOOLS',
    pills: ['AMD Vivado', 'ModelSim', 'Quartus', 'Git', 'Linux'],
  },
]

function Pill({ text, accent }: { text: string; accent: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      data-cursor="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        borderColor: isHovered ? `${accent}73` : 'rgba(255,255,255,0.06)',
        color: isHovered ? accent : '#4a5568',
        backgroundColor: isHovered ? `${accent}14` : 'rgba(255,255,255,0.025)',
        rotateX: isHovered ? 6 : 0,
        rotateY: isHovered ? -8 : 0,
      }}
      transition={{ duration: 0.2 }}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        padding: '6px 14px',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'inline-block',
        backdropFilter: 'blur(24px) saturate(180%)',
        perspective: 600,
      }}
    >
      {text}
    </motion.span>
  )
}

export default function About() {
  return (
    <section style={{ padding: '120px 8vw' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 80,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
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
            ABOUT
          </p>
          <h2
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              lineHeight: 1.15,
              marginBottom: 32,
            }}
          >
            Where Silicon Meets Intelligence
          </h2>

          <div
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: '#4a5568',
              lineHeight: 1.9,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <p>
              I&apos;m Kushagra — an Electronics Engineering student with hands-on roots in RTL
              design, UVM verification, and FPGA prototyping. My focus is the intersection of
              hardware and intelligence: making silicon smarter.
            </p>
            <p>
              I&apos;m currently building{' '}
              <span style={{ color: '#00e5ff' }}>SiliconSpec</span> — an AI-powered tool targeting
              the <span style={{ color: '#00e5ff' }}>70%</span> of chip design time consumed by
              manual RTL verification. I&apos;m the person who asks why verification still requires
              this much human effort, then builds the answer.
            </p>
            <p>
              I&apos;m looking for an internship where I can learn at the speed of silicon and
              contribute from day one.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {skillRows.map((row) => (
            <div key={row.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: row.color,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: row.color,
                    letterSpacing: '0.3em',
                  }}
                >
                  {row.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {row.pills.map((pill) => (
                  <Pill key={pill} text={pill} accent={row.color} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
