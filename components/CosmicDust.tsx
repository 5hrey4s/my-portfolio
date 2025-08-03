import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const CosmicDust: React.FC = () => {
  const particlesCount = 5000
  const particlesRef = useRef<THREE.Points>(null!)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.01
        if (positions[i + 2] > 50) {
          positions[i + 2] = -100
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={new Float32Array(particlesCount * 3).map(() => (Math.random() - 0.5) * 200)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

