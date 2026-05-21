import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCopy, FiDownload, FiTrash2, FiClipboard, FiMic,
  FiZap, FiCheckCircle, FiAlertCircle, FiChevronDown
} from 'react-icons/fi'
import toast from 'react-hot-toast'

const MODES = [
  { id: 'grammar', label: 'Grammar Fix', desc: 'Correct grammar & spelling', icon: '✓' },
  { id: 'improve', label: 'Improve', desc: 'Boost clarity & flow', icon: '↑' },
  { id: 'professional', label: 'Professional', desc: 'Formal business tone', icon: '◆' },
  { id: 'casual', label: 'Casual', desc: 'Friendly conversational tone', icon: '☺' },
  { id: 'tone', label: 'Tone Enhance', desc: 'Detect & enhance tone', icon: '◎' },
  { id: 'rewrite', label: 'Full Rewrite', desc: 'Complete AI rewrite', icon: '⟳' },
]

const LOADING_MESSAGES = [
  'Analyzing sentence structure...',
  'Detecting grammar patterns...',
  'Improving clarity...',
  'Applying AI corrections...',
  'Enhancing word choice...',
  'Polishing your text...',
  'Almost done...',
]

function ScoreRing({ score }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score > 70 ? '#22c55e' : score > 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="64" height="64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle
          cx="32" cy="32" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <span className="text-sm font-bold text-white z-10">{score}</span>
    </div>
  )
}

export default function Editor() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [selectedMode, setSelectedMode] = useState('grammar')
  const [modeOpen, setModeOpen] = useState(false)
  const loadingInterval = useRef(null)
  const outputRef = useRef(null)

  const currentMode = MODES.find(m => m.id === selectedMode)

  const startLoadingMessages = () => {
    let i = 0
    setLoadingMsg(LOADING_MESSAGES[0])
    loadingInterval.current = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length
      setLoadingMsg(LOADING_MESSAGES[i])
    }, 900)
  }

  const stopLoadingMessages = () => {
    clearInterval(loadingInterval.current)
    setLoadingMsg('')
  }

  const handleProcess = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text first')
      return
    }
    setLoading(true)
    setResult(null)
    startLoadingMessages()

    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, mode: selectedMode }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()
      setResult(data)
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    } catch (err) {
      toast.error('Failed to process text. Is the backend running?')
      console.error(err)
    } finally {
      setLoading(false)
      stopLoadingMessages()
    }
  }, [inputText, selectedMode])

  const handleCopy = () => {
    if (!result?.corrected_text) return
    navigator.clipboard.writeText(result.corrected_text)
    toast.success('Copied to clipboard!')
  }

  const handleDownload = () => {
    if (!result?.corrected_text) return
    const blob = new Blob([result.corrected_text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lexiai-${selectedMode}-result.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
      toast.success('Pasted from clipboard')
    } catch {
      toast.error('Could not access clipboard')
    }
  }

  const charCount = inputText.length
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0

  return (
    <section id="editor" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-12"
        >
          <span className="inline-block text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 glass px-4 py-1.5 rounded-full border border-green-500/20">
            AI Editor
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Write. Paste. <span className="text-gradient">Transform.</span>
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Paste any text, choose an AI mode, and watch LexiAI perfect your writing in seconds.
          </p>
        </motion.div>

        {/* Mode selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                selectedMode === mode.id
                  ? 'bg-green-500/20 border-green-500/50 text-green-300 glow-green-sm'
                  : 'glass border-white/8 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </motion.div>

        {/* Split editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {/* Input panel */}
          <div className="glass-strong rounded-2xl border border-white/8 overflow-hidden flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/6">
              <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Your Text</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePaste}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/50 hover:text-white text-xs transition-all"
                  title="Paste from clipboard"
                >
                  <FiClipboard size={12} />
                  Paste
                </button>
                <button
                  onClick={() => { setInputText(''); setResult(null) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/50 hover:text-red-400 text-xs transition-all"
                  title="Clear text"
                >
                  <FiTrash2 size={12} />
                  Clear
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/50 hover:text-green-400 text-xs transition-all"
                  title="Voice input (coming soon)"
                >
                  <FiMic size={12} />
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Paste or type your text here...\n\nExample: "their going to the store but there not sure what there buying"`}
              className="flex-1 min-h-[280px] w-full bg-transparent px-5 py-4 text-white/80 placeholder-white/20 text-sm leading-relaxed font-mono focus:ring-0"
            />

            {/* Footer bar */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/6">
              <span className="text-white/30 text-xs">
                {wordCount} words · {charCount} chars
              </span>
              <motion.button
                onClick={handleProcess}
                disabled={loading || !inputText.trim()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  loading || !inputText.trim()
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white glow-green-sm hover:from-green-400 hover:to-green-500'
                }`}
                whileHover={!loading && inputText.trim() ? { scale: 1.03 } : {}}
                whileTap={!loading && inputText.trim() ? { scale: 0.97 } : {}}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiZap size={14} />
                    Analyze with AI
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Output panel */}
          <div ref={outputRef} className="glass-strong rounded-2xl border border-white/8 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/6">
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">AI Output</span>
                {result && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/30 font-medium">
                    {currentMode?.label}
                  </span>
                )}
              </div>
              {result && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/50 hover:text-white text-xs transition-all"
                  >
                    <FiCopy size={12} />
                    Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-white/50 hover:text-green-400 text-xs transition-all"
                  >
                    <FiDownload size={12} />
                    Download
                  </button>
                </div>
              )}
            </div>

            {/* Output content */}
            <div className="flex-1 min-h-[280px] px-5 py-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-4"
                  >
                    {/* AI orb */}
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center glow-green">
                        <FiZap className="text-white" size={18} />
                      </div>
                    </div>
                    <p className="text-green-400/80 text-sm font-medium animate-pulse">{loadingMsg}</p>
                    {/* Skeleton lines */}
                    <div className="w-full space-y-2 mt-4">
                      {[100, 85, 92, 70, 78].map((w, i) => (
                        <div
                          key={i}
                          className="h-3 rounded-full shimmer-effect bg-white/5"
                          style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                  >
                    {/* Corrected text */}
                    <p className="text-white/85 text-sm leading-relaxed font-mono">
                      {result.corrected_text}
                    </p>

                    {/* Tone tag */}
                    {result.tone_detected && (
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs">Tone detected:</span>
                        <span className="bg-cyan-500/15 text-cyan-300 text-xs px-2 py-0.5 rounded-full border border-cyan-500/20 capitalize">
                          {result.tone_detected}
                        </span>
                      </div>
                    )}

                    {/* Changes list */}
                    {result.changes?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-white/35 text-xs uppercase tracking-wider font-semibold">
                          Changes Made ({result.changes.length})
                        </p>
                        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                          {result.changes.slice(0, 8).map((change, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-2 text-xs"
                            >
                              <FiCheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={11} />
                              <span className="text-red-400/70 line-through">{change.original}</span>
                              <span className="text-white/30">→</span>
                              <span className="text-green-300/80">{change.corrected}</span>
                              <span className="text-white/20 ml-auto capitalize">{change.type}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center gap-3 text-center"
                  >
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10">
                      <FiZap className="text-white/20" size={20} />
                    </div>
                    <p className="text-white/25 text-sm">
                      Your AI-corrected text will appear here.
                      <br />
                      Enter text and click <span className="text-green-400/60">Analyze with AI</span>.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Score footer */}
            {result && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-5 py-3 border-t border-white/6 flex items-center justify-between"
              >
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-wider font-semibold">Improvement Score</p>
                  <p className="text-white/25 text-xs mt-0.5">
                    {result.score < 20 ? 'Text was already great!' :
                     result.score < 50 ? 'Minor improvements made' :
                     result.score < 80 ? 'Significant improvements' : 'Major transformation'}
                  </p>
                </div>
                <ScoreRing score={result.score} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
