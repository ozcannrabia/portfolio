import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-16">
      {eyebrow && (
        <p className="font-mono text-xs text-aurora-blue tracking-[0.2em] uppercase mb-3">
          — {eyebrow}
        </p>
      )}
      <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-white/50 text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
