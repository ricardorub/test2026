import React, { useEffect } from 'react'
import { useGameStore } from '../store'
import { audioManager, useAudioStore } from '../audio'
import { Volume2, VolumeX } from 'lucide-react'

const AudioController: React.FC = () => {
  const { phase } = useGameStore()
  const { isMuted, toggleMute } = useAudioStore() as any

  useEffect(() => {
    audioManager.init()
  }, [])

  useEffect(() => {
    if (phase === 'PLAYING') {
      audioManager.startAmbient()
    }
  }, [phase])

  useEffect(() => {
    audioManager.setMute(isMuted)
  }, [isMuted])

  return (
    <button
      onClick={toggleMute}
      className="absolute bottom-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-white z-50 cursor-pointer transition-colors"
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  )
}

export default AudioController
