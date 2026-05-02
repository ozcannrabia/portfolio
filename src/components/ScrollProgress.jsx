import { useScrollProgress } from '../hooks/useScrollProgress'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const raw = useScrollProgress()
  const progress = useSpring(raw, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
      style={{
        scaleX: progress,
        background: 'linear-gradient(90deg, #00d4ff, #8c52ff, #ff2d78)',
      }}
    />
  )
}
