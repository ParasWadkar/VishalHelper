import { motion } from 'framer-motion'
import { FiZap, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 border-t border-white/6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <FiZap className="text-white text-xs" />
            </div>
            <span className="text-lg font-bold">
              Lexi<span className="text-gradient">AI</span>
            </span>
          </div>

          {/* Center */}
          <p className="text-white/25 text-sm flex items-center gap-1.5">
            Built with <FiHeart className="text-red-400/60" size={12} /> using Claude AI
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              className="text-white/30 hover:text-white/70 transition-colors"
              whileHover={{ y: -2 }}
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              href="#"
              className="text-white/30 hover:text-white/70 transition-colors"
              whileHover={{ y: -2 }}
            >
              <FiTwitter size={18} />
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/4 text-center">
          <p className="text-white/20 text-xs">
            © 2025 LexiAI. AI-powered writing assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
