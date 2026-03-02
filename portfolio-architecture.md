# KUSHAGRA BAKSHI — PORTFOLIO ARCHITECTURE (v3.0 FINAL)
> **For autonomous AI agents with filesystem access (Claude Code, Cursor Composer)**
> Read this entire document before executing a single command.
> Do not improvise. Do not truncate. Do not leave placeholders in code.
> Every value, color, timing, and string in this document is exact and intentional.

---

## SYSTEM ROLE

You are an autonomous Lead Frontend Architect, WebGL/GLSL Programmer,
React Three Fiber expert, and Next.js 14 specialist. Your task is to
build a production-ready, AAA-grade personal portfolio from scratch
in the current directory. You have full filesystem access.

This is not a student project. The final output must be indistinguishable
from work produced by a top-tier creative studio like Active Theory,
Locomotive, or Resn. Every line of code must be complete, functional,
and production-ready. No truncation. No "// implement this" comments.
No placeholder content anywhere.

---

## BRAND & CONTEXT

```
Name:        Kushagra Bakshi
Title:       VLSI Engineer & AI Hardware Builder
Level:       2nd Year B.E. Electronics Engineering, VLSI Specialization
Email:       [KUSHAGRA_EMAIL]
GitHub:      [KUSHAGRA_GITHUB]
LinkedIn:    [KUSHAGRA_LINKEDIN]
```

**Target companies:** NVIDIA, AMD, Intel, Qualcomm, MediaTek,
Cadence, Synopsys, Mentor Graphics, high-growth fabless startups.

**Brand voice:** Professional, uncompromisingly confident, industry-aware.
NOT "please hire me." Energy: "Here is the exact value I bring to
your silicon pipeline." Short sentences. Technical precision. No filler.

**Core insight to communicate throughout the entire site:**
Verification consumes 70% of chip design time.
SiliconSpec is Kushagra's answer. This one insight separates him
from every other 2nd year student and must be felt on every section.

---

## PHASE 1: ENVIRONMENT SETUP

Execute these commands in exact order. Do not proceed to Phase 2
until Phase 1 is complete and verified.

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*"

npm install \
  @react-three/fiber@8 \
  @react-three/drei@9 \
  @react-three/postprocessing@2 \
  three@0.165 \
  framer-motion@11 \
  lenis@1 \
  gsap@3 \
  maath
```

**Verify installation:** Confirm `maath` is installed as exactly `maath`,
NOT `@react-three/maath` (that package does not exist and will break builds).

---

## PHASE 2: GLOBAL CONFIGURATION

### `next.config.js` (complete file)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    '@react-three/postprocessing',
  ],
}
module.exports = nextConfig
```

This is non-negotiable. Without `transpilePackages`, Vercel will
throw ES module build errors on deployment.

### `tsconfig.json`

Use the Next.js 14 default tsconfig with:
- `"strict": true`
- `"paths": { "@/*": ["./src/*"] }`
- No implicit any anywhere in the codebase.

### `tailwind.config.ts` (extend with exact values)

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        cyan: '#00e5ff',
        purple: '#7c3aed',
        green: '#00ff88',
        amber: '#f59e0b',
        pink: '#ec4899',
        'text-primary': '#f0f4f8',
        'text-secondary': '#4a5568',
        'text-dim': '#1e293b',
        'mono-color': '#64748b',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
```

### `src/app/globals.css` (complete file — do not omit any section)

```css
/* ─── FONTS ──────────────────────────────────────────────────── */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@900,700,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── CSS VARIABLES ──────────────────────────────────────────── */
:root {
  --bg: #050505;
  --glass-bg: rgba(255, 255, 255, 0.025);
  --glass-border: rgba(255, 255, 255, 0.06);
  --cyan: #00e5ff;
  --purple: #7c3aed;
  --green: #00ff88;
  --amber: #f59e0b;
  --pink: #ec4899;
  --text-primary: #f0f4f8;
  --text-secondary: #4a5568;
  --text-dim: #1e293b;
  --mono-color: #64748b;
}

/* ─── GLOBAL RESET ───────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  cursor: none;
  scroll-behavior: auto; /* Lenis handles smooth scroll */
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: 'Satoshi', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ─── GRAIN TEXTURE OVERLAY (non-negotiable premium detail) ─── */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* ─── CUSTOM SCROLLBAR ───────────────────────────────────────── */
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

/* ─── ANIMATIONS ─────────────────────────────────────────────── */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  70% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

@keyframes border-pulse {
  0%, 100% { border-color: transparent; }
  50% { border-color: var(--purple); }
}

/* ─── GLASSMORPHISM UTILITY ──────────────────────────────────── */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(24px) saturate(180%);
  border-radius: 16px;
}

/* ─── GRADIENT TEXT UTILITY ──────────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, var(--cyan) 0%, var(--purple) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ─── CHIP CLIP-PATH UTILITY ─────────────────────────────────── */
.chip-clip {
  clip-path: polygon(
    0% 12px, 12px 0%,
    calc(100% - 12px) 0%, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 0% calc(100% - 12px)
  );
}
```

---

## PHASE 3: CORE ENGINEERING MANDATES

Read and internalize before writing a single component.
These rules are non-negotiable. Violating them breaks the
60fps target and the visual integrity of the site.

### Animation Separation (CRITICAL)
- **Framer Motion:** ONLY for mount/unmount animations and hover states.
- **GSAP ScrollTrigger:** EXCLUSIVELY for scroll-linked animations
  (timeline SVG drawing, bento skew distortion, hero fade).
- **NEVER** apply both to the same DOM element.
- Where a card needs BOTH scroll skew (GSAP) AND a fade-in
  (Framer Motion): apply Framer Motion to the OUTER wrapper div,
  GSAP to the INNER card div. Never the same node.

### Performance (60fps locked)
- CSS transforms ONLY: `translate3d`, `scale`, `rotate`, `skew`.
- NO animated `box-shadow` (compositor thread killer).
- NO animated `filter` properties during scroll.
- NO `offsetWidth`/`offsetHeight` reads inside animation loops.
- `will-change: transform` on all magnetic and animated elements.

### Custom Cursor Sync
- Bind cursor coordinate updates to `gsap.ticker.add()`.
- Do NOT use a standalone `requestAnimationFrame` for the cursor.
- Syncing to the GSAP ticker prevents micro-stutters caused by
  multiple async loops (Lenis + Three.js + cursor) running out of phase.

### Three.js Render Pause
- Implement an `IntersectionObserver` on the hero section parent div.
- When the hero leaves the viewport, set an `isRendering` React ref to `false`.
- Pass this ref into the R3F scene. Inside `useFrame`: `if (!isRendering.current) return`.
- Do NOT use `gl.setAnimationLoop(null)` — this breaks R3F's
  internal render loop management. The `useFrame` guard is correct.

### Lenis + GSAP Integration
- Connect Lenis to GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- Set `gsap.ticker.lagSmoothing(0)`
- NEVER use `lenis.on('scroll')` for animation triggers.
- GSAP ScrollTrigger exclusively for all scroll-driven animations.

### Mobile Fallback (< 768px)
- Replace the entire R3F Canvas with a static fallback div.
- `background-image: url('/wafer-hero.webp')`, `background-size: cover`.
- If image missing: `radial-gradient(#050505, #000000)` with faint
  inline SVG circuit grid at opacity 0.06.
- Overlay identical HeroUI text on top. All other sections interactive.

---

## PHASE 4: FILE STRUCTURE

Create this exact structure before writing component code:

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    opengraph-image.tsx
  components/
    Cursor.tsx
    Nav.tsx
    HeroCanvas.tsx
    ShaderBackground.tsx
    HeroUI.tsx
    About.tsx
    BentoGrid.tsx
    SiliconSpec.tsx
    Vision.tsx
    Timeline.tsx
    Contact.tsx
    MagneticButton.tsx
  lib/
    useLenis.ts
    useMousePosition.ts
public/
  cv.pdf              (placeholder — user replaces)
  wafer-hero.webp     (placeholder — user replaces)
  favicon.ico
```

---

## PHASE 5: COMPONENT SPECIFICATIONS

Every specification below is exact. Do not improvise values.
Do not use judgment on colors, timings, or copy.

---

### `src/app/layout.tsx`

**Metadata export (exact values):**
```ts
export const metadata: Metadata = {
  title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
  description: '2nd year Electronics Engineering student specializing in VLSI, building SiliconSpec — an AI auto-verification tool for RTL design.',
  themeColor: '#050505',
  openGraph: {
    title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
    description: '2nd year Electronics Engineering student specializing in VLSI, building SiliconSpec — an AI auto-verification tool for RTL design.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
    images: ['/og-image.png'],
  },
}
```

**In RootLayout body:**
1. Import and call `useLenis` hook to initialize Lenis.
2. `gsap.registerPlugin(ScrollTrigger)` on mount.
3. Connect Lenis to GSAP ticker (see Phase 3 mandate).
4. Mount `<Cursor />` and `<Nav />` outside the main content.
5. Apply Satoshi + JetBrains Mono font variables to `<html>`.

---

### `src/app/opengraph-image.tsx`

Generate using Next.js `ImageResponse` (next/og).
Dimensions: 1200×630px.
Design:
- Background: `#050505`
- Faint cyan circuit grid SVG pattern, opacity 0.08
- "KUSHAGRA BAKSHI" Satoshi 900, 72px, `#f0f4f8`, centered
- "VLSI Engineer & AI Builder" JetBrains Mono, 24px, `#00e5ff`, below
- "SiliconSpec · RTL · FPGA · AI" JetBrains Mono 14px, `#4a5568`, bottom

---

### `src/components/Cursor.tsx`

Two plain `div` elements. No canvas. No SVG.

**Dot:** 5×5px, `border-radius: 50%`, `background: #00e5ff`,
`mix-blend-mode: difference`, `position: fixed`, `z-index: 9999`,
`pointer-events: none`, `transform: translate(-50%, -50%)`

**Ring:** 38×38px, `border-radius: 50%`,
`border: 1px solid rgba(0, 229, 255, 0.4)`,
`position: fixed`, `z-index: 9998`, `pointer-events: none`,
`transform: translate(-50%, -50%)`

**States:**
- Default: dot visible, ring 38px
- `[data-cursor="hover"]`: dot `opacity → 0`, ring `→ 56px`,
  border `rgba(0,229,255,0.9)`, transition 200ms
- `[data-cursor="magnetic"]`: both elements `opacity → 0`
- `mousedown`: ring `scale(0.8)` for 100ms, then back

**Implementation:**
```ts
// Bind to GSAP ticker — NOT standalone RAF
let mouseX = 0, mouseY = 0
let ringX = 0, ringY = 0

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

gsap.ticker.add(() => {
  // Dot: exact position
  dotRef.current.style.left = mouseX + 'px'
  dotRef.current.style.top = mouseY + 'px'
  // Ring: lerp with factor 0.1
  ringX += (mouseX - ringX) * 0.1
  ringY += (mouseY - ringY) * 0.1
  ringRef.current.style.left = ringX + 'px'
  ringRef.current.style.top = ringY + 'px'
})
```

---

### `src/components/Nav.tsx`

`position: fixed`, top 0, z-index 200, height 64px, padding `0 7vw`
`display: flex`, `justify-content: space-between`, `align-items: center`
`background: linear-gradient(to bottom, rgba(5,5,5,0.96), transparent)`
`backdrop-filter: blur(20px)`

**Left:** "KB" — Satoshi 900, 14px, `#00e5ff`, `letter-spacing: 0.5em`
Acts as home link (`href="/"`), `data-cursor="hover"`

**Right nav links** (JetBrains Mono, 10px, `#4a5568`, `letter-spacing: 0.3em`):
- "WORK" → `#work`
- "VISION" → `#vision`
- "CONTACT" → `#contact`
- Hover: `color → #f0f4f8`, 200ms
- All: `data-cursor="hover"`

**CTA:** `<MagneticButton>` wrapping "HIRE ME →"
- `href="#contact"`, `data-cursor="magnetic"`
- `background: linear-gradient(135deg, #00e5ff, #0891b2)`
- `color: #050505`, padding `9px 24px`, border-radius `6px`
- JetBrains Mono, 10px, 700 weight, `letter-spacing: 0.2em`

**Entry animation (Framer Motion):**
`initial: {opacity:0, y:-20}` → `animate: {opacity:1, y:0}`
`transition: {duration:0.6, delay:0.8}`

---

### `src/components/HeroCanvas.tsx`

**Scene Architecture (critical — read carefully):**
The `ShaderBackground` plane AND the silicon wafer both live inside
the SAME R3F `<Canvas>`. They are NOT separate DOM layers.
The shader plane uses `renderOrder={-2}`. The wafer group uses
`renderOrder={0}`. The Canvas has `alpha: true`.

**Canvas setup:**
```tsx
<Canvas
  camera={{ position: [0, 1.8, 7], fov: 52 }}
  gl={{
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  }}
  dpr={[1, 1.5]}
  style={{ position: 'absolute', inset: 0 }}
>
```

**IntersectionObserver render pause (in parent component):**
```ts
const isRendering = useRef(true)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isRendering.current = entry.isIntersecting
      const canvas = heroRef.current?.querySelector('canvas')
      if (canvas) {
        canvas.style.visibility = entry.isIntersecting
          ? 'visible' : 'hidden'
      }
    },
    { threshold: 0.0, rootMargin: '100px' }
  )
  if (heroRef.current) observer.observe(heroRef.current)
  return () => observer.disconnect()
}, [])
```

Pass `isRendering` ref into scene. Inside `useFrame`:
`if (!isRendering.current) return` — first line, before all else.

**Hero scroll fade (GSAP ScrollTrigger on canvas wrapper div):**
```ts
gsap.to(canvasWrapperRef.current, {
  opacity: 0,
  scrollTrigger: {
    trigger: heroSectionRef.current,
    start: 'top top',
    end: '80% top',
    scrub: true,
  }
})
```
Behind the canvas: a solid `#050505` div fades IN simultaneously,
creating the "emerging from silicon into dashboard" transition.

---

### `src/components/ShaderBackground.tsx`

Rendered inside the same Canvas as the wafer, `renderOrder={-2}`.

**Vertex shader (exact GLSL):**
```glsl
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

**Fragment shader (write complete GLSL with all of the following):**

Uniforms: `uTime` (float), `uMouse` (vec2), `uResolution` (vec2)

```glsl
// Required: standard 2D value noise function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f); // smoothstep
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

// FBM — 3 octaves
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec3 color = vec3(0.02, 0.02, 0.02); // #050505 base

  // 4 organic blobs
  // Each blob: center moves on slow sin/cos curves
  // Mouse repulsion: blob center pushed AWAY from uMouse by 0.15
  // Use fbm noise to break up blob edges
  // Blob color: vec3(0.0, 0.08, 0.12) — max luminosity 0.08

  float phases[4];
  phases[0] = 0.0; phases[1] = 1.57; phases[2] = 3.14; phases[3] = 4.71;

  for (int i = 0; i < 4; i++) {
    float phase = phases[i];
    vec2 center = vec2(
      0.5 + sin(uTime * 0.7 + phase) * 0.28,
      0.5 + cos(uTime * 0.5 + phase) * 0.22
    );
    // Mouse repulsion
    vec2 toMouse = center - uMouse;
    float mouseDist = length(toMouse);
    center += normalize(toMouse) * 0.15
            * (1.0 - smoothstep(0.0, 0.4, mouseDist));

    // FBM distortion on blob edge
    float distortion = fbm(uv * 3.0 + uTime * 0.1) * 0.08;
    float blob = smoothstep(0.0, 1.0,
      1.0 - length(uv - center) * 3.2 - distortion);

    color += blob * vec3(0.0, 0.08, 0.12);
  }

  // Clamp max luminosity to 0.08
  color = min(color, vec3(0.08));
  gl_FragColor = vec4(color, 1.0);
}
```

**Plane geometry:** `<planeGeometry args={[20, 20]} />`
Update uniforms in `useFrame`: `uTime` via `clock.elapsedTime`,
`uMouse` via `(pointer.x + 1) / 2, (pointer.y + 1) / 2`.

---

### Silicon Wafer Object (inside HeroCanvas.tsx)

**Geometry:** `CylinderGeometry(3.0, 3.0, 0.09, 128, 1)`
Wrapped in `<Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.08}>`
Initial `rotation.x = -0.52`

**Material — MeshPhysicalMaterial (exact values, no deviations):**
```ts
{
  color: '#0a0a1a',
  metalness: 0.98,
  roughness: 0.07,
  clearcoat: 1.0,
  clearcoatRoughness: 0.04,
  envMapIntensity: 3.0,
  reflectivity: 1.0,
}
```

**Circuit trace grid** (at `y = 0.055`, above wafer top face):
- Grid spacing: `0.38` units, extent: `-2.8` to `+2.8` on X and Z
- For each line segment: only include points where `x² + z² < 2.85²`
- `LineSegments` with `LineBasicMaterial`: color `#00e5ff`,
  opacity `0.15`, transparent: true

**Junction nodes at intersections:**
- `SphereGeometry(0.038, 8, 8)`, `MeshBasicMaterial` color `#00e5ff`
- Place every `0.76` units. Only where `x² + z² < 2.6²` (~45-55 total)

**Torus rings:**
- Outer: `TorusGeometry(3.05, 0.055, 16, 96)`, rotation.x `Math.PI/2`,
  color `#7c3aed`, opacity `0.65`
- Inner: `TorusGeometry(1.5, 0.028, 12, 64)`, rotation.x `Math.PI/2`,
  color `#00e5ff`, opacity `0.35`

**Particles:** 200 points, `PointsMaterial` color `#00e5ff`,
size `0.035`, opacity `0.45`. In `useFrame`: `particles.rotation.y += 0.0006`

**Lights:**
- `AmbientLight` intensity `0.2`
- `PointLight` ref `cyanLightRef`: color `#00e5ff`, intensity `6`,
  distance `22`, starts at `(5, 6, 5)` — follows mouse
- `PointLight` static: color `#7c3aed`, intensity `3.5`,
  distance `18`, position `(-5, 4, 3)`

**HDRI:** `<Environment preset="city" background={false} />`

**Mouse tracking in useFrame:**
```ts
import { damp3 } from 'maath/easing' // exact import path

useFrame(({ pointer, clock, delta }) => {
  if (!isRendering.current) return // render pause guard — first line

  damp3(
    waferGroupRef.current.rotation,
    [pointer.y * 0.28 - 0.52, waferGroupRef.current.rotation.y + 0.003, 0],
    0.06,
    delta
  )
  cyanLightRef.current.position.x +=
    (pointer.x * 7 - cyanLightRef.current.position.x) * 0.05
  cyanLightRef.current.position.y +=
    (pointer.y * 5 + 6 - cyanLightRef.current.position.y) * 0.05

  // Shader uniforms
  shaderRef.current.uniforms.uTime.value = clock.elapsedTime
  shaderRef.current.uniforms.uMouse.value.set(
    (pointer.x + 1) / 2,
    (pointer.y + 1) / 2
  )
})
```

**Post-processing (inside Canvas, after all scene objects):**
```tsx
<EffectComposer multisampling={0}>
  <Bloom
    luminanceThreshold={0.55}
    luminanceSmoothing={0.3}
    intensity={0.75}
    radius={0.65}
  />
  <DepthOfField
    focusDistance={0.018}
    focalLength={0.045}
    bokehScale={2.8}
  />
  <Noise opacity={0.038} />
  <Vignette offset={0.28} darkness={0.72} />
  <ChromaticAberration offset={[0.00025, 0.00025]} />
</EffectComposer>
```

---

### `src/components/HeroUI.tsx`

`position: absolute`, inset 0, `z-index: 10`
`pointer-events: none` globally; buttons override to `pointer-events: auto`
Content centered at 45% vertically, padding `0 8vw`

**1. Eyebrow label:**
JetBrains Mono, 10px, color `#00e5ff`, opacity `0.75`,
`letter-spacing: 0.5em`
Text: `"▸ VLSI × AI × SILICON ENGINEERING"`
Framer Motion: `initial:{opacity:0,y:12}` →
`animate:{opacity:1,y:0}`, `duration:0.6`, `delay:0.2`

**2. H1 — word-by-word animation:**
Satoshi 900, `clamp(52px, 8vw, 110px)`, `line-height: 0.96`
Split each word: `<span style={{overflow:'hidden'}}>` wrapping
`<motion.span initial={{y:'105%'}} animate={{y:'0%'}}`
`transition={{ease:[0.22,1,0.36,1], duration:0.9, delay: wordIndex*0.08}}>`

- Line 1: `"DESIGNING"` — color `#f0f4f8`
- Line 2: `"THE HARDWARE"` — gradient text `#00e5ff → #7c3aed`
  (`background-clip: text`, `-webkit-text-fill-color: transparent`)
- Line 3: `"THAT THINKS."` — color `#f0f4f8`

**3. Typewriter component:**
JetBrains Mono, 14px, color `#00e5ff`
Fixed height: `28px` (prevents layout shift on phrase change)
Blinking cursor: `▮` via `@keyframes blink` (0%,100%: opacity 1; 50%: opacity 0;
`animation: blink 0.8s steps(1) infinite`)

**Exact phrases — type then delete, loop forever:**
```
Phrase 1: "Architecting the intersection of silicon and intelligence."
Phrase 2: "Accelerating RTL. Automating verification."
Phrase 3: "Designing the hardware that thinks."
Phrase 4: "RTL Designer. FPGA Engineer. AI Tool Builder. Your next intern."
```
**Exact timings:**
- Type speed: `55ms` per character
- Delete speed: `28ms` per character
- Pause after full phrase typed: `2400ms`
- Pause before typing next phrase: `400ms`

**4. CTA buttons** (flex row, gap `16px`, `margin-top: 48px`):

Button A — `"VIEW WORK →"`:
- `href="#work"`, `data-cursor="magnetic"`
- `background: linear-gradient(135deg, #00e5ff, #0891b2)`
- `color: #050505`, padding `15px 40px`, border-radius `8px`
- JetBrains Mono, 12px, 700, `letter-spacing: 0.25em`
- Wrapped in `<MagneticButton>`

Button B — `"DOWNLOAD CV"`:
- `href="/cv.pdf" download`, `data-cursor="magnetic"`
- `background: transparent`
- `border: 1px solid rgba(0, 229, 255, 0.32)`
- `color: #00e5ff`, padding `15px 40px`, border-radius `8px`
- JetBrains Mono, 12px, `letter-spacing: 0.25em`
- Wrapped in `<MagneticButton>`

**5. Bottom decorations:**
- Center-bottom: 1px × 44px vertical line,
  `background: linear-gradient(rgba(0,229,255,0.5), transparent)`
- Below line: `"SCROLL"` JetBrains Mono 9px `#1e293b` tracking `0.4em`
- Right-bottom: `"KUSHAGRA BAKSHI // 2026"`
  JetBrains Mono 10px `#1e293b` tracking `0.3em`

---

### `src/components/About.tsx`

Padding: `120px 8vw`, CSS Grid 2 columns (`1fr 1.2fr`),
gap `80px`, max-width `1200px`, margin `0 auto`

**LEFT COLUMN** (Framer Motion `initial:{opacity:0,x:-40}`
→ `whileInView:{opacity:1,x:0}`, `viewport:{once:true}`,
`transition:{duration:0.8, ease:[0.22,1,0.36,1]}`):

Eyebrow: JetBrains Mono 10px `#00e5ff` tracking `0.4em` — `"ABOUT"`

H2: `"Where Silicon Meets Intelligence"` Satoshi 900,
`clamp(32px, 3.5vw, 52px)`, `line-height: 1.15`

Bio — 3 paragraphs (Satoshi 400, 15px, `#4a5568`, `line-height: 1.9`):

Paragraph 1:
> "I'm Kushagra — an Electronics Engineering student with hands-on
> roots in RTL design, UVM verification, and FPGA prototyping.
> My focus is the intersection of hardware and intelligence:
> making silicon smarter."

Paragraph 2 (inline highlights — wrap in `<span style={{color:'#00e5ff'}}>`:
> "I'm currently building **SiliconSpec** — an AI-powered tool
> targeting the **70%** of chip design time consumed by manual RTL
> verification. I'm the person who asks why verification still
> requires this much human effort, then builds the answer."

Paragraph 3:
> "I'm looking for an internship where I can learn at the speed
> of silicon and contribute from day one."

**RIGHT COLUMN** (same animation, `delay: 0.15`, `x:40→0`):

3 skill rows. Each row: colored dot (4px circle) +
JetBrains Mono 9px category label + pill badges below.
Gap between rows: `24px`.

```
Row 1 — dot #00e5ff, label "HARDWARE":
  Pills: Verilog · SystemVerilog · UVM · Formal Verification · FPGA

Row 2 — dot #7c3aed, label "AI & SOFTWARE":
  Pills: Python · C/C++ · MATLAB/Simulink · TensorFlow · PyTorch

Row 3 — dot #00ff88, label "EDA TOOLS":
  Pills: AMD Vivado · ModelSim · Quartus · Git · Linux
```

**Pill style:** glassmorphism bg, JetBrains Mono 11px, `#4a5568`,
padding `6px 14px`, border-radius `6px`, `data-cursor="hover"`

**Pill hover (Framer Motion whileHover — on pill parent `perspective:600px`):**
```ts
whileHover: {
  borderColor: `${categoryAccent}73`, // 45% opacity
  color: categoryAccent,
  backgroundColor: `${categoryAccent}14`, // 8% opacity
  rotateX: 6,
  rotateY: -8,
  transition: { duration: 0.2 }
}
```

---

### `src/components/BentoGrid.tsx` + `src/components/SiliconSpec.tsx`

Section `id="work"`, padding `120px 8vw`
Eyebrow: `"THE ENGINE ROOM"`, H2: `"What I Build"`

**Grid:** `repeat(3, 1fr)`, gap `12px`, max-width `1200px`

**Animation separation — follow exactly:**
- OUTER wrapper `<div>` per card: Framer Motion stagger
- INNER card `<div>` (the visible card with `.glass.chip-clip`): GSAP skew
- Never both on same element

**Framer Motion variants:**
```ts
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
}
const item = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
}
```
Apply `whileInView="visible"` `initial="hidden"` on grid container,
`viewport={{ once: true }}`.

**GSAP scroll skew on INNER card div:**
```ts
ScrollTrigger.create({
  trigger: innerCardRef.current,
  start: 'top bottom',
  end: 'bottom top',
  onUpdate: (self) => {
    const v = self.getVelocity() / 1000
    gsap.to(innerCardRef.current, {
      skewY: v * 0.012,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
})
```

**Hover glow reveal (inside each card, absolutely positioned):**
Framer Motion `animate` on `isHovered` state:
```ts
clipPath: isHovered
  ? 'ellipse(130% 130% at 50% 50%)'
  : 'ellipse(0% 0% at 50% 50%)'
transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] }
```
Background: `radial-gradient(${accent}1e 0%, transparent 65%)`

---

**CARD 1: SILICONSPEC** (`src/components/SiliconSpec.tsx`)
`grid-column: span 2`, `grid-row: span 2`, `min-height: 380px`
Accent: `#00e5ff`

**Top of card:**
- Pulsing green dot: `@keyframes pulse-dot` (scale 1→1.5, opacity 1→0,
  `1.5s infinite`) + `"ACTIVE DEVELOPMENT"` JetBrains Mono 9px
  `#00ff88` `letter-spacing: 0.4em`
- Tag: `"AI × RTL × VERIFICATION ENGINEERING"`
- Title: `"SiliconSpec — AI Auto-Verification Engine"`
  Satoshi 700, 20px, `#f0f4f8`

**Split-pane terminal (the visual centrepiece of the entire portfolio):**
Two side-by-side panes, `flex: 1` each.
Each: border-radius `8px`, overflow `hidden`,
JetBrains Mono `10.5px`, padding `16px`, min-height `200px`.

**LEFT PANE** (background `#030310` — static Verilog code):
Header bar: `●` red `#ff5f57`, `●` yellow `#ffbd2e`,
`●` green `#28c840` (8px circles) + `"alu_4bit.v"` `#334155`

Render code as `<pre>` with `<span>` for syntax highlighting.
**Exact syntax colors:**
```
keywords (module, input, output, reg, always, begin,
  end, case, endcase, endmodule):       #7c3aed
types ([3:0], [1:0]):                   #00e5ff
identifiers (a, b, op, result, alu_4bit): #f0f4f8
operators (=, +, -, &, |):             #00ff88
literals (2'b00, 2'b01, 2'b10, 2'b11): #f59e0b
```

**Exact code to display (do not modify):**
```
module alu_4bit (
  input  [3:0] a, b,
  input  [1:0] op,
  output reg [3:0] result
);
always @(*) begin
  case(op)
    2'b00: result = a + b;
    2'b01: result = a - b;
    2'b10: result = a & b;
    2'b11: result = a | b;
  endcase
end
endmodule
```

**RIGHT PANE** (background `#020d0d` — animated AI testbench generation):
Header: same dots + `"SiliconSpec AI v0.1"` + pulsing green live dot.
All text types character by character at `18ms/char`.
After full sequence: `3000ms` pause, then restart from Line 1.

**Exact animation sequence (line text, color, post-line pause):**
```
"> SiliconSpec AI v0.1 initializing..."   #00ff88   400ms pause
"> Parsing RTL: alu_4bit.v"              #00ff88   200ms pause
"> Detecting module ports: ✓"            #00ff88   200ms pause
"> [██████████] Analyzing... 100%"       #00ff88   400ms pause
"> Generating testbench..."              #00ff88   300ms pause
""                                        (blank)
"module alu_tb;"                          #f0f4f8
"  reg [3:0] a, b;"                      #f0f4f8
"  reg [1:0] op;"                        #f0f4f8
"  wire [3:0] result;"                   #f0f4f8
""                                        (blank)
"  alu_4bit dut(.a(a),.b(b),"           #f0f4f8
"    .op(op),.result(result));"         #f0f4f8
""                                        (blank)
"> ⚠ Bug detected: op=2'b01,"           #f59e0b
"  a < b → underflow unhandled"         #f59e0b
"> Coverage: 94.3%"                      #00e5ff
"> Testbench exported. ✓"               #00ff88
```

**Stat row below both panes:**
3 stats, 1px vertical dividers between, JetBrains Mono 10px `#4a5568`:
`"70% verification time target"` | `"Auto-generates SV testbenches"` | `"Pre-simulation bug detection"`

---

**CARD 2: RTL DESIGN SUITE**
`grid-column: span 1`, `min-height: 200px`, accent `#7c3aed`
Badge: `"COMING SOON"` — JetBrains Mono, `#00e5ff`
Icon: AND gate SVG drawn with `<path>` elements, stroke `#7c3aed`
Title: `"RTL Design Suite"`
Desc: `"4-bit ALU, UART controller, memory interfaces — SystemVerilog with full UVM testbench coverage."`
Hover: border pulses `transparent → #7c3aed → transparent`, `1.5s infinite`

**CARD 3: FPGA PROTOTYPING LAB**
`grid-column: span 1`, `min-height: 200px`, accent `#00ff88`
Badge: `"IN BUILD"`
Icon: 3×3 FPGA grid SVG with connection lines, stroke `#00ff88`
Title: `"FPGA Prototyping Lab"`
Desc: `"Real-time logic deployment on Xilinx hardware with timing constraint analysis and synthesis reports."`
Same border pulse hover with `#00ff88`.

**CARD 4: NEURAL NET → SILICON**
`grid-column: span 3`, `min-height: 160px`, accent `#f59e0b`
Badge: `"RESEARCH"`
Layout: horizontal flex — left: icon + title + badge, center: 1px divider,
right: description text.
Icon: 3 interconnected node circles SVG, stroke `#f59e0b`
Title: `"Neural Net → Silicon"`
Desc: `"Exploring HLS-based neural network acceleration — mapping ML inference to custom RTL datapaths for edge SoC deployment. Targeting sub-5ms inference on custom FPGA fabric."`

---

### `src/components/Vision.tsx`

Section `id="vision"`, padding `120px 8vw`,
max-width `960px`, margin `0 auto`, text-align left

Eyebrow: `"VISION"`
H2: `"The Problem I'm Building to Solve"`

**Callout box** (glassmorphism, `border: 1px solid rgba(0,229,255,0.2)`):
CSS Grid: `auto 1px 1fr`, gap `52px`, padding `48px 56px`

Left cell: `"70%"` Satoshi 900, 88px, `#00e5ff`, `line-height: 1`
Below: `"OF CHIP DESIGN TIME"` JetBrains Mono 10px `#4a5568` tracking `0.3em`

Middle: 1px × 80px divider `rgba(255,255,255,0.08)`

Right: Satoshi 400, 16px, `#4a5568`, `line-height: 1.9`:
> "Is consumed by [span #f0f4f8]verification[/span] — hunting functional
> bugs in RTL code before tape-out. One escaped bug costs millions.
> The process is largely manual, repetitive, and slow."

**Three paragraphs below** (margin-top `48px`):

Para 1: `"SiliconSpec is my answer. An AI-powered verification assistant that reads RTL code, understands design intent, and auto-generates SystemVerilog testbenches — flagging functional bugs before a single simulation runs."`

Para 2: `"Companies like Cadence and Synopsys are investing billions into AI for EDA. I'm building toward that problem from first principles as a 2nd year student."`

Para 3 (Satoshi 700, 17px, `#00e5ff`):
`"Because the best time to solve hard problems is right now."`

---

### `src/components/Timeline.tsx`

Padding `120px 8vw`, max-width `800px`
Eyebrow: `"JOURNEY"`, H2: `"The Timeline"`

**SVG circuit trace:**
`viewBox="0 0 40 [dynamicHeight]"` — measure section height via
`useLayoutEffect` and `getBoundingClientRect()` after mount.

Path center: `x=20`
At each of 5 node positions, path jogs: `x=20 → x=28 → x=20`
(right jog, 8px wide, 8px tall — like a real PCB trace)

Two overlapping paths:
1. Background track: `rgba(255,255,255,0.04)`, always visible
2. Animated trace: `#00e5ff`, opacity `0.4`, starts fully hidden

**GSAP scroll animation:**
```ts
gsap.set(tracePath, {
  strokeDasharray: pathLength,
  strokeDashoffset: pathLength
})
gsap.to(tracePath, {
  strokeDashoffset: 0,
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1.5,
  }
})
```

**5 nodes** — as trace reaches each, GSAP ScrollTrigger `onEnter`:
- Outer circle `10px`, inner dot `4px`
- Default: `#1e293b` (dim)
- Lit: stroke + fill → node accent color,
  `filter: drop-shadow(0 0 6px ${accentColor})`

**Node content (right of SVG, absolutely positioned):**
Year: JetBrains Mono 10px, accent color, tracking `0.3em`
1px × 32px vertical connector
Event: Satoshi 400, 14px, `#4a5568`, `line-height: 1.7`

**5 exact events (do not modify):**
```
2024  #00e5ff  "Started B.E. Electronics Engineering · VLSI Specialization"
2024  #7c3aed  "First RTL designs — ALU, counters, UART in Verilog/SystemVerilog"
2025  #00ff88  "UVM Verification + FPGA Prototyping on Xilinx boards"
2025  #f59e0b  "SiliconSpec concept born — AI meets RTL verification"
NOW   #ec4899  "Actively seeking internship at a world-class semiconductor company"
```

---

### `src/components/Contact.tsx`

Section `id="contact"`, padding `120px 8vw 80px`, text-align center

Framer Motion section: `initial:{opacity:0,y:40}`
`whileInView:{opacity:1,y:0}` `viewport:{once:true}` `transition:{duration:0.8}`

Eyebrow: `"CONTACT"`

H2 line 1: `"Open to Internships."` — `#f0f4f8`
H2 line 2: `"Let's Talk."` — gradient text `#00e5ff → #7c3aed`
Satoshi 900, `clamp(42px, 6vw, 88px)`, `line-height: 1.06`

Subtext: `"[KUSHAGRA_EMAIL]"` JetBrains Mono 12px `#334155` tracking `0.25em`
margin-bottom `64px`

**3 magnetic buttons** (flex row, centered, gap `16px`):
All: `<MagneticButton stiffness={260} damping={16}>`, `data-cursor="magnetic"`

Button 1 `"INITIALIZE CONTACT"`:
- `href="mailto:[KUSHAGRA_EMAIL]"`
- `background: linear-gradient(135deg, #00e5ff, #0891b2)`
- `color: #050505`, padding `18px 56px`, border-radius `8px`
- JetBrains Mono 12px 700, tracking `0.28em`

Button 2 `"DOWNLOAD CV"`:
- `href="/cv.pdf" download`
- `border: 1px solid rgba(0,229,255,0.3)`
- `color: #00e5ff`, padding `18px 56px`, border-radius `8px`
- **Cursor velocity effect:** track last 3 cursor positions + timestamps.
  `const speed = Math.sqrt(vx*vx + vy*vy)`
  `const angle = Math.atan2(vy, vx) * (180/Math.PI)`
  Apply via Framer Motion: `rotate: Math.min(speed * 0.015, 8)`,
  `scale: Math.min(1 + speed * 0.0008, 1.04)`

Button 3 `"GITHUB ↗"`:
- `href="[KUSHAGRA_GITHUB]" target="_blank"`
- `border: 1px solid rgba(255,255,255,0.07)`
- `color: #4a5568`, padding `18px 40px`, border-radius `8px`

**Social row** (margin-top `48px`):
LinkedIn · GitHub — JetBrains Mono 10px `#334155` tracking `0.3em`
gap `32px`, `data-cursor="hover"`, hover: `color #00e5ff`, 200ms

1px divider `rgba(255,255,255,0.04)`, margin `64px 0 32px`

**Footer line:**
JetBrains Mono 9px `#0f172a` tracking `0.45em`:
`"KUSHAGRA BAKSHI × VLSI × AI × SILICON ENGINEERING × 2026"`

---

### `src/components/MagneticButton.tsx`

**Props interface:**
```ts
interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  stiffness?: number   // default: 260
  damping?: number     // default: 16
}
```

**Implementation:**
```ts
const ref = useRef<HTMLDivElement>(null)
const x = useMotionValue(0)
const y = useMotionValue(0)
const springX = useSpring(x, { stiffness, damping })
const springY = useSpring(y, { stiffness, damping })

const handleMouseMove = (e: MouseEvent) => {
  const rect = ref.current!.getBoundingClientRect()
  x.set((e.clientX - rect.left - rect.width / 2) * 0.38)
  y.set((e.clientY - rect.top - rect.height / 2) * 0.38)
}

const handleMouseLeave = () => { x.set(0); y.set(0) }

return (
  <motion.div
    ref={ref}
    style={{ x: springX, y: springY,
             display: 'inline-block', willChange: 'transform' }}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
  >
    {href
      ? <a href={href} style={{ display: 'block' }}>{children}</a>
      : <button onClick={onClick}
          style={{ background: 'none', border: 'none',
                   padding: 0, cursor: 'none' }}>
          {children}
        </button>
    }
  </motion.div>
)
```

---

### `src/lib/useLenis.ts`

```ts
import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}
```

---

## PHASE 6: QUALITY CHECKLIST

Before declaring the build complete, verify every item:

```
□ next.config.js has transpilePackages array
□ tsconfig.json has strict:true and @/* paths
□ globals.css has grain texture body::after
□ globals.css has cursor:none on html
□ Satoshi loaded from Fontshare, JetBrains Mono from Google
□ No Inter, Roboto, Arial, or system fonts anywhere
□ Cursor bound to gsap.ticker.add(), not standalone RAF
□ Lenis connected to gsap.ticker, not standalone RAF
□ GSAP and Framer Motion never on the same DOM element
□ All bento cards: Framer Motion on OUTER div, GSAP on INNER div
□ SiliconSpec terminal has exact 18-line animation sequence
□ Typewriter timings: 55ms type, 28ms delete, 2400ms pause
□ useFrame guard: if (!isRendering.current) return — first line
□ maath imported as: import { damp3 } from 'maath/easing'
□ MeshPhysicalMaterial has exact values from spec
□ No box-shadow animations anywhere
□ No filter animations during scroll
□ will-change: transform on all magnetic/animated elements
□ Mobile < 768px: Three.js canvas replaced with static div
□ Metadata export in layout.tsx with OG image
□ All placeholder text uses [BRACKET] format for easy find/replace
□ cv.pdf and wafer-hero.webp exist in /public (even as empty files)
□ Site builds with: npm run build (zero TypeScript errors)
□ Site deploys on Vercel without build errors
```

---

## EXECUTION COMMAND

You now have the complete architecture. Begin execution:

1. Run Phase 1 (install dependencies)
2. Run Phase 2 (create all config and global files)
3. Create the file structure from Phase 4
4. Write all components from Phase 5 in this order:
   `globals.css → layout.tsx → MagneticButton → Cursor → Nav →
   ShaderBackground → HeroCanvas → HeroUI → About →
   SiliconSpec → BentoGrid → Vision → Timeline → Contact → page.tsx`
5. Run `npm run build` and fix any TypeScript errors before stopping
6. Report completion with a summary of files created

Do not ask for permission between steps.
Do not stop to confirm intermediate decisions.
Do not leave a single placeholder, truncation, or TODO in the code.
Execute autonomously until `npm run build` passes clean.
