import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../hooks/useLang'

const EXPERIENCES = [
  {
    id: 1,
    role_tr: 'Satış Danışmanı',
    role_en: 'Sales Consultant',
    company: 'SuperStep',
    location_tr: 'İzmir',
    location_en: 'Izmir',
    period: 'May 2023 – Sep 2023',
    type: 'part-time',
    color: '#f7a14a',
    icon: '🛍️',
    bullets_tr: [
      'Öğrencilik yıllarımda eğitimime katkı sağlamak amacıyla çalıştım.',
      'Takım çalışması ve müşteri memnuniyeti konusunda deneyim kazandım.',
    ],
    bullets_en: [
      'Worked to support my education during university years.',
      'Gained experience in teamwork and customer satisfaction.',
    ],
  },
  {
    id: 2,
    role_tr: 'Sosyal Medya Koordinatörü',
    role_en: 'Social Media Coordinator',
    company: 'Google Developer Student Clubs',
    period: 'Oct 2024 – Mar 2025',
    type: 'volunteer',
    color: '#4285f4',
    icon: '📱',
    bullets_tr: [
      'Canva ve Adobe ile sosyal medya içerikleri tasarladım.',
      'Post hazırlama, fotoğraf & video çekim/edit süreçlerini yürüttüm.',
      'Topluluk etkinlikleri için içerik stratejisi geliştirdim.',
    ],
    bullets_en: [
      'Designed social media content using Canva and Adobe tools.',
      'Managed post creation, photo & video shooting/editing processes.',
      'Developed content strategy for community events.',
    ],
  },
  {
    id: 3,
    role_tr: 'Yazılım Geliştirme Ekibi Üyesi',
    role_en: 'Software Development Team Member',
    company: 'YBS Topluluğu',
    period: 'Apr 2025 – May 2025',
    type: 'project',
    color: '#8c52ff',
    icon: '💻',
    bullets_tr: [
      'MIS Chatbot ve Meslek Karşılaştırma Analizi projelerinde görev aldım.',
      'Veri çekimi için PyCharm üzerinde web scraping çalışmaları yaptım.',
      'Chatbot arayüzünü HTML & CSS ile geliştirdim (dark/light mod, SSS, yeni sohbet vb.)',
    ],
    bullets_en: [
      'Worked on MIS Chatbot and Career Comparison Analysis projects.',
      'Conducted web scraping work on PyCharm for data collection.',
      'Developed chatbot UI with HTML & CSS (dark/light mode, FAQ, new chat, etc.)',
    ],
  },
  {
    id: 4,
    role_tr: 'Online Staj – Python & Yapay Zekâ',
    role_en: 'Online Internship – Python & AI',
    company: 'Acun Medya Akademi',
    period: 'Apr 2025 – Jun 2025',
    type: 'internship',
    color: '#00d4ff',
    icon: '🤖',
    bullets_tr: [
      'Python ve yapay zekâ temelleri üzerine eğitim aldım.',
      'Küçük ölçekli projeler ve algoritma mantığı üzerinde çalıştım.',
    ],
    bullets_en: [
      'Received training on Python and AI fundamentals.',
      'Worked on small-scale projects and algorithm logic.',
    ],
  },
  {
    id: 5,
    role_tr: 'E-Ticaret & Web Yönetimi Asistanı',
    role_en: 'E-Commerce & Web Management Assistant',
    company: 'Simi Seng',
    period_tr: 'Freelancer',
    period_en: 'Freelance',
    type: 'freelance',
    color: '#ff6b9d',
    icon: '🛒',
    bullets_tr: [
      'Shopify üzerinde ürün yönetimi ve site düzenlemeleri yaptım.',
      'HTML & CSS ile arayüz geliştirmeleri gerçekleştirdim.',
      'Yapay zekâ araçları ile görsel optimizasyon yaptım.',
    ],
    bullets_en: [
      'Managed products and performed site edits on Shopify.',
      'Developed UI improvements with HTML & CSS.',
      'Optimized visuals using AI tools.',
    ],
  },
  {
    id: 6,
    role_tr: 'Teknolojinle Geleceğini Kodla – Katılımcı',
    role_en: 'Code Your Future with Technology – Participant',
    company: 'Cisco Networking Academy & Turkishe',
    period: 'Mar 2026 – May 2026',
    period_en: 'Mar 2026 – Present',
    type: 'program',
    color: '#00ff9f',
    icon: '📡',
    bullets_tr: [
      'Yapay zekâ, siber güvenlik, liderlik ve dijital okuryazarlık eğitimleri.',
    ],
    bullets_en: [
      'Training in AI, cybersecurity, leadership and digital literacy.',
    ],
  },
  {
    id: 7,
    role_tr: 'Womentum Eğitim Programı – Katılımcı',
    role_en: 'Womentum Training Program – Participant',
    company: 'Enerjisa Üretim & imece',
    period: 'Apr 2026 – Devam ediyor',
    period_en: 'Apr 2026 – Present',
    type: 'program',
    color: '#ff9f43',
    icon: '🌱',
    bullets_tr: [
      'Sürdürülebilirlik ve dijital dönüşüm odaklı eğitim ve networking süreci.',
      '3500 kadın öğrenciye yönelik gelişim programına seçildim.',
    ],
    bullets_en: [
      'Education and networking focused on sustainability and digital transformation.',
      'Selected for a development program for 3,500 female students.',
    ],
  },
]

const TYPE_LABELS = {
  tr: { 'part-time': 'Yarı Zamanlı', volunteer: 'Gönüllü', project: 'Proje', internship: 'Staj', freelance: 'Freelance', program: 'Program' },
  en: { 'part-time': 'Part-time', volunteer: 'Volunteer', project: 'Project', internship: 'Internship', freelance: 'Freelance', program: 'Program' },
}

function ExperienceCard({ exp, index, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })

  const role = lang === 'tr' ? exp.role_tr : exp.role_en
  const bullets = lang === 'tr' ? exp.bullets_tr : exp.bullets_en
  const period = lang === 'en' && exp.period_en ? exp.period_en : (exp.period || exp.period_tr)
  const typeLabel = TYPE_LABELS[lang][exp.type]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* Left: icon + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.06 + 0.15, type: 'spring', stiffness: 280 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
        >
          {exp.icon}
        </motion.div>
        {index < EXPERIENCES.length - 1 && (
          <div className="flex-1 w-px mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)' }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className="pb-8 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-display font-bold text-base text-white leading-tight">{role}</h3>
            <p className="font-mono text-xs mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px]"
              style={{ background: `${exp.color}12`, border: `1px solid ${exp.color}25`, color: exp.color }}
            >
              {typeLabel}
            </span>
            <span className="font-mono text-[11px] text-white/30 whitespace-nowrap">{period}</span>
          </div>
        </div>
        <ul className="space-y-1.5 mt-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm font-body text-white/50 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const { lang } = useLang()

  return (
    <SectionWrapper id="experience">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow={lang === 'tr' ? 'Deneyim' : 'Experience'}
          title={lang === 'tr' ? 'Çalışma geçmişim.' : 'My work history.'}
          subtitle={lang === 'tr'
            ? 'Stajlar, freelance projeler ve topluluk çalışmalarından edindiğim gerçek iş deneyimlerim.'
            : 'From internships, freelance projects, and community work to the real-world experience I’ve gained.'}
        />
        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
