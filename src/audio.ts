import { create } from 'zustand'

export const useAudioStore = create((set) => ({
  isMuted: false,
  toggleMute: () => set((state: any) => ({ isMuted: !state.isMuted })),
}))

const AUDIO_URLS = {
  ambient: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Space ambient
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',   // UI Click
  success: 'https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3', // Success
}

class AudioManager {
  private ambient: HTMLAudioElement | null = null
  private click: HTMLAudioElement | null = null
  private success: HTMLAudioElement | null = null

  init() {
    this.ambient = new Audio(AUDIO_URLS.ambient)
    this.ambient.loop = true
    this.ambient.volume = 0.3

    this.click = new Audio(AUDIO_URLS.click)
    this.click.volume = 0.5

    this.success = new Audio(AUDIO_URLS.success)
    this.success.volume = 0.5
  }

  startAmbient() {
    this.ambient?.play().catch(() => {
      // Browsers often block autoplay without user interaction
      console.log('Autoplay blocked - waiting for interaction')
    })
  }

  playClick() {
    if (this.click) {
      this.click.currentTime = 0
      this.click.play()
    }
  }

  playSuccess() {
    if (this.success) {
      this.success.currentTime = 0
      this.success.play()
    }
  }

  setMute(mute: boolean) {
    if (this.ambient) this.ambient.muted = mute
    if (this.click) this.click.muted = mute
    if (this.success) this.success.muted = mute
  }
}

export const audioManager = new AudioManager()
