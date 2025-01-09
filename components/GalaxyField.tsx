import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const GalaxyField: React.FC = () => {
  const galaxyCount = 5
  const galaxyRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(() => {
    galaxyRefs.current.forEach((galaxy, i) => {
      if (galaxy) {
        galaxy.rotation.z += 0.0001 * (i + 1)
      }
    })
  })

  return (
    <>
      {[...Array(galaxyCount)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            galaxyRefs.current[i] = el as THREE.Mesh | null
          }}
          position={[
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 50 - 100
          ]}
          scale={[10 + Math.random() * 20, 10 + Math.random() * 20, 1]}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load('/galaxy-texture.png')}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  )
}
