import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three';

const InteractiveSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.1
  })    

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial
        color="#14b8a6"
        roughness={0.3}
        metalness={0.8}
        wireframe
      />
    </Sphere>
  )
}

export default InteractiveSphere

