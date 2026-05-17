import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { useGameStore } from './store'
import SpaceScene from './components/SpaceScene'
import Interface from './components/Interface'
import AudioController from './components/AudioController'

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight
          position={[-5, 10, 5]}
          angle={0.25}
          penumbra={1}
          intensity={2}
          castShadow
          color="#00f2ff"
        />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <SpaceScene />

        <Environment preset="city" />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
      </Canvas>

      <Interface />
      <AudioController />
    </div>
  )
}

export default App
