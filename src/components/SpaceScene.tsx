import React from 'react'
import { useGameStore } from '../store'
import { audioManager } from '../audio'
import { Text, Float, MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei'

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
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {isFixed ? "ENGINE STABLE" : "ENGINE FAILURE"}
      </Text>
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
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
      >
        {isFixed ? "CREW ORGANIZED" : "COMMAND CONSOLE"}
      </Text>
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
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.2}
        color="white"
      >
        {isFixed ? "DATA ANALYZED" : "RESEARCH TERMINAL"}
      </Text>
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
      <mesh castShadow>
        <torusGeometry args={[1, 0.2, 16, 32]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color={isFixed ? "#39ff14" : "#ffaa00"} intensity={1} />
      <Text
        position={[0, 1, 0]}
        fontSize={0.2}
        color="white"
      >
        {isFixed ? "MORALE HIGH" : "CREW QUARTERS"}
      </Text>
    </group>
  )
}

const SpaceScene: React.FC = () => {
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
