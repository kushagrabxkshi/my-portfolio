'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShaderBackground from './ShaderBackground'
import HeroUI from './HeroUI'

gsap.registerPlugin(ScrollTrigger)

function SiliconWaferScene({
  isRendering,
  shaderRef,
}: {
  isRendering: React.MutableRefObject<boolean>
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>
}) {
  const waferGroupRef = useRef<THREE.Group>(null!)
  const cyanLightRef = useRef<THREE.PointLight>(null!)
  const particlesRef = useRef<THREE.Points>(null!)

  const circuitLines = useMemo(() => {
    const positions: number[] = []
    const spacing = 0.38
    const extent = 2.8
    const radiusSq = 2.85 * 2.85

    for (let x = -extent; x <= extent; x += spacing) {
      for (let z = -extent; z <= extent; z += spacing) {
        if (x + spacing <= extent) {
          const x1 = x, z1 = z, x2 = x + spacing, z2 = z
          if (x1 * x1 + z1 * z1 < radiusSq && x2 * x2 + z2 * z2 < radiusSq) {
            positions.push(x1, 0.055, z1, x2, 0.055, z2)
          }
        }
        if (z + spacing <= extent) {
          const x1 = x, z1 = z, x2 = x, z2 = z + spacing
          if (x1 * x1 + z1 * z1 < radiusSq && x2 * x2 + z2 * z2 < radiusSq) {
            positions.push(x1, 0.055, z1, x2, 0.055, z2)
          }
        }
      }
    }
    return new Float32Array(positions)
  }, [])

  const junctionPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const spacing = 0.76
    const extent = 2.8
    const radiusSq = 2.6 * 2.6

    for (let x = -extent; x <= extent; x += spacing) {
      for (let z = -extent; z <= extent; z += spacing) {
        if (x * x + z * z < radiusSq) {
          positions.push([x, 0.055, z])
        }
      }
    }
    return positions
  }, [])

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 2.5 + Math.random() * 2.5
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const { pointer, clock } = state
    if (!isRendering.current) return

    if (waferGroupRef.current) {
      const rot = waferGroupRef.current.rotation
      const tx = pointer.y * 0.28 - 0.52
      const ty = rot.y + 0.003
      const factor = Math.min(0.06 * delta * 60, 1)
      rot.x += (tx - rot.x) * factor
      rot.y += (ty - rot.y) * factor
      rot.z += (0 - rot.z) * factor
    }

    if (cyanLightRef.current) {
      cyanLightRef.current.position.x +=
        (pointer.x * 7 - cyanLightRef.current.position.x) * 0.05
      cyanLightRef.current.position.y +=
        (pointer.y * 5 + 6 - cyanLightRef.current.position.y) * 0.05
    }

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime
      shaderRef.current.uniforms.uMouse.value.set(
        (pointer.x + 1) / 2,
        (pointer.y + 1) / 2
      )
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0006
    }
  })

  const circuitLineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(circuitLines, 3))
    return geom
  }, [circuitLines])

  const particleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    return geom
  }, [particlePositions])

  return (
    <>
      <ShaderBackground shaderRef={shaderRef} />

      <ambientLight intensity={0.2} />
      <pointLight
        ref={cyanLightRef}
        color="#00e5ff"
        intensity={6}
        distance={22}
        position={[5, 6, 5]}
      />
      <pointLight color="#7c3aed" intensity={3.5} distance={18} position={[-5, 4, 3]} />

      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.08}>
        <group ref={waferGroupRef} rotation={[-0.52, 0, 0]}>
          <mesh renderOrder={0}>
            <cylinderGeometry args={[3.0, 3.0, 0.09, 128, 1]} />
            <meshPhysicalMaterial
              color="#0a0a1a"
              metalness={0.98}
              roughness={0.07}
              clearcoat={1.0}
              clearcoatRoughness={0.04}
              envMapIntensity={3.0}
              reflectivity={1.0}
            />
          </mesh>

          <lineSegments geometry={circuitLineGeometry}>
            <lineBasicMaterial color="#00e5ff" opacity={0.15} transparent />
          </lineSegments>

          {junctionPositions.map((pos, i) => (
            <mesh key={i} position={pos}>
              <sphereGeometry args={[0.038, 8, 8]} />
              <meshBasicMaterial color="#00e5ff" />
            </mesh>
          ))}

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.05, 0.055, 16, 96]} />
            <meshBasicMaterial color="#7c3aed" opacity={0.65} transparent />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.028, 12, 64]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.35} transparent />
          </mesh>
        </group>
      </Float>

      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial color="#00e5ff" size={0.035} opacity={0.45} transparent sizeAttenuation />
      </points>

      <Environment preset="city" background={false} />

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.55}
          luminanceSmoothing={0.3}
          intensity={0.75}
          mipmapBlur
        />
        <DepthOfField focusDistance={0.018} focalLength={0.045} bokehScale={2.8} />
        <Noise opacity={0.038} blendFunction={BlendFunction.OVERLAY} />
        <Vignette offset={0.28} darkness={0.72} />
        <ChromaticAberration
          offset={new THREE.Vector2(0.00025, 0.00025)}
          radialModulation={false}
          modulationOffset={0.0}
        />
      </EffectComposer>
    </>
  )
}

export default function HeroCanvas() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const isRendering = useRef(true)
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRendering.current = entry.isIntersecting
        const canvas = heroRef.current?.querySelector('canvas')
        if (canvas) {
          canvas.style.visibility = entry.isIntersecting ? 'visible' : 'hidden'
        }
      },
      { threshold: 0.0, rootMargin: '100px' }
    )
    observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!canvasWrapperRef.current || !heroSectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(canvasWrapperRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={heroSectionRef}
      style={{ position: 'relative', width: '100%', height: '100vh' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#050505',
          zIndex: 0,
        }}
      />
      <div ref={heroRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div ref={canvasWrapperRef} style={{ position: 'absolute', inset: 0 }}>
          {isMobile ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/wafer-hero.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#050505',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(#050505, #000000)',
                  opacity: 0.94,
                }}
              />
            </div>
          ) : (
            <Canvas
              camera={{ position: [0, 1.8, 7], fov: 52 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              dpr={[1, 1.5]}
              style={{ position: 'absolute', inset: 0 }}
            >
              <SiliconWaferScene isRendering={isRendering} shaderRef={shaderRef} />
            </Canvas>
          )}
        </div>
      </div>
      <HeroUI />
    </section>
  )
}
