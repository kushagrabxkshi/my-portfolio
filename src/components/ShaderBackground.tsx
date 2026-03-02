'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

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
  vec3 color = vec3(0.02, 0.02, 0.02);

  float phases[4];
  phases[0] = 0.0;
  phases[1] = 1.57;
  phases[2] = 3.14;
  phases[3] = 4.71;

  for (int i = 0; i < 4; i++) {
    float phase = phases[i];
    vec2 center = vec2(
      0.5 + sin(uTime * 0.7 + phase) * 0.28,
      0.5 + cos(uTime * 0.5 + phase) * 0.22
    );
    vec2 toMouse = center - uMouse;
    float mouseDist = length(toMouse);
    if (mouseDist > 0.001) {
      center += normalize(toMouse) * 0.15 * (1.0 - smoothstep(0.0, 0.4, mouseDist));
    }
    float distortion = fbm(uv * 3.0 + uTime * 0.1) * 0.08;
    float blob = smoothstep(0.0, 1.0, 1.0 - length(uv - center) * 3.2 - distortion);
    color += blob * vec3(0.0, 0.08, 0.12);
  }

  color = min(color, vec3(0.08));
  gl_FragColor = vec4(color, 1.0);
}
`

interface ShaderBackgroundProps {
  shaderRef: React.MutableRefObject<THREE.ShaderMaterial | null>
}

export default function ShaderBackground({ shaderRef }: ShaderBackgroundProps) {
  const localRef = useRef<THREE.ShaderMaterial | null>(null)
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame(() => {
    if (localRef.current) {
      localRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  })

  return (
    <mesh renderOrder={-2}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={(el) => {
          localRef.current = el
          if (shaderRef) shaderRef.current = el
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
