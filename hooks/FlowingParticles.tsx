import React, { useRef, useMemo } from 'react'
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const FlowingParticles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null!)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  
  const particleCount = 8000
  const particleSize = 0.02

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = Math.random() * 4 + 2

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const cols = new Float32Array(particleCount * 3)
    const color1 = new THREE.Color('#14b8a6')
    const color2 = new THREE.Color('#0ea5e9')
    for (let i = 0; i < particleCount; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random())
      cols[i * 3] = mixedColor.r
      cols[i * 3 + 1] = mixedColor.g
      cols[i * 3 + 2] = mixedColor.b
    }
    return cols
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const positionAttribute = meshRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const x = positionAttribute.array[i3]
      const y = positionAttribute.array[i3 + 1]
      const z = positionAttribute.array[i3 + 2]

      const angle = Math.atan2(z, x) + delta * 0.2
      const radius = Math.sqrt(x * x + z * z)

      positionAttribute.array[i3] = Math.cos(angle) * radius + Math.sin(time * 0.1 + i) * 0.02
      positionAttribute.array[i3 + 2] = Math.sin(angle) * radius + Math.cos(time * 0.1 + i) * 0.02
      positionAttribute.array[i3 + 1] = y + Math.sin(time + x * 0.5) * 0.1

      // Mouse interaction
      const dx = x - mouseRef.current.x
      const dy = y - mouseRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 0.5) {
        positionAttribute.array[i3] += dx * 0.01
        positionAttribute.array[i3 + 1] += dy * 0.01
      }
    }

    positionAttribute.needsUpdate = true
  })
  const handleMouseMove = (event: ThreeEvent<PointerEvent>) => {
    mouseRef.current.x = (event.clientX / size.width) * 2 - 1;
    mouseRef.current.y = -(event.clientY / size.height) * 2 + 1;
  };
  

  return (
    <>
      <points ref={meshRef} onPointerMove={handleMouseMove}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={particleSize}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </>
  )
}

export default FlowingParticles
