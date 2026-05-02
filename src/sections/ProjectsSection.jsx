import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { PROJECTS, GITHUB_URL } from '../utils/data'
import { useLang } from '../hooks/useLang'

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

const EMOJIS = ['🤖', '🌐', '🐾', '📊', '💬', '🍜', '📈']

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({ images, startIndex, title, color, onClose }) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white text-xl transition-colors"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
      >×</button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
          style={{ border: `1px solid ${color}30` }}
        >
          <img
            src={images[current]}
            alt={`${title} — ${current + 1}`}
            className="block max-w-full max-h-[80vh] object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
          >
            <span className="font-mono text-xs text-white/50">{title}</span>
            {images.length > 1 && (
              <span className="font-mono text-xs text-white/40">{current + 1} / {images.length}</span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white text-2xl transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >‹</button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white text-2xl transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >›</button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i) }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: i === current ? color : 'rgba(255,255,255,0.25)',
                transform: i === current ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Project Card ──────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxStart, setLightboxStart] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { lang, t } = useLang()

  // Support both `image` (string) and `images` (array)
  const images = project.images
    ? project.images
    : project.image
    ? [project.image]
    : []

  const hasImages = images.length > 0
  const title = lang === 'tr' ? project.title_tr : project.title_en
  const description = lang === 'tr' ? project.description_tr : project.description_en

  // Auto-advance on hover
  useEffect(() => {
    if (!hovered || images.length <= 1) return
    const id = setInterval(() => setImgIndex(i => (i + 1) % images.length), 1800)
    return () => clearInterval(id)
  }, [hovered, images.length])

  useEffect(() => { if (!hovered) setImgIndex(0) }, [hovered])

  const openLightbox = (e) => {
    e.stopPropagation()
    if (!hasImages) return
    setLightboxStart(imgIndex)
    setLightboxOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            startIndex={lightboxStart}
            title={title}
            color={project.color}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group rounded-2xl glass-card overflow-hidden cursor-pointer flex flex-col"
        style={{
          border: `1px solid ${hovered ? project.color + '50' : 'rgba(255,255,255,0.06)'}`,
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered ? `0 8px 40px ${project.color}20` : 'none',
        }}
      >
        {/* Image area */}
        <div
          className="relative h-48 overflow-hidden flex-shrink-0 cursor-zoom-in"
          style={{ background: `linear-gradient(135deg, ${project.color}18, ${project.color}05)` }}
          onClick={openLightbox}
        >
          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={images[imgIndex]}
                src={images[imgIndex]}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s ease' }}
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}30`,
                  boxShadow: hovered ? `0 0 40px ${project.color}30` : 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {EMOJIS[index % EMOJIS.length]}
              </motion.div>
            </div>
          )}

          {/* Overlay gradient */}
          {hasImages && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
          )}

          {/* Scan lines */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)' }}
          />

          {/* Featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider pointer-events-none"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}50`, color: project.color }}
            >
              {t.projects.featured}
            </div>
          )}

          {/* Dot indicators (multiple images) */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 pointer-events-none">
              {images.map((_, i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === imgIndex ? '14px' : '5px',
                    height: '5px',
                    background: i === imgIndex ? project.color : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Expand hint on hover */}
          {hasImages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono text-white/60 pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
            >
              ⊕ {lang === 'tr' ? 'Büyüt' : 'Expand'}
            </motion.div>
          )}

          {/* GitHub icon */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            title="GitHub"
          >
            <GitHubIcon />
          </a>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display font-bold text-lg text-white mb-2 leading-tight">
            {title}
          </h3>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wide"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors"
              >
                <span>{t.projects.liveDemo}</span>
                <span>↗</span>
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-aurora-purple transition-colors"
            >
              <GitHubIcon />
              <span>{t.projects.github}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <motion.div
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />
      </motion.div>
    </>
  )
}

export default function ProjectsSection() {
  const { t } = useLang()

  return (
    <SectionWrapper id="projects">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-white/40 hover:text-aurora-purple transition-colors"
          >
            <GitHubIcon />
            {t.projects.viewAll}
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
