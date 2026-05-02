import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { GITHUB_URL, LINKEDIN_URL } from '../utils/data'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const ROLES_TR = ['Frontend Geliştirici', 'YBS Öğrencisi', 'UI/UX Tasarımcısı', 'Kullanıcı deneyimi odaklı dijital çözümler üreten']
const ROLES_EN = ['Frontend Developer', 'MIS Student', 'UI/UX Designer', 'Building user-centered digital solutions']

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { lang } = useLang()

  const ROLES = lang === 'tr' ? ROLES_TR : ROLES_EN

  useEffect(() => { setDisplayed(''); setRoleIndex(0); setDeleting(false) }, [lang])

  useEffect(() => {
    const target = ROLES[roleIndex]
    let t
    if (!deleting && displayed.length < target.length) t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
    else if (!deleting && displayed.length === target.length) t = setTimeout(() => setDeleting(true), 2400)
    else if (deleting && displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    else if (deleting && displayed.length === 0) { setDeleting(false); setRoleIndex(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIndex, ROLES])

  useEffect(() => {
    const onMove = e => setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <ThreeBackground mouseX={mousePos.x} mouseY={mousePos.y} />
      </Suspense>

      {/* Overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 60%, transparent 0%, #030508 100%)' }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(140,82,255,0.08) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(70px)' }} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-8">

        {/* ── TOP SECTION: Avatar + Identity ── */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12 mb-10">

          {/* Avatar — pixel art with glow frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-1.5 rounded-3xl opacity-60"
              style={{ background: 'linear-gradient(135deg, #8c52ff, #00d4ff)', filter: 'blur(12px)' }} />
            {/* Avatar container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden"
              style={{ border: '2px solid rgba(140,82,255,0.4)', boxShadow: '0 0 0 1px rgba(0,212,255,0.15)' }}
            >
              <img
                src="avatar.png"
                alt="Rabia Özcan avatar"
                className="w-full h-full object-cover object-top"
                style={{ imageRendering: 'auto' }}
              />
              {/* Subtle scanline overlay for consistency with dark theme */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)' }}
              />
            </div>

            {/* Online status badge */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-[10px] font-mono"
              style={{ border: '1px solid rgba(0,255,159,0.25)', background: 'rgba(0,255,159,0.06)', color: '#00ff9f' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-aurora-green" />
              {lang === 'tr' ? 'Müsait' : 'Available'}
            </motion.div>
          </motion.div>

          {/* Identity block */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="font-mono text-xs text-white/30 tracking-widest mb-2 uppercase"
            >
              {lang === 'tr' ? '— Merhaba, beni tanıyın' : "— Hello, I'm"}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold leading-none tracking-tight mb-3"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -2}px)`,
                transition: 'transform 0.5s ease',
              }}
            >
              <span className="gradient-text">Rabia</span>
              <span className="text-white"> Özcan</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="font-mono text-sm md:text-base mb-4 h-6 flex items-center gap-2"
            >
              <span className="text-aurora-purple/40">/</span>
              <span className="text-aurora-purple">{displayed}</span>
              <span className="text-aurora-blue animate-pulse text-lg leading-none">_</span>
            </motion.div>

            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-white/40"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              📍 {lang === 'tr' ? 'İzmir & İstanbul, Türkiye' : 'Izmir & Istanbul, Turkey'}
            </motion.div>
          </div>
        </div>

        {/* ── INTRO TEXT ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="max-w-2xl mb-3"
        >
          <p className="font-body text-white/40 text-sm md:text-base leading-relaxed">
            {lang === 'tr'
              ? 'Bu benim akademik yolculuğum. Projelerimi, deneyimlerimi ve büyüme sürecimi keşfetmek için aşağı kaydırın.'
              : "This is my academic journey. Scroll down to explore my projects, experiences, and growth."}
          </p>
        </motion.div>

        {/* ── CTA ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative px-6 py-3 rounded-full font-body font-semibold text-white overflow-hidden text-sm"
            style={{ background: 'linear-gradient(135deg, #8c52ff, #00d4ff)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {lang === 'tr' ? 'Projelerimi Keşfet' : 'Explore My Projects'}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #8c52ff)' }} />
          </button>

          <a href="rabia-ozcan-cv.pdf" download
            className="flex items-center gap-2 px-5 py-3 rounded-full font-body font-medium text-white/60 hover:text-white text-sm glass-card gradient-border transition-all duration-200"
          >
            ⬇ {lang === 'tr' ? 'CV İndir' : 'Download CV'}
          </a>

          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-full font-mono text-xs text-white/35 hover:text-white transition-colors duration-200 glass-card"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <GitHubIcon />
            ozcannrabia
          </a>

          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 rounded-full font-mono text-xs text-white/35 hover:text-aurora-blue transition-colors duration-200 glass-card"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </motion.div>

        {/* ── MINI STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center gap-6 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {(lang === 'tr'
            ? [['7+', 'Proje'], ['2', 'Hackathon'], ['3+', 'Yıl Deneyim'], ['B1', 'İngilizce']]
            : [['7+', 'Projects'], ['2', 'Hackathons'], ['3+', 'Yrs Exp.'], ['B1', 'English']]
          ).map(([val, lbl]) => (
            <div key={lbl} className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-xl gradient-text">{val}</span>
              <span className="font-mono text-[10px] text-white/25 tracking-wide">{lbl}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="font-mono text-[9px] text-white/18 tracking-widest group-hover:text-white/40 transition-colors">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-aurora-purple/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
