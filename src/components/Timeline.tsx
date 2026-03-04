'use client'

import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    year: '2024',
    color: '#00e5ff',
    text: 'Started B.E. Electronics Engineering · VLSI Specialization',
  },
  {
    year: '2024',
    color: '#7c3aed',
    text: 'First RTL designs — ALU, counters, UART in Verilog/SystemVerilog',
  },
  {
    year: '2025',
    color: '#00ff88',
    text: 'UVM Verification + FPGA Prototyping on Xilinx boards',
  },
  {
    year: '2025',
    color: '#f59e0b',
    text: 'SiliconSpec concept born — AI meets RTL verification',
  },
  {
    year: 'NOW',
    color: '#ec4899',
    text: 'Actively seeking internship at a world-class semiconductor company',
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const traceRef = useRef<SVGPathElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const [sectionHeight, setSectionHeight] = useState(600)

  useLayoutEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.getBoundingClientRect().height)
    }
  }, [])

  const nodeSpacing = sectionHeight / (events.length + 1)
  const nodePositions = events.map((_, i) => (i + 1) * nodeSpacing)

  const buildPath = () => {
    let d = `M 20 0`
    for (const y of nodePositions) {
      d += ` L 20 ${y - 12}`
      d += ` L 28 ${y - 4}`
      d += ` L 28 ${y + 4}`
      d += ` L 20 ${y + 12}`
    }
    d += ` L 20 ${sectionHeight}`
    return d
  }

  useEffect(() => {
    if (!traceRef.current || !sectionRef.current) return

    const pathLength = traceRef.current.getTotalLength()

    gsap.set(traceRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })

    const ctx = gsap.context(() => {
      gsap.to(traceRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
      })

      nodesRef.current.forEach((node, i) => {
        if (!node) return
        ScrollTrigger.create({
          trigger: node,
          start: 'top 70%',
          onEnter: () => {
            const outerCircle = node.querySelector('.node-outer') as HTMLElement
            const innerDot = node.querySelector('.node-inner') as HTMLElement
            if (outerCircle) {
              outerCircle.style.stroke = events[i].color
              outerCircle.style.filter = `drop-shadow(0 0 6px ${events[i].color})`
            }
            if (innerDot) {
              innerDot.style.fill = events[i].color
            }
          },
        })
      })
    })

    return () => ctx.revert()
  }, [sectionHeight])

  return (
    <section style={{ padding: '0 8vw' }}>
      <div ref={sectionRef} style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#00e5ff',
            letterSpacing: '0.4em',
            marginBottom: 16,
          }}
        >
          JOURNEY
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
          The Timeline
        </h2>

        <div style={{ position: 'relative', minHeight: sectionHeight }}>
          <svg
            viewBox={`0 0 40 ${sectionHeight}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 40,
              height: sectionHeight,
            }}
          >
            <path d={buildPath()} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
            <path
              ref={traceRef}
              d={buildPath()}
              fill="none"
              stroke="#00e5ff"
              strokeWidth="2"
              opacity="0.4"
            />
          </svg>

          {events.map((event, i) => (
            <div
              key={i}
              ref={(el) => {
                nodesRef.current[i] = el
              }}
              style={{
                position: 'absolute',
                top: nodePositions[i] - 20,
                left: 0,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 24,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
                <circle
                  className="node-outer"
                  cx="20"
                  cy="20"
                  r="10"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  style={{ transition: 'stroke 400ms, filter 400ms' }}
                />
                <circle
                  className="node-inner"
                  cx="20"
                  cy="20"
                  r="4"
                  fill="#1e293b"
                  style={{ transition: 'fill 400ms' }}
                />
              </svg>

              <div style={{ paddingTop: 4 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: event.color,
                    letterSpacing: '0.3em',
                    display: 'block',
                  }}
                >
                  {event.year}
                </span>
                <div
                  style={{
                    width: 1,
                    height: 32,
                    background: event.color,
                    opacity: 0.3,
                    margin: '8px 0',
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: '#4a5568',
                    lineHeight: 1.7,
                    maxWidth: 400,
                  }}
                >
                  {event.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
