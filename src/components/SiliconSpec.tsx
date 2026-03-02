'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const animationLines: { text: string; color: string; pause: number }[] = [
  { text: '> SiliconSpec AI v0.1 initializing...', color: '#00ff88', pause: 400 },
  { text: '> Parsing RTL: alu_4bit.v', color: '#00ff88', pause: 200 },
  { text: '> Detecting module ports: ✓', color: '#00ff88', pause: 200 },
  { text: '> [██████████] Analyzing... 100%', color: '#00ff88', pause: 400 },
  { text: '> Generating testbench...', color: '#00ff88', pause: 300 },
  { text: '', color: '', pause: 0 },
  { text: 'module alu_tb;', color: '#f0f4f8', pause: 0 },
  { text: '  reg [3:0] a, b;', color: '#f0f4f8', pause: 0 },
  { text: '  reg [1:0] op;', color: '#f0f4f8', pause: 0 },
  { text: '  wire [3:0] result;', color: '#f0f4f8', pause: 0 },
  { text: '', color: '', pause: 0 },
  { text: '  alu_4bit dut(.a(a),.b(b),', color: '#f0f4f8', pause: 0 },
  { text: '    .op(op),.result(result));', color: '#f0f4f8', pause: 0 },
  { text: '', color: '', pause: 0 },
  { text: "> ⚠ Bug detected: op=2'b01,", color: '#f59e0b', pause: 0 },
  { text: '  a < b → underflow unhandled', color: '#f59e0b', pause: 0 },
  { text: '> Coverage: 94.3%', color: '#00e5ff', pause: 0 },
  { text: '> Testbench exported. ✓', color: '#00ff88', pause: 0 },
]

function AnimatedTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color: string }[]>([])
  const animatingRef = useRef(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const runAnimation = useCallback(async () => {
    while (animatingRef.current) {
      setDisplayedLines([])

      for (let lineIdx = 0; lineIdx < animationLines.length; lineIdx++) {
        if (!animatingRef.current) return
        const line = animationLines[lineIdx]

        if (line.text === '') {
          setDisplayedLines((prev) => [...prev, { text: '', color: '' }])
          continue
        }

        for (let charIdx = 0; charIdx <= line.text.length; charIdx++) {
          if (!animatingRef.current) return
          const partial = line.text.slice(0, charIdx)
          setDisplayedLines((prev) => {
            const newLines = [...prev]
            if (newLines.length > lineIdx) {
              newLines[lineIdx] = { text: partial, color: line.color }
            } else {
              newLines.push({ text: partial, color: line.color })
            }
            return newLines
          })
          await new Promise((r) => setTimeout(r, 18))
        }

        if (line.pause > 0) {
          await new Promise((r) => setTimeout(r, line.pause))
        }
      }

      await new Promise((r) => setTimeout(r, 3000))
    }
  }, [])

  useEffect(() => {
    animatingRef.current = true
    runAnimation()
    return () => {
      animatingRef.current = false
    }
  }, [runAnimation])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines])

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        background: '#020d0d',
        borderRadius: 8,
        overflow: 'hidden',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10.5px',
        padding: 16,
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ff5f57',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ffbd2e',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#28c840',
            display: 'inline-block',
          }}
        />
        <span style={{ color: '#334155', marginLeft: 8, fontSize: 10 }}>SiliconSpec AI v0.1</span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00ff88',
            display: 'inline-block',
            marginLeft: 'auto',
            animation: 'pulse-dot 1.5s infinite',
          }}
        />
      </div>

      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, flex: 1 }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={{ color: line.color, minHeight: '1.6em' }}>
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  )
}

export default function SiliconSpec() {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ position: 'relative', width: 8, height: 8 }}>
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#00ff88',
              animation: 'pulse-dot 1.5s infinite',
            }}
          />
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: '#00ff88',
            }}
          />
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#00ff88',
            letterSpacing: '0.4em',
          }}
        >
          ACTIVE DEVELOPMENT
        </span>
      </div>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: '#4a5568',
          letterSpacing: '0.3em',
        }}
      >
        AI × RTL × VERIFICATION ENGINEERING
      </p>

      <h3
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: '#f0f4f8',
        }}
      >
        SiliconSpec — AI Auto-Verification Engine
      </h3>

      <div style={{ display: 'flex', gap: 12, flex: 1, minHeight: 200 }}>
        {/* LEFT PANE - Static Verilog */}
        <div
          style={{
            flex: 1,
            background: '#030310',
            borderRadius: 8,
            overflow: 'hidden',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10.5px',
            padding: 16,
            minHeight: 200,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#ff5f57',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#ffbd2e',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#28c840',
                display: 'inline-block',
              }}
            />
            <span style={{ color: '#334155', marginLeft: 8, fontSize: 10 }}>alu_4bit.v</span>
          </div>

          <pre style={{ margin: 0, lineHeight: 1.6 }}>
            <span style={{ color: '#7c3aed' }}>module</span>{' '}
            <span style={{ color: '#f0f4f8' }}>alu_4bit</span>
            {' ('}
            {'\n'}
            {'  '}
            <span style={{ color: '#7c3aed' }}>input</span>
            {'  '}
            <span style={{ color: '#00e5ff' }}>[3:0]</span>{' '}
            <span style={{ color: '#f0f4f8' }}>a</span>
            {', '}
            <span style={{ color: '#f0f4f8' }}>b</span>
            {','}
            {'\n'}
            {'  '}
            <span style={{ color: '#7c3aed' }}>input</span>
            {'  '}
            <span style={{ color: '#00e5ff' }}>[1:0]</span>{' '}
            <span style={{ color: '#f0f4f8' }}>op</span>
            {','}
            {'\n'}
            {'  '}
            <span style={{ color: '#7c3aed' }}>output</span>{' '}
            <span style={{ color: '#7c3aed' }}>reg</span>{' '}
            <span style={{ color: '#00e5ff' }}>[3:0]</span>{' '}
            <span style={{ color: '#f0f4f8' }}>result</span>
            {'\n'}
            {');'}
            {'\n'}
            <span style={{ color: '#7c3aed' }}>always</span>
            {' @(*) '}
            <span style={{ color: '#7c3aed' }}>begin</span>
            {'\n'}
            {'  '}
            <span style={{ color: '#7c3aed' }}>case</span>
            {'('}
            <span style={{ color: '#f0f4f8' }}>op</span>
            {')'}
            {'\n'}
            {'    '}
            <span style={{ color: '#f59e0b' }}>2&apos;b00</span>
            {': '}
            <span style={{ color: '#f0f4f8' }}>result</span>{' '}
            <span style={{ color: '#00ff88' }}>=</span>{' '}
            <span style={{ color: '#f0f4f8' }}>a</span>{' '}
            <span style={{ color: '#00ff88' }}>+</span>{' '}
            <span style={{ color: '#f0f4f8' }}>b</span>
            {';'}
            {'\n'}
            {'    '}
            <span style={{ color: '#f59e0b' }}>2&apos;b01</span>
            {': '}
            <span style={{ color: '#f0f4f8' }}>result</span>{' '}
            <span style={{ color: '#00ff88' }}>=</span>{' '}
            <span style={{ color: '#f0f4f8' }}>a</span>{' '}
            <span style={{ color: '#00ff88' }}>-</span>{' '}
            <span style={{ color: '#f0f4f8' }}>b</span>
            {';'}
            {'\n'}
            {'    '}
            <span style={{ color: '#f59e0b' }}>2&apos;b10</span>
            {': '}
            <span style={{ color: '#f0f4f8' }}>result</span>{' '}
            <span style={{ color: '#00ff88' }}>=</span>{' '}
            <span style={{ color: '#f0f4f8' }}>a</span>{' '}
            <span style={{ color: '#00ff88' }}>&amp;</span>{' '}
            <span style={{ color: '#f0f4f8' }}>b</span>
            {';'}
            {'\n'}
            {'    '}
            <span style={{ color: '#f59e0b' }}>2&apos;b11</span>
            {': '}
            <span style={{ color: '#f0f4f8' }}>result</span>{' '}
            <span style={{ color: '#00ff88' }}>=</span>{' '}
            <span style={{ color: '#f0f4f8' }}>a</span>{' '}
            <span style={{ color: '#00ff88' }}>|</span>{' '}
            <span style={{ color: '#f0f4f8' }}>b</span>
            {';'}
            {'\n'}
            {'  '}
            <span style={{ color: '#7c3aed' }}>endcase</span>
            {'\n'}
            <span style={{ color: '#7c3aed' }}>end</span>
            {'\n'}
            <span style={{ color: '#7c3aed' }}>endmodule</span>
          </pre>
        </div>

        {/* RIGHT PANE - Animated */}
        <AnimatedTerminal />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: '#4a5568',
        }}
      >
        <span>70% verification time target</span>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
        <span>Auto-generates SV testbenches</span>
        <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
        <span>Pre-simulation bug detection</span>
      </div>
    </div>
  )
}
