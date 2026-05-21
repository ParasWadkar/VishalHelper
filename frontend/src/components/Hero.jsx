import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiZap } from 'react-icons/fi'

const TYPING_PHRASES = [
  'Fix Grammar',
  'Improve Writing',
  'Rewrite Professionally',
  'Correct Instantly',
  'Enhance Tone',
  'Boost Clarity',
]

export default function Hero({ onTryNow }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex]
    let timeout

    if (!isDeleting && displayText.length < phrase.length) {
      timeout = setTimeout(() => setDisplayText(phrase.slice(0, displayText.length + 1)), 80)
    } else if (!isDeleting && displayText.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40)
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  const statItems = [
    { value: '99.2%', label: 'Accuracy Rate' },
    { value: '0.3s', label: 'Avg Response' },
    { value: '2M+', label: 'Words Fixed' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12">
      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-400/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-green-500/20"
        >
          <FiZap className="text-green-400 text-sm" />
          <span className="text-green-400 text-sm font-medium">Powered by Claude AI</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6"
        >
          <span className="text-white">Your AI to </span>
          <br />
          <span className="text-gradient min-h-[1.2em] inline-block">
            {displayText}
            <span className="typing-cursor" />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          LexiAI transforms your writing instantly — fixing grammar, enhancing tone,
          rewriting professionally, or making it casual. Just type and let AI do the rest.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={onTryNow}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-base glow-green hover:from-green-400 hover:to-green-500 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Writing Free
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.a
            href="#features"
            className="px-8 py-4 rounded-2xl glass text-white/70 hover:text-white font-semibold text-base transition-all duration-300 hover:border-white/20"
            whileHover={{ scale: 1.03, y: -1 }}
          >
            See Features
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {statItems.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-gradient">{stat.value}</div>
              <div className="text-white/40 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating editor preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass-strong rounded-2xl p-4 sm:p-6 max-w-3xl mx-auto border border-green-500/10 glow-green"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-white/30 text-xs font-mono">lexiai-editor.ai</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left text-sm">
            <div className="glass rounded-xl p-3">
              <div className="text-white/30 text-xs mb-2 font-medium">INPUT</div>
              <p className="text-white/50 leading-relaxed">
                their going to the store but there not sure what there buying there
              </p>
            </div>
            <div className="glass rounded-xl p-3 border border-green-500/20">
              <div className="text-green-400 text-xs mb-2 font-medium">AI OUTPUT ✓</div>
              <p className="text-white/80 leading-relaxed">
                They're going to the store, but they're not sure what they're buying there.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
