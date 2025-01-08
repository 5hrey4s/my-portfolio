import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three';

const InteractiveSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.15
  })

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <meshStandardMaterial
        color="#14b8a6"
        roughness={0.2}
        metalness={0.8}
        wireframe
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

export default InteractiveSphere
