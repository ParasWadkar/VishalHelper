import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiTrendingUp, FiUsers, FiClock, FiStar } from 'react-icons/fi'

function CountUp({ target, duration = 1800, suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

const STATS = [
  {
    icon: FiTrendingUp,
    label: 'Words Corrected Today',
    value: 248931,
    suffix: '+',
    color: 'text-green-400',
    bg: 'from-green-500/10 to-emerald-500/5',
    border: 'border-green-500/15',
  },
  {
    icon: FiStar,
    label: 'Accuracy Rate',
    value: 99,
    suffix: '.2%',
    color: 'text-emerald-400',
    bg: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/15',
  },
  {
    icon: FiUsers,
    label: 'Active Users',
    value: 12847,
    suffix: '',
    color: 'text-teal-400',
    bg: 'from-teal-500/10 to-cyan-500/5',
    border: 'border-teal-500/15',
  },
  {
    icon: FiClock,
    label: 'Avg Processing Time',
    value: 0,
    suffix: '0.31s',
    color: 'text-cyan-400',
    bg: 'from-cyan-500/10 to-blue-500/5',
    border: 'border-cyan-500/15',
    static: '0.31s',
  },
]

const ACTIVITY = [
  { user: 'Sarah K.', action: 'Fixed grammar in cover letter', mode: 'Grammar', time: '2s ago' },
  { user: 'Marcus T.', action: 'Rewrote product description', mode: 'Rewrite', time: '7s ago' },
  { user: 'Priya M.', action: 'Improved email tone', mode: 'Tone', time: '12s ago' },
  { user: 'James L.', action: 'Made CV professional', mode: 'Professional', time: '18s ago' },
  { user: 'Elena R.', action: 'Fixed 14 grammar errors', mode: 'Grammar', time: '25s ago' },
]

export default function Analytics() {
  return (
    <section id="analytics" className="relative py-24 px-4 sm:px-6">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-green-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-14"
        >
          <span className="inline-block text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 glass px-4 py-1.5 rounded-full border border-green-500/20">
            Live Analytics
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Trusted by <span className="text-gradient">thousands</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Real-time data from our AI writing engine. Every second, LexiAI is helping
            someone write better.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-6 bg-gradient-to-br ${stat.bg} border ${stat.border}`}
              whileHover={{ y: -3 }}
            >
              <div className={`w-9 h-9 rounded-xl glass flex items-center justify-center mb-4 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <div className={`text-3xl font-black mb-1 ${stat.color}`}>
                {stat.static ? stat.static : (
                  <CountUp target={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Live activity feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl border border-white/8 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/60 text-sm font-semibold">Live Activity Feed</span>
            <span className="ml-auto text-white/25 text-xs">Updated in real-time</span>
          </div>
          <div className="divide-y divide-white/4">
            {ACTIVITY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/20 flex items-center justify-center text-xs font-bold text-green-300 flex-shrink-0">
                  {item.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-white/70 text-sm font-medium">{item.user}</span>
                  <span className="text-white/35 text-sm"> {item.action}</span>
                </div>
                <span className="bg-green-500/10 text-green-400/80 text-xs px-2 py-0.5 rounded-full border border-green-500/15 flex-shrink-0">
                  {item.mode}
                </span>
                <span className="text-white/25 text-xs flex-shrink-0">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
