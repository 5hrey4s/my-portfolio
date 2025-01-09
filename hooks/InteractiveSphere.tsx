import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'

const InteractiveSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const trailRef = useRef<THREE.Mesh>(null!)
  
  // Create particles for a neural network effect
  const particleCount = 80
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 2.5
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      temp.push({ position: [x, y, z], scale: Math.random() * 0.2 + 0.1 })
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.15
    
    // Pulse effect
    const time = state.clock.getElapsedTime()
    meshRef.current.scale.x = 1 + Math.sin(time) * 0.02
    meshRef.current.scale.y = 1 + Math.sin(time) * 0.02
    meshRef.current.scale.z = 1 + Math.sin(time) * 0.02
  })

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color="#0ea5e9"
          roughness={0.3}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.5}
        />
      </Sphere>

      {/* Outer glow sphere */}
      <Sphere args={[2.6, 32, 32]}>
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.1}
        />
      </Sphere>

      {/* Neural network nodes */}
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position as [number, number, number]}
          scale={particle.scale}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Connection lines */}
      {particles.slice(0, 40).map((particle, i) => (
        <Trail
          key={i}
          width={0.05}
          length={4}
          color="#0ea5e9"
          attenuation={(t) => t * t}
        >
          <mesh
            position={particle.position as [number, number, number]}
          >
            <sphereGeometry args={[0.01]} />
            <meshBasicMaterial color="#0ea5e9" />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

export default InteractiveSphere

