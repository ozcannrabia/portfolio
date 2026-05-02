import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../hooks/useLang'
import { GITHUB_URL, LINKEDIN_URL } from '../utils/data'

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

function AvatarCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -20, x: -30 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <div
        className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl gradient-border glass-card mx-auto overflow-hidden"
        style={{ transform: 'rotateX(3deg) rotateY(-3deg)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(140,82,255,0.15), rgba(0,212,255,0.08))' }}
        >
          <img
  src="profile.jpg"
  alt="Rabia Özcan"
  className="w-full h-full object-cover object-top"
/>
        </div>
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
        <motion.div
          animate={{ y: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(140,82,255,0.4), transparent)' }}
        />
      </div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -right-3 glass-card px-3 py-1.5 rounded-xl text-xs font-mono text-aurora-green border border-aurora-green/20"
      >
        ✦ Open to work
      </motion.div>
    </motion.div>
  )
}

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const { lang } = useLang()

  const STATS = [
    { value: '7+', label: lang === 'tr' ? 'Proje' : 'Projects' },
    { value: '2', label: lang === 'tr' ? 'Hackathon' : 'Hackathons' },
    { value: 'B1', label: lang === 'tr' ? 'İngilizce' : 'English' },
    { value: '∞', label: lang === 'tr' ? 'Merak' : 'Curiosity' },
  ]

const paragraphs_tr = [
  'Merhaba, ben Rabia. İzmir doğumluyum ve 23 yaşındayım. Dokuz Eylül Üniversitesi Yönetim Bilişim Sistemleri (YBS) bölümünde eğitimime devam ediyorum.',
  'Eğitimim boyunca iş süreçleri, yönetim ve teknoloji arasındaki ilişkiyi merkeze alan bir bakış açısı geliştirdim. Yapay zekâ araçlarını ve modern dijital teknolojileri aktif olarak kullanarak iş problemlerini analiz etmeye ve kullanıcı odaklı çözümler üretmeye odaklanıyorum.',
  'Teknik tarafta yazılım geliştirme ile ilgilenirken, aynı zamanda sistemlerin iş süreçlerine nasıl entegre edildiğini anlamaya ve bunu anlamlı dijital ürünlere dönüştürmeye çalışıyorum.',
  'Coğrafi bilgi sistemleri, karar destek sistemleri, proje yönetimi, e-ticaret ve e-devlet gibi alanlarda edindiğim akademik bilgiyle; teknolojiyi sadece kod yazmak için değil, gerçek değer üretmek için kullanmayı önemsiyorum.',
  'Üniversite hayatım boyunca aktif olarak projeler geliştiriyor ve GitHub üzerinden paylaşıyorum. Frontend geliştirme ve kullanıcı deneyimi (UX) tarafına özel bir ilgim var.',
]

const paragraphs_en = [
  "Hi, I'm Rabia. I'm 23 years old and originally from Izmir. I'm currently studying Management Information Systems (MIS) at Dokuz Eylül University.",
  "Throughout my education, I've developed a perspective centered on the relationship between business processes, management, and technology. I focus on analyzing business problems and creating user-centered solutions using AI tools and modern digital technologies.",
  "On the technical side, I work on software development while also aiming to understand how systems integrate into business processes and evolve into meaningful digital products.",
  "With academic knowledge in areas such as GIS, decision support systems, project management, e-commerce, and e-government, I aim to use technology not just for coding, but for creating real value.",
  "Throughout my university life, I actively develop projects and share them on GitHub. I have a strong interest in frontend development and user experience (UX).",
]

  const paragraphs = lang === 'tr' ? paragraphs_tr : paragraphs_en
  const boldLine = lang === 'tr'
    ? 'Her projeye aynı yaklaşımı benimsiyorum: çalışır, doğru ve anlamlı bir ürün ortaya koymak.'
    : 'Same approach every project: build something that works, is right, and is meaningful.'

  return (
    <SectionWrapper id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Avatar */}
          <div ref={ref} className="flex justify-center lg:justify-start lg:sticky lg:top-28">
            {inView && <AvatarCard />}
          </div>

          {/* Text */}
          <div>
            <SectionHeading
              eyebrow={lang === 'tr' ? 'Hakkımda' : 'About Me'}
              title={lang === 'tr' ? 'Dijital çözümler üreten bir YBS öğrencisi.' : 'MIS student building digital solutions.'}
            />

            <div className="space-y-4 text-white/55 font-body leading-relaxed text-sm md:text-base mb-5">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <p className="text-white/80 font-medium">{boldLine}</p>
            </div>

            {/* Social + CV */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs font-mono text-aurora-blue border border-aurora-blue/20 hover:border-aurora-blue/45 hover:text-white transition-all duration-200"
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs font-mono text-aurora-purple border border-aurora-purple/20 hover:border-aurora-purple/45 hover:text-white transition-all duration-200"
              >
                <GitHubIcon /> GitHub
              </a>
              <a href="rabia-ozcan-cv.pdf" download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-void transition-all duration-200 hover:opacity-85 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #8c52ff, #00d4ff)', color: '#fff' }}
              >
                ⬇ {lang === 'tr' ? 'CV İndir' : 'Download CV'}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="font-display font-bold text-xl md:text-2xl gradient-text">{s.value}</div>
                  <div className="font-mono text-[10px] text-white/28 tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
