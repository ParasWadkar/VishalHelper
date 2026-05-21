import { useRef } from 'react'
import { Toaster } from 'react-hot-toast'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Editor from './components/Editor'
import Analytics from './components/Analytics'
import Footer from './components/Footer'

export default function App() {
  const editorRef = useRef(null)

  const scrollToEditor = () => {
    document.getElementById('editor')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-mesh min-h-screen relative">
      <Particles />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(10, 21, 32, 0.95)',
            color: '#fff',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(20px)',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />

      <div className="relative z-10">
        <Navbar onTryNow={scrollToEditor} />
        <Hero onTryNow={scrollToEditor} />
        <Features />
        <Editor />
        <Analytics />
        <Footer />
      </div>
    </div>
  )
}
