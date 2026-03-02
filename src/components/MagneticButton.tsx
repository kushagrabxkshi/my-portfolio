'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  stiffness?: number
  damping?: number
  download?: boolean
  target?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  style,
  stiffness = 260,
  damping = 16,
  download,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        display: 'inline-block',
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {href ? (
        <a
          href={href}
          className={className}
          style={{ display: 'block', ...style }}
          download={download}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ) : (
        <button
          onClick={onClick}
          className={className}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'none',
            ...style,
          }}
        >
          {children}
        </button>
      )}
    </motion.div>
  )
}
