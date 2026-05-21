import { motion } from 'framer-motion'
import { FiCheckCircle, FiActivity, FiCpu, FiRefreshCw, FiZap, FiGlobe } from 'react-icons/fi'

const FEATURES = [
  {
    icon: FiCheckCircle,
    title: 'Grammar Correction',
    desc: 'Instantly detects and fixes grammar, punctuation, and spelling errors with surgical precision.',
    color: 'from-green-500 to-emerald-600',
    glow: 'group-hover:shadow-green-500/20',
  },
  {
    icon: FiActivity,
    title: 'Tone Detection',
    desc: 'AI identifies the emotional tone of your text and suggests improvements for maximum impact.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'group-hover:shadow-emerald-500/20',
  },
  {
    icon: FiCpu,
    title: 'Smart Suggestions',
    desc: 'Context-aware rewriting suggestions that understand nuance, not just surface-level fixes.',
    color: 'from-teal-500 to-cyan-600',
    glow: 'group-hover:shadow-teal-500/20',
  },
  {
    icon: FiRefreshCw,
    title: 'AI Rewrite',
    desc: 'Complete rewrites that preserve your intent while dramatically improving clarity and flow.',
    color: 'from-cyan-500 to-blue-500',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  {
    icon: FiZap,
    title: 'Real-time Processing',
    desc: 'Sub-second AI processing powered by state-of-the-art language models for instant results.',
    color: 'from-green-400 to-lime-500',
    glow: 'group-hover:shadow-lime-500/20',
  },
  {
    icon: FiGlobe,
    title: 'Multi-mode Support',
    desc: 'Switch between Grammar, Professional, Casual, Tone, and Improve modes with one click.',
    color: 'from-lime-500 to-green-600',
    glow: 'group-hover:shadow-green-500/20',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 glass px-4 py-1.5 rounded-full border border-green-500/20">
            Capabilities
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-5">
            Everything your writing{' '}
            <span className="text-gradient">needs</span>
          </h2>
          <p className="text-white/45 text-lg max-w-2xl mx-auto">
            Six powerful AI modes, each fine-tuned for a specific writing goal.
            Professional, casual, or perfectly grammatical — LexiAI has you covered.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`group glass rounded-2xl p-6 border border-white/5 hover:border-green-500/20 transition-all duration-400 hover:shadow-xl ${feat.glow} cursor-default`}
              whileHover={{ y: -4 }}
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-5 shadow-lg`}>
                <feat.icon className="text-white text-lg" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feat.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
