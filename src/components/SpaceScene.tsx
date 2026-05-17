import React from 'react'
import { useGameStore } from '../store'
import { audioManager } from '../audio'
import { Text, Float, MeshWobbleMaterial, MeshDistortMaterial, Html } from '@react-three/drei'
import { JaxAvatar, SarahAvatar, KaelAvatar, MiraAvatar } from './Avatars'

const CharacterBillboard = ({ Avatar, name }: { Avatar: React.FC, name: string }) => (
  <Html position={[0, 2.5, 0]} center distanceFactor={10}>
    <div className="flex flex-col items-center pointer-events-none select-none">
      <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-full border-2 border-white/20 overflow-hidden p-2">
        <Avatar />
      </div>
      <div className="mt-1 px-2 py-0.5 bg-black/80 rounded text-[10px] text-white font-bold uppercase tracking-widest whitespace-nowrap border border-white/10">
        {name}
      </div>
    </div>
  </Html>
)

const Engine: React.FC = () => {
  const { setDialogue, decisionsMade } = useGameStore()
  const isFixed = decisionsMade.includes('engine')

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!isFixed) {
      audioManager.playClick()
      setDialogue('engine')
    }
  }

  return (
    <group position={[-3, 0, 0]} onClick={handleClick}>
      {!isFixed && <CharacterBillboard Avatar={JaxAvatar} name="Jax" />}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 2, 1.5]} />
          <meshStandardMaterial color={isFixed ? "#39ff14" : "#ff4444"} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.8]}>
          <planeGeometry args={[1, 1]} />
          <MeshWobbleMaterial factor={0.4} speed={2} color={isFixed ? "#39ff14" : "#ff00ff"} />
        </mesh>
      </Float>
      <Html position={[0, 1.5, 0]} center distanceFactor={10}>
        <div
          onClick={handleClick}
          className="text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap bg-black/40 px-2 py-1 rounded select-none hover:bg-black/60 transition-colors"
        >
          {isFixed ? "ENGINE STABLE" : "ENGINE FAILURE"}
        </div>
      </Html>
    </group>
  )
}

const Console: React.FC = () => {
  const { setDialogue, decisionsMade } = useGameStore()
  const isFixed = decisionsMade.includes('console')

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!isFixed) {
      audioManager.playClick()
      setDialogue('console')
    }
  }

  return (
    <group position={[0, 0, -2]} onClick={handleClick}>
      {!isFixed && <CharacterBillboard Avatar={SarahAvatar} name="Sarah" />}
      <mesh castShadow>
        <boxGeometry args={[3, 1, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.6, 0]} rotation={[-Math.PI/4, 0, 0]}>
        <planeGeometry args={[2.5, 0.8]} />
        <meshStandardMaterial
          color={isFixed ? "#00f2ff" : "#bc13fe"}
          emissive={isFixed ? "#00f2ff" : "#bc13fe"}
          emissiveIntensity={2}
        />
      </mesh>
      <Html position={[0, 1.2, 0]} center distanceFactor={10}>
        <div
          onClick={handleClick}
          className="text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap bg-black/40 px-2 py-1 rounded select-none hover:bg-black/60 transition-colors"
        >
          {isFixed ? "CREW ORGANIZED" : "COMMAND CONSOLE"}
        </div>
      </Html>
    </group>
  )
}

const Terminal: React.FC = () => {
  const { setDialogue, decisionsMade } = useGameStore()
  const isFixed = decisionsMade.includes('terminal')

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!isFixed) {
      audioManager.playClick()
      setDialogue('terminal')
    }
  }

  return (
    <group position={[3, 0, 0]} onClick={handleClick}>
      {!isFixed && <CharacterBillboard Avatar={KaelAvatar} name="Kael" />}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.8, 2, 8]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <MeshDistortMaterial
          distort={0.3}
          speed={4}
          color={isFixed ? "#00f2ff" : "#ff00ff"}
          emissive={isFixed ? "#00f2ff" : "#ff00ff"}
          emissiveIntensity={1}
        />
      </mesh>
      <Html position={[0, 1.8, 0]} center distanceFactor={10}>
        <div
          onClick={handleClick}
          className="text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap bg-black/40 px-2 py-1 rounded select-none hover:bg-black/60 transition-colors"
        >
          {isFixed ? "DATA ANALYZED" : "RESEARCH TERMINAL"}
        </div>
      </Html>
    </group>
  )
}

const CrewArea: React.FC = () => {
  const { setDialogue, decisionsMade } = useGameStore()
  const isFixed = decisionsMade.includes('crew')

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!isFixed) {
      audioManager.playClick()
      setDialogue('crew')
    }
  }

  return (
    <group position={[0, 0, 3]} onClick={handleClick}>
      {!isFixed && <CharacterBillboard Avatar={MiraAvatar} name="Mira" />}
      <mesh castShadow>
        <torusGeometry args={[1, 0.2, 16, 32]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color={isFixed ? "#39ff14" : "#ffaa00"} intensity={1} />
      <Html position={[0, 1, 0]} center distanceFactor={10}>
        <div
          onClick={handleClick}
          className="text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap bg-black/40 px-2 py-1 rounded select-none hover:bg-black/60 transition-colors"
        >
          {isFixed ? "MORALE HIGH" : "CREW QUARTERS"}
        </div>
      </Html>
    </group>
  )
}

const SpaceScene: React.FC = () => {
  const phase = useGameStore(state => state.phase)

  if (phase !== 'PLAYING') return null

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>

      <Engine />
      <Console />
      <Terminal />
      <CrewArea />
    </group>
  )
}

export default SpaceScene
