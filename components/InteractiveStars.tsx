import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const InteractiveStars: React.FC = () => {
  const starCount = 200
  const starsRef = useRef<THREE.Points>(null!)
  const raycaster = new THREE.Raycaster()
  const { camera, mouse } = useThree()
  const [hovered, setHovered] = useState<number | null>(null)

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(starsRef.current)

    // Check if intersects[0] is defined and has an index
    if (intersects.length > 0 && intersects[0].index !== undefined) {
      setHovered(intersects[0].index)
    } else {
      setHovered(null)
    }

    const colors = starsRef.current.geometry.attributes.color.array as Float32Array
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      if (i === hovered) {
        colors[i3] = 1
        colors[i3 + 1] = 1
        colors[i3 + 2] = 1
      } else {
        colors[i3] = 0.5 + Math.random() * 0.5
        colors[i3 + 1] = 0.5 + Math.random() * 0.5
        colors[i3 + 2] = 0.5 + Math.random() * 0.5
      }
    }
    starsRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starCount}
          array={new Float32Array(starCount * 3).map(() => (Math.random() - 0.5) * 100)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starCount}
          array={new Float32Array(starCount * 3).map(() => 0.5 + Math.random() * 0.5)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors />
    </points>
  )
}
