'use client'

import { useRef, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import {
  EffectComposer, Bloom, DepthOfField, Noise, Vignette, ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShaderBackground from './ShaderBackground'
import HeroUI from './HeroUI'

gsap.registerPlugin(ScrollTrigger)

// ─── Build die-cell InstancedMesh — BOTH top + bottom faces (1 draw call) ─────
function buildDieCellMesh(): THREE.InstancedMesh {
  const spacing = 0.76
  const cellSize = 0.67
  const extent = 2.8
  const radiusSq = 2.52 * 2.52

  const cells: [number, number][] = []
  for (let xi = -extent + spacing * 0.5; xi < extent; xi += spacing) {
    for (let zi = -extent + spacing * 0.5; zi < extent; zi += spacing) {
      if (xi * xi + zi * zi < radiusSq) cells.push([xi, zi])
    }
  }

  const geometry = new THREE.PlaneGeometry(cellSize, cellSize)
  const material = new THREE.MeshPhysicalMaterial({
    metalness: 0.95,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    vertexColors: true,
    side: THREE.DoubleSide,
  })

  // 2 instances per grid cell: top face + bottom face
  const totalInstances = cells.length * 2
  const mesh = new THREE.InstancedMesh(geometry, material, totalInstances)
  const dummy = new THREE.Object3D()
  const color = new THREE.Color()

  cells.forEach(([x, z], i) => {
    const angle = Math.atan2(z, x)
    const dist = Math.sqrt(x * x + z * z) / 2.52
    const hue = (((angle / (Math.PI * 2)) + 0.5) * 0.65 + dist * 0.35) % 1.0
    color.setHSL(hue, 0.90, 0.06)

    // Top face
    const topIdx = i * 2
    dummy.position.set(x, 0.051, z)
    dummy.rotation.set(-Math.PI / 2, 0, 0)
    dummy.scale.set(1, 1, 1)
    dummy.updateMatrix()
    mesh.setMatrixAt(topIdx, dummy.matrix)
    mesh.setColorAt(topIdx, color)

    // Bottom face
    const botIdx = i * 2 + 1
    dummy.position.set(x, -0.051, z)
    dummy.rotation.set(Math.PI / 2, 0, 0)
    dummy.scale.set(1, 1, 1)
    dummy.updateMatrix()
    mesh.setMatrixAt(botIdx, dummy.matrix)
    mesh.setColorAt(botIdx, color)
  })

  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  return mesh
}

// ─── Build line geometry on BOTH faces of the wafer ───────────────────────────
function buildDoubleFaceLines(
  gridSpacing: number,
  yTop: number,
  yBot: number,
  extent: number,
  radius: number,
): THREE.BufferGeometry {
  const radiusSq = radius * radius
  const pos: number[] = []

  for (let x = -extent; x <= extent; x += gridSpacing) {
    for (let z = -extent; z <= extent; z += gridSpacing) {
      if (x + gridSpacing <= extent) {
        const x2 = x + gridSpacing
        if (x * x + z * z < radiusSq && x2 * x2 + z * z < radiusSq) {
          pos.push(x, yTop, z, x2, yTop, z)
          pos.push(x, yBot, z, x2, yBot, z)
        }
      }
      if (z + gridSpacing <= extent) {
        const z2 = z + gridSpacing
        if (x * x + z * z < radiusSq && x * x + z2 * z2 < radiusSq) {
          pos.push(x, yTop, z, x, yTop, z2)
          pos.push(x, yBot, z, x, yBot, z2)
        }
      }
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3))
  return g
}

// ─── Main 3-D scene ────────────────────────────────────────────────────────────
function SiliconWaferScene({
  isRendering,
  shaderRef,
}: {
  isRendering: React.MutableRefObject<boolean>
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>
}) {
  // TWO groups: outer handles mouse rotation, inner is wrapped by Float
  // This is the key fix — Float only touches its direct child's transform,
  // so the outer group rotation is never overwritten.
  const outerGroupRef   = useRef<THREE.Group>(null!)
  const cyanLightRef    = useRef<THREE.PointLight>(null!)
  const goldLightRef    = useRef<THREE.PointLight>(null!)
  const particlesRef    = useRef<THREE.Points>(null!)

  // ── Die cells: ~33 iridescent colored planes (InstancedMesh = 1 draw call) ──
  const dieCellMesh = useMemo(() => buildDieCellMesh(), [])

  // ── Die boundary scribe lines (gold) — BOTH faces ──────────────────────────
  const dieGridGeometry = useMemo(
    () => buildDoubleFaceLines(0.76, 0.057, -0.057, 2.8, 2.85),
    [],
  )

  // ── Fine internal circuit traces — BOTH faces ─────────────────────────────
  const fineTraceGeometry = useMemo(
    () => buildDoubleFaceLines(0.19, 0.054, -0.054, 2.8, 2.85),
    [],
  )

  // ── Die corner junctions ─────────────────────────────────────────────────
  const dieJunctions = useMemo(() => {
    const junctions: [number, number, number][] = []
    const sp = 0.76, ex = 2.8, rSq = 2.6 * 2.6
    for (let x = -ex; x <= ex; x += sp)
      for (let z = -ex; z <= ex; z += sp)
        if (x*x + z*z < rSq) junctions.push([x, 0.059, z])
    return junctions
  }, [])

  // ── Floating particles ────────────────────────────────────────────────────
  const particleGeometry = useMemo(() => {
    const arr = new Float32Array(160 * 3)
    for (let i = 0; i < 160; i++) {
      const theta = Math.random() * Math.PI * 2
      const r = 2.5 + Math.random() * 2.5
      arr[i*3]   = Math.cos(theta) * r
      arr[i*3+1] = (Math.random() - 0.5) * 3
      arr[i*3+2] = Math.sin(theta) * r
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  // ── Animation loop ────────────────────────────────────────────────────────
  useFrame((state, delta) => {
    const { pointer, clock } = state
    if (!isRendering.current) return

    // Full 360° 3D mouse parallax on OUTER group (Float never touches this)
    if (outerGroupRef.current) {
      const rot    = outerGroupRef.current.rotation
      const targetX = pointer.y * 0.38 - 0.52   // tilt toward/away (+ base lean)
      const targetY = pointer.x * 0.42           // left/right rotation
      const factor  = Math.min(delta * 3.2, 0.14) // smooth but responsive
      rot.x += (targetX - rot.x) * factor
      rot.y += (targetY - rot.y) * factor
    }

    // Cyan light follows mouse
    if (cyanLightRef.current) {
      cyanLightRef.current.position.x += (pointer.x * 7    - cyanLightRef.current.position.x) * 0.05
      cyanLightRef.current.position.y += (pointer.y * 5 + 6 - cyanLightRef.current.position.y) * 0.05
    }

    // Gold light counter-tracks → die cells shimmer with colour as you move
    if (goldLightRef.current) {
      goldLightRef.current.position.x += (-pointer.x * 5 + 2 - goldLightRef.current.position.x) * 0.04
      goldLightRef.current.position.y += (-pointer.y * 4 - 2 - goldLightRef.current.position.y) * 0.04
    }

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime
      shaderRef.current.uniforms.uMouse.value.set((pointer.x + 1) / 2, (pointer.y + 1) / 2)
    }

    if (particlesRef.current) particlesRef.current.rotation.y += 0.0005
  })

  return (
    <>
      <ShaderBackground shaderRef={shaderRef} />

      <ambientLight intensity={0.14} />
      {/* Cyan — follows mouse */}
      <pointLight ref={cyanLightRef} color="#00e5ff" intensity={5}   distance={22} position={[5,  6, 5]} />
      {/* Purple fill */}
      <pointLight                    color="#7c3aed" intensity={3}   distance={18} position={[-5, 4, 3]} />
      {/* Gold — counter-tracks, makes die cells shimmer */}
      <pointLight ref={goldLightRef} color="#D4AF37" intensity={3.5} distance={16} position={[3, -3, 4]} />
      {/* Pink accent — adds magenta to the iridescent mix */}
      <pointLight                    color="#ec4899" intensity={1.5} distance={12} position={[0,  5,-3]} />

      {/* ─── OUTER GROUP: mouse-driven rotation only ─────────────────────────
          Float is INSIDE this group, so it cannot overwrite our rotation.      */}
      <group ref={outerGroupRef} rotation={[-0.52, 0, 0]}>

        {/* ─── INNER Float: gentle organic bob & micro-rotation ─────────────── */}
        <Float speed={0.5} rotationIntensity={0.03} floatIntensity={0.09}>
          <group>

            {/* Main wafer disk — iridescence simulates real silicon-oxide thin film */}
            <mesh renderOrder={0}>
              <cylinderGeometry args={[3.0, 3.0, 0.09, 128, 1]} />
              <meshPhysicalMaterial
                color="#06061a"
                metalness={0.97}
                roughness={0.06}
                clearcoat={1.0}
                clearcoatRoughness={0.03}
                envMapIntensity={4.0}
                reflectivity={1.0}
                iridescence={1.0}
                iridescenceIOR={2.33}
                iridescenceThicknessRange={[150, 600]}
              />
            </mesh>

            {/* Die cells: ~33 colored metallic planes (1 draw call via InstancedMesh) */}
            <primitive object={dieCellMesh} />

            {/* Fine internal routing traces (sub-die level) */}
            <lineSegments geometry={fineTraceGeometry}>
              <lineBasicMaterial color="#B8860B" opacity={0.09} transparent />
            </lineSegments>

            {/* Die boundary scribe lines */}
            <lineSegments geometry={dieGridGeometry}>
              <lineBasicMaterial color="#D4AF37" opacity={0.55} transparent />
            </lineSegments>

            {/* Die corner junction spheres */}
            {dieJunctions.map((pos, i) => (
              <mesh key={i} position={pos}>
                <sphereGeometry args={[0.038, 6, 6]} />
                <meshBasicMaterial color="#D4AF37" />
              </mesh>
            ))}

            {/* Outer beveled edge ring (gold) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[3.05, 0.055, 16, 96]} />
              <meshBasicMaterial color="#D4AF37" opacity={0.72} transparent />
            </mesh>

            {/* Inner accent ring (cyan) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.52, 0.022, 12, 64]} />
              <meshBasicMaterial color="#00e5ff" opacity={0.28} transparent />
            </mesh>

            {/* Mid ring (faint gold) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[2.28, 0.016, 10, 64]} />
              <meshBasicMaterial color="#D4AF37" opacity={0.20} transparent />
            </mesh>

            {/* Orientation notch — every real silicon wafer has this alignment flat */}
            <mesh position={[0, 0.06, -2.97]}>
              <boxGeometry args={[0.30, 0.05, 0.12]} />
              <meshBasicMaterial color="#D4AF37" opacity={0.80} transparent />
            </mesh>
            <mesh position={[-0.26, 0.06, -2.94]}>
              <boxGeometry args={[0.05, 0.04, 0.07]} />
              <meshBasicMaterial color="#D4AF37" opacity={0.45} transparent />
            </mesh>
            <mesh position={[0.26, 0.06, -2.94]}>
              <boxGeometry args={[0.05, 0.04, 0.07]} />
              <meshBasicMaterial color="#D4AF37" opacity={0.45} transparent />
            </mesh>

          </group>
        </Float>
      </group>

      {/* Ambient particles */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial color="#D4AF37" size={0.030} opacity={0.28} transparent sizeAttenuation />
      </points>

      <Environment preset="city" background={false} />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.3} intensity={0.9} mipmapBlur />
        <DepthOfField focusDistance={0.018} focalLength={0.045} bokehScale={2.8} />
        <Noise opacity={0.034} blendFunction={BlendFunction.OVERLAY} />
        <Vignette offset={0.28} darkness={0.72} />
        <ChromaticAberration
          offset={new THREE.Vector2(0.00026, 0.00026)}
          radialModulation={false}
          modulationOffset={0.0}
        />
      </EffectComposer>
    </>
  )
}

// ─── HeroCanvas (host component) ──────────────────────────────────────────────
export default function HeroCanvas() {
  const heroRef         = useRef<HTMLDivElement>(null)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const heroSectionRef  = useRef<HTMLElement>(null)
  const isRendering     = useRef(true)
  const shaderRef       = useRef<THREE.ShaderMaterial | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Gyroscope: smoothed via ref + direct DOM mutation (no React re-renders)
  const gyroSmooth = useRef({ x: 0, y: 0 })
  const mobileImageRef = useRef<HTMLDivElement>(null)

  // ── Mobile detection ────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Gyroscope parallax for the mobile static image ──────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId: number
    let latestBeta = 30
    let latestGamma = 0
    let active = true

    const handleOrientation = (e: DeviceOrientationEvent) => {
      latestBeta  = e.beta  ?? 30
      latestGamma = e.gamma ?? 0
    }

    // Smooth gyro in rAF — apply directly to DOM (no setState at 60hz)
    const tick = () => {
      if (!active) return
      const rawX = (latestBeta  - 30) / 60
      const rawY = latestGamma / 45
      gyroSmooth.current.x += (rawX - gyroSmooth.current.x) * 0.08
      gyroSmooth.current.y += (rawY - gyroSmooth.current.y) * 0.08

      if (mobileImageRef.current) {
        const rx = -gyroSmooth.current.x * 14
        const ry = gyroSmooth.current.y * 14
        mobileImageRef.current.style.transform =
          `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.09)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const attach = () => {
      window.addEventListener('deviceorientation', handleOrientation, true)
      rafId = requestAnimationFrame(tick)
    }

    // iOS 13+ requires a user-gesture permission request
    type DOEWithPerm = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> }
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof (DeviceOrientationEvent as DOEWithPerm).requestPermission === 'function') {
      const req = () => {
        (DeviceOrientationEvent as DOEWithPerm).requestPermission!()
          .then((perm: string) => { if (perm === 'granted') attach() })
          .catch(() => { /* gyroscope unavailable */ })
      }
      document.addEventListener('touchstart', req, { once: true })
    } else {
      attach()
    }

    return () => {
      active = false
      window.removeEventListener('deviceorientation', handleOrientation, true)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Pause rendering when off-screen ────────────────────────────────────
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRendering.current = entry.isIntersecting
        const canvas = el.querySelector('canvas')
        if (canvas) canvas.style.visibility = entry.isIntersecting ? 'visible' : 'hidden'
      },
      { threshold: 0.0, rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── Scroll fade-out ─────────────────────────────────────────────────────
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
    <section ref={heroSectionRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#050505', zIndex: 0 }} />
      <div ref={heroRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <div ref={canvasWrapperRef} style={{ position: 'absolute', inset: 0 }}>

          {isMobile ? (
            /* ── Mobile: static image + gyroscope CSS parallax ── */
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#050505' }}>
              <div
                ref={mobileImageRef}
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  backgroundImage: 'url(/wafer-hero.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform',
                }}
              />
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
            /* ── Desktop: full 3-D canvas ── */
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