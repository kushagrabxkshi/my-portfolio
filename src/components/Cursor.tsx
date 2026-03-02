'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'magnetic'>('default')
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement
      const cursorAttr = target.closest('[data-cursor]')
      if (cursorAttr) {
        const val = cursorAttr.getAttribute('data-cursor')
        if (val === 'hover') setCursorState('hover')
        else if (val === 'magnetic') setCursorState('magnetic')
      } else {
        setCursorState('default')
      }
    }

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const tickerCallback = () => {
      if (!dotRef.current || !ringRef.current) return
      dotRef.current.style.left = mouseX + 'px'
      dotRef.current.style.top = mouseY + 'px'
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ringRef.current.style.left = ringX + 'px'
      ringRef.current.style.top = ringY + 'px'
    }

    gsap.ticker.add(tickerCallback)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  const dotStyle: React.CSSProperties = {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#00e5ff',
    mixBlendMode: 'difference',
    position: 'fixed',
    zIndex: 9999,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    opacity: cursorState === 'hover' || cursorState === 'magnetic' ? 0 : 1,
    transition: 'opacity 200ms',
  }

  const ringSize = cursorState === 'hover' ? 56 : 38
  const ringStyle: React.CSSProperties = {
    width: ringSize,
    height: ringSize,
    borderRadius: '50%',
    border: `1px solid ${
      cursorState === 'hover' ? 'rgba(0,229,255,0.9)' : 'rgba(0, 229, 255, 0.4)'
    }`,
    position: 'fixed',
    zIndex: 9998,
    pointerEvents: 'none',
    transform: `translate(-50%, -50%) ${isPressed ? 'scale(0.8)' : 'scale(1)'}`,
    opacity: cursorState === 'magnetic' ? 0 : 1,
    transition:
      'width 200ms, height 200ms, border-color 200ms, opacity 200ms, transform 100ms',
  }

  return (
    <>
      <div ref={dotRef} style={dotStyle} />
      <div ref={ringRef} style={ringStyle} />
    </>
  )
}
