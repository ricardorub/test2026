import { create } from 'zustand'

interface GameStats {
  technical: number
  leadership: number
  analytical: number
  empathy: number
}

interface GameState {
  phase: 'START' | 'PLAYING' | 'RESULTS'
  stats: GameStats
  dialogue: string | null
  decisionsMade: string[]
  totalAvailableDecisions: number
  setPhase: (phase: 'START' | 'PLAYING' | 'RESULTS') => void
  makeDecision: (category: keyof GameStats, value: number, id: string) => void
  setDialogue: (dialogue: string | null) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>((set) => ({
  phase: 'START',
  stats: {
    technical: 0,
    leadership: 0,
    analytical: 0,
    empathy: 0,
  },
  dialogue: null,
  decisionsMade: [],
  totalAvailableDecisions: 4, // Engines, Console, Terminal, Crew

  setPhase: (phase) => set({ phase }),

  makeDecision: (category, value, id) => set((state) => ({
    stats: {
      ...state.stats,
      [category]: state.stats[category] + value
    },
    decisionsMade: [...state.decisionsMade, id],
    dialogue: null
  })),

  setDialogue: (dialogue) => set({ dialogue }),

  resetGame: () => set({
    phase: 'START',
    stats: { technical: 0, leadership: 0, analytical: 0, empathy: 0 },
    dialogue: null,
    decisionsMade: []
  })
}))
