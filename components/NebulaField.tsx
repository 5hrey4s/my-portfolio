import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const NebulaField: React.FC = () => {
  const nebulaCount = 3
  const nebulaRefs = useRef<THREE.Mesh[]>([])

  // This function helps us maintain the reference array correctly
  const setRef = (index: number) => (el: THREE.Mesh | null) => {
    if (el) {
      nebulaRefs.current[index] = el
    }
  }

  useFrame(() => {
    nebulaRefs.current.forEach((nebula, i) => {
      nebula.rotation.z += 0.0002 * (i + 1)
    })
  })

  return (
    <>
      {[...Array(nebulaCount)].map((_, i) => (
        <mesh
          key={i}
          ref={setRef(i)}  // Use the setRef function to properly assign the ref
          position={[
            Math.random() * 80 - 40,
            Math.random() * 80 - 40,
            Math.random() * 40 - 80
          ]}
          scale={[20 + Math.random() * 30, 20 + Math.random() * 30, 1]}
        >
          <planeGeometry />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load('/nebula-texture.png')}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  )
}
