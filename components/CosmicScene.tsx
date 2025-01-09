import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { GalaxyField } from './GalaxyField'
import { NebulaField } from './NebulaField'
import { AsteroidField } from './AsteroidField'
import { CosmicDust } from './CosmicDust'
import { InteractiveStars } from './InteractiveStars'

const CameraController = () => {
  const { camera, mouse } = useThree()
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 50))

  useFrame(() => {
    camera.position.x = initialCameraPosition.current.x + (mouse.x * 0.1)
    camera.position.y = initialCameraPosition.current.y + (mouse.y * 0.1)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export const CosmicScene: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <CameraController />
        <color attach="background" args={['#000010']} />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <GalaxyField />
        <NebulaField />
        <AsteroidField />
        <CosmicDust />
        <InteractiveStars />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

