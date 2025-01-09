import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FlowingParticles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null!)
  const particleCount = 5000
  
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

      positionAttribute.array[i3] = Math.cos(angle) * radius
      positionAttribute.array[i3 + 2] = Math.sin(angle) * radius
      positionAttribute.array[i3 + 1] = y + Math.sin(time + x * 0.5) * 0.1
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#14b8a6"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default FlowingParticles

