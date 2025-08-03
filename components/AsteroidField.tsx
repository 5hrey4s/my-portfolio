import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const AsteroidField: React.FC = () => {
  const asteroidCount = 200
  const asteroidRefs = useRef<(THREE.Mesh | null)[]>([]) // Updated type to allow null

  useFrame(() => {
    asteroidRefs.current.forEach((asteroid) => {
      if (asteroid) { // Check for null before accessing properties
        asteroid.rotation.x += 0.01
        asteroid.rotation.y += 0.01
        asteroid.position.z += 0.05
        if (asteroid.position.z > 50) {
          asteroid.position.z = -100
        }
      }
    })
  })

  return (
    <>
      {[...Array(asteroidCount)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            asteroidRefs.current[i] = el // Assign element to the ref
          }}
          position={[
            Math.random() * 200 - 100,
            Math.random() * 200 - 100,
            Math.random() * 150 - 100,
          ]}
          scale={[
            0.1 + Math.random() * 0.5,
            0.1 + Math.random() * 0.5,
            0.1 + Math.random() * 0.5,
          ]}
        >
          <dodecahedronGeometry />
          <meshStandardMaterial color="#888888" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}
    </>
  )
}
