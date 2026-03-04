'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/lib/useLenis'
import Cursor from '@/components/Cursor'
import Nav from '@/components/Nav'
import HeroCanvas from '@/components/HeroCanvas'
import About from '@/components/About'
import BentoGrid from '@/components/BentoGrid'
import Vision from '@/components/Vision'
import Timeline from '@/components/Timeline'
import Contact from '@/components/Contact'

export default function Home() {
  useLenis()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <>
      <Cursor />
      <Nav />
      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: 120 }}>
        <HeroCanvas />
        <About />
        <BentoGrid />
        <Vision />
        <Timeline />
        <Contact />
      </main>
    </>
  )
}
