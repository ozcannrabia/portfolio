import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../hooks/useLang'

// Skill data with projects used in (instead of fake percentages)
const SKILL_GROUPS = [
  {
    category_tr: 'Frontend',
    category_en: 'Frontend',
    color: '#8c52ff',
    icon: '◈',
    skills: [
      { name: 'HTML & CSS', level: 'ileri', level_en: 'advanced', projects: ['BiP Social Arena', 'MIS Chatbot', 'Manjog'] },
      { name: 'JavaScript', level: 'ileri', level_en: 'advanced', projects: ['Superstep', 'Catify'] },
      { name: 'React', level: 'orta', level_en: 'intermediate', projects: ['BiP Social Arena', 'CV AI Scanner'] },
      { name: 'Figma', level: 'ileri', level_en: 'advanced', projects: ['Manjog UI Kit', 'CV AI Scanner'] },
    ],
  },
  {
    category_tr: 'Backend & Veri',
    category_en: 'Backend & Data',
    color: '#00d4ff',
    icon: '◉',
    skills: [
      { name: 'Python', level: 'orta', level_en: 'intermediate', projects: ['Trading Stratejisi', 'Veri Analizi'] },
      { name: 'Node.js & Express', level: 'orta', level_en: 'intermediate', projects: ['Catify', 'Superstep'] },
      { name: 'FastAPI', level: 'başlangıç', level_en: 'beginner', projects: ['BiP Social Arena'] },
      { name: 'SQL / MySQL', level: 'orta', level_en: 'intermediate', projects: ['Catify', 'Superstep'] },
    ],
  },
  {
    category_tr: 'Araçlar & Diğer',
    category_en: 'Tools & Other',
    color: '#00ff9f',
    icon: '◇',
    skills: [
      { name: 'Git & GitHub', level: 'orta', level_en: 'intermediate', projects: ['Tüm projeler'] },
      { name: 'Shopify', level: 'orta', level_en: 'intermediate', projects: ['Simi Seng (Freelance)'] },
      { name: 'Google Gemini API', level: 'başlangıç', level_en: 'beginner', projects: ['CV AI Scanner'] },
      { name: 'Canva / CapCut', level: 'ileri', level_en: 'advanced', projects: ['GDSC İçerik', 'Sosyal Medya'] },
    ],
  },
]

const LEVEL_META = {
  ileri:       { label_tr: 'İleri',       label_en: 'Advanced',     dots: 3, color: '#00ff9f' },
  orta:        { label_tr: 'Orta',        label_en: 'Intermediate', dots: 2, color: '#8c52ff' },
  başlangıç:   { label_tr: 'Başlangıç',  label_en: 'Beginner',     dots: 1, color: '#00d4ff' },
}

function LevelDots({ count, color }) {
  return (
    <span className="flex items-center gap-1">
      {[1,2,3].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i <= count ? color : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </span>
  )
}

function SkillCard({ skill, color, lang, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })
  const meta = LEVEL_META[skill.level]
  const levelLabel = lang === 'tr' ? meta.label_tr : meta.label_en
  const projectLabel = lang === 'tr' ? 'Kullanıldığı projeler' : 'Used in'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-xl p-4 hover:border-opacity-50 transition-all duration-300"
      style={{ border: `1px solid rgba(255,255,255,0.06)` }}
      whileHover={{ borderColor: color + '30' }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="font-body text-sm font-medium text-white/85">{skill.name}</span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <LevelDots count={meta.dots} color={meta.color} />
          <span className="font-mono text-[10px]" style={{ color: meta.color }}>{levelLabel}</span>
        </div>
      </div>
      <div>
        <p className="font-mono text-[10px] text-white/25 mb-1.5 tracking-wide">{projectLabel}:</p>
        <div className="flex flex-wrap gap-1">
          {skill.projects.map(p => (
            <span
              key={p}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono"
              style={{ background: `${color}10`, border: `1px solid ${color}20`, color: `${color}cc` }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CategoryBlock({ group, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })
  const category = lang === 'tr' ? group.category_tr : group.category_en

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-lg" style={{ color: group.color }}>{group.icon}</span>
        <h3 className="font-display font-bold text-base text-white">{category}</h3>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${group.color}30, transparent)` }} />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {group.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} color={group.color} lang={lang} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const { lang, t } = useLang()

  const legend = lang === 'tr'
    ? [
        { label: 'Başlangıç', dots: 1, color: '#00d4ff', desc: 'Temel seviye, öğrenme sürecinde' },
        { label: 'Orta', dots: 2, color: '#8c52ff', desc: 'Projede aktif kullanım' },
        { label: 'İleri', dots: 3, color: '#00ff9f', desc: 'Güçlü hakimiyet' },
      ]
    : [
        { label: 'Beginner', dots: 1, color: '#00d4ff', desc: 'Learning & basics' },
        { label: 'Intermediate', dots: 2, color: '#8c52ff', desc: 'Actively used in projects' },
        { label: 'Advanced', dots: 3, color: '#00ff9f', desc: 'Strong proficiency' },
      ]

  return (
    <SectionWrapper id="skills">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={lang === 'tr' ? 'Beceriler' : 'Skills'}
          title={lang === 'tr' ? 'Teknoloji yığınım.' : 'My tech stack.'}
          subtitle={lang === 'tr'
            ? 'Günlük olarak kullandığım teknolojiler ve bunları uyguladığım projeler.'
            : 'Technologies I use daily and the projects where I applied them.'}
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 mb-12"
        >
          {legend.map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <LevelDots count={l.dots} color={l.color} />
              <span className="font-mono text-xs font-semibold" style={{ color: l.color }}>{l.label}</span>
              <span className="font-mono text-[10px] text-white/25">{l.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Skill categories */}
        <div className="space-y-10">
          {SKILL_GROUPS.map(group => (
            <CategoryBlock key={group.category_en} group={group} lang={lang} />
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 p-6 glass-card rounded-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-mono text-xs text-white/30 mb-4 tracking-wider uppercase">
            {lang === 'tr' ? 'Sertifikalar' : 'Certifications'}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'Machine Learning — Miuul',
              'Python Temel Yazılım — BTK Akademi',
              'Python 101/201/301 — Turkcell',
              'Veri Bilimi & YZ — Turkcell',
              'C# 101 — İstanbul Eğitim Akademisi',
            ].map(cert => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-lg font-mono text-[11px] text-white/50 hover:text-white/80 transition-colors cursor-default"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
