import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../utils/data'
import { useLang } from '../hooks/useLang'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const { lang, toggle } = useLang()

  // i18n inline — avoids circular dep
  const navLabels = {
    tr: { home: 'Ana Sayfa', about: 'Hakkımda', experience: 'Deneyim', events: 'Etkinlikler', projects: 'Projeler', skills: 'Beceriler', education: 'Eğitim', contact: 'İletişim', letsTalk: 'Konuşalım' },
    en: { home: 'Home', about: 'About', experience: 'Experience', events: 'Events', projects: 'Projects', skills: 'Skills', education: 'Education', contact: 'Contact', letsTalk: "Let's talk" },
  }
  const labels = navLabels[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-20 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass border-b border-white/5' : ''}`}
      >
        <button onClick={() => handleNav('#hero')} className="font-display font-bold text-xl tracking-tight">
          <span className="gradient-text">R.</span>
          <span className="text-white/25 font-light text-sm ml-1 font-mono">dev</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <li key={link.labelKey}>
              <button
                onClick={() => handleNav(link.href)}
                className={`relative font-body text-sm tracking-wide transition-colors duration-200 ${active === link.href.slice(1) ? 'text-white' : 'text-white/35 hover:text-white/75'}`}
              >
                {labels[link.labelKey] || link.labelKey}
                {active === link.href.slice(1) && (
                  <motion.span layoutId="nav-indicator" className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-aurora-blue to-aurora-purple" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono border border-white/10 text-white/45 hover:text-white hover:border-white/25 transition-all duration-200"
          >
            <span className={lang === 'tr' ? 'text-aurora-purple' : 'text-white/30'}>TR</span>
            <span className="text-white/15 mx-0.5">|</span>
            <span className={lang === 'en' ? 'text-aurora-blue' : 'text-white/30'}>EN</span>
          </button>
          <button onClick={() => handleNav('#contact')}
            className="flex items-center gap-2 px-5 py-2 rounded-full glass-card text-sm font-body font-medium text-aurora-purple hover:text-white transition-colors duration-200 gradient-border"
          >
            {labels.letsTalk} <span className="text-xs">↗</span>
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border border-white/10 text-white/45"
          >
            <span className={lang === 'tr' ? 'text-aurora-purple' : 'text-white/30'}>TR</span>
            <span className="text-white/15">|</span>
            <span className={lang === 'en' ? 'text-aurora-blue' : 'text-white/30'}>EN</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-white origin-center" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-4 h-px bg-white/60" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-white origin-center" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-7"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href)}
                className="font-display text-2xl font-bold text-white/65 hover:text-white transition-colors"
              >
                {labels[link.labelKey]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
