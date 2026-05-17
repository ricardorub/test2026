import React from 'react'
import { useGameStore } from '../store'
import { audioManager } from '../audio'
import { Terminal as TerminalIcon, Users, Zap, Heart, Rocket, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  text: string
  cat: 'technical' | 'leadership' | 'analytical' | 'empathy'
  val: number
}

interface DialogueItem {
  title: string
  text: string
  icon: React.ReactNode
  character: {
    name: string
    role: string
    color: string
  }
  options: Option[]
}

const dialogueContent: Record<string, DialogueItem> = {
  engine: {
    title: "Engine Failure",
    text: "The main thrusters are leaking plasma. We need an immediate fix or we're drifting!",
    icon: <Zap className="text-yellow-400" />,
    character: {
      name: "Jax",
      role: "Engineering Lead",
      color: "bg-yellow-500"
    },
    options: [
      { text: "Recalibrate the antimatter flow (Technical)", cat: "technical", val: 10 },
      { text: "Analyze the structural integrity first (Analytical)", cat: "analytical", val: 5 }
    ]
  },
  console: {
    title: "Chaos on Deck",
    text: "Commander, the crew is panicking. They need clear instructions now!",
    icon: <Users className="text-blue-400" />,
    character: {
      name: "Sarah",
      role: "First Officer",
      color: "bg-blue-500"
    },
    options: [
      { text: "Take command and assign specific roles (Leadership)", cat: "leadership", val: 10 },
      { text: "Listen to everyone's concerns and mediate (Empathy)", cat: "empathy", val: 5 }
    ]
  },
  terminal: {
    title: "Alien Signal",
    text: "I've picked up something... unusual. It's buried in the noise.",
    icon: <TerminalIcon className="text-purple-400" />,
    character: {
      name: "Kael",
      role: "Communications specialist",
      color: "bg-purple-500"
    },
    options: [
      { text: "Decode the underlying pattern (Analytical)", cat: "analytical", val: 10 },
      { text: "Bridge the signal to the comms array (Technical)", cat: "technical", val: 5 }
    ]
  },
  crew: {
    title: "Low Morale",
    text: "People are tired, commander. We're losing hope out here.",
    icon: <Heart className="text-pink-400" />,
    character: {
      name: "Mira",
      role: "Ship Counselor",
      color: "bg-pink-500"
    },
    options: [
      { text: "Organize a group recreational event (Empathy)", cat: "empathy", val: 10 },
      { text: "Structure a new, more efficient shift rotation (Leadership)", cat: "leadership", val: 5 }
    ]
  }
}

const Interface: React.FC = () => {
  const { phase, stats, dialogue, setDialogue, makeDecision, decisionsMade, totalAvailableDecisions, setPhase, resetGame } = useGameStore()

  const currentDialogue = dialogue ? dialogueContent[dialogue] : null

  const handleStart = () => {
    audioManager.playClick()
    setPhase('PLAYING')
  }

  const handleDecision = (cat: any, val: number, id: string) => {
    audioManager.playSuccess()
    makeDecision(cat, val, id)
  }

  if (phase === 'START') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-50">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center p-8 rounded-2xl border border-neon-blue/30 bg-gray-900/50 shadow-[0_0_50px_rgba(0,242,255,0.2)]"
        >
          <Rocket className="w-16 h-16 text-neon-blue mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            SPACE MISSION
          </h1>
          <p className="text-gray-400 mb-8 max-w-md">
            Your decisions in this crisis will reveal your true calling in the stars.
            Click on ship systems to interact.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,242,255,0.5)] cursor-pointer"
          >
            START MISSION
          </button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'RESULTS') {
    const topStat = Object.entries(stats).reduce((a, b) => a[1] > b[1] ? a : b)[0] as keyof typeof stats
    const roles: Record<string, { role: string, desc: string }> = {
      technical: { role: "Chief Engineer", desc: "You master the machines that keep humanity alive in the void." },
      leadership: { role: "Starship Captain", desc: "You are the steady hand that guides the crew through the darkness." },
      analytical: { role: "Science Officer", desc: "You see the patterns and truths hidden in the vast cosmos." },
      empathy: { role: "Counselor", desc: "You are the heart of the ship, keeping the human spirit alive." }
    }

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 rounded-3xl border-2 border-neon-green/50 bg-gray-900/80 max-w-2xl"
        >
          <h2 className="text-2xl text-neon-green mb-2 uppercase tracking-widest font-bold">Aptitude Result</h2>
          <h1 className="text-6xl font-black mb-6 text-white">{roles[topStat].role}</h1>
          <p className="text-xl text-gray-300 mb-10">{roles[topStat].desc}</p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {Object.entries(stats).map(([key, val]) => (
              <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-xs uppercase text-gray-500 mb-1">{key}</div>
                <div className="text-2xl font-mono text-neon-blue">{val}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { audioManager.playClick(); resetGame(); }}
            className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            RESTART SIMULATION
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="absolute top-6 left-6 flex gap-6 pointer-events-none">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500 tracking-tighter">{key}</span>
            <div className="h-1 w-24 bg-white/10 rounded-full mt-1 overflow-hidden">
              <motion.div
                animate={{ width: `${(val / 20) * 100}%` }}
                className="h-full bg-neon-blue"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-4">
        {decisionsMade.length === totalAvailableDecisions && (
          <button
            onClick={() => { audioManager.playClick(); setPhase('RESULTS'); }}
            className="px-6 py-2 bg-neon-green text-black font-bold rounded-full animate-pulse cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.5)]"
          >
            FINALIZE REPORT
          </button>
        )}
      </div>

      <AnimatePresence>
        {dialogue && currentDialogue && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl p-8 bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-40 flex gap-6"
          >
            {/* Character Portrait */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className={`w-24 h-24 rounded-2xl ${currentDialogue.character.color} flex items-center justify-center border-4 border-white/10 shadow-lg`}>
                <User size={48} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-sm leading-tight">{currentDialogue.character.name}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-tighter">{currentDialogue.character.role}</div>
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-xl">{currentDialogue.icon}</div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{currentDialogue.title}</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed italic">"{currentDialogue.text}"</p>
              <div className="grid gap-3">
                {currentDialogue.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleDecision(opt.cat, opt.val, dialogue)}
                    className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-neon-blue hover:bg-neon-blue/10 transition-all group relative overflow-hidden cursor-pointer"
                  >
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="text-white group-hover:text-neon-blue transition-colors font-medium">{opt.text}</span>
                      <span className="text-[10px] uppercase text-gray-600 group-hover:text-neon-blue/50">Execute</span>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => { audioManager.playClick(); setDialogue(null); }}
                  className="mt-2 text-sm text-gray-500 hover:text-white transition-colors self-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {decisionsMade.length < totalAvailableDecisions && !dialogue && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-pulse font-medium tracking-widest text-sm uppercase">
          Interact with ship systems
        </div>
      )}
    </>
  )
}

export default Interface
