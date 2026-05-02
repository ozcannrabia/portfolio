import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { EDUCATION } from '../utils/data'
import { useLang } from '../hooks/useLang'

function TimelineItem({ item, index, isLast, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

  const degree = lang === 'tr' ? item.degree_tr : item.degree_en
  const description = lang === 'tr' ? item.description_tr : item.description_en

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row items-start`}
    >
      <div className="flex-1 glass-card rounded-2xl p-6 group hover:border-aurora-purple/30 transition-all duration-300"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-aurora-blue transition-colors">
              {degree}
            </h3>
            <p className="font-mono text-xs text-aurora-purple mt-1">{item.school}</p>
          </div>
          <span className="text-2xl flex-shrink-0">{item.icon}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono text-white/40"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {item.year}
          </div>
          {item.extra && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono text-aurora-green"
              style={{ background: 'rgba(0,255,159,0.06)', border: '1px solid rgba(0,255,159,0.15)' }}
            >
              {item.extra}
            </div>
          )}
        </div>

        <p className="font-body text-sm text-white/50 leading-relaxed">{description}</p>
      </div>

      <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: 40 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-4 h-4 rounded-full z-10 mt-5"
          style={{ background: 'linear-gradient(135deg, #8c52ff, #00d4ff)', boxShadow: '0 0 12px rgba(140,82,255,0.6)' }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 w-px origin-top mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(140,82,255,0.4), rgba(140,82,255,0.05))' }}
          />
        )}
      </div>

      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

export default function EducationSection() {
  const { lang, t } = useLang()

  return (
    <SectionWrapper id="education">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow={t.education.eyebrow}
          title={t.education.title}
        />
        <div className="flex flex-col gap-6">
          {EDUCATION.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === EDUCATION.length - 1}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
