import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../hooks/useLang'

const EVENTS = [
  {
    id: 1,
    title_tr: '"Turkcell Geleceği Yazanlar" CodeNight ',
    title_en: '"Turkcell Geleceği Yazanlar"CodeNight ',
    date: '2025',
    tag_tr: 'Codenight',
    tag_en: 'Codenight',
    desc_tr: 'BiP Social Arena projesini geliştirdiğimiz codenight etkiniliği. Challenge tabanlı puanlama ve liderlik tablosu mekanikleri içeren sosyal etkileşim platformu tasarladık.',
    desc_en: 'Codenight event where we built BiP Social Arena — a social interaction platform with challenge-based scoring and leaderboard mechanics.',
    image: 'images/events/turkcell-codenight.jpg',
    color: '#00d4ff',
    icon: '⚡',
  },
  {
    id: 2,
    title_tr: 'Paribu CodeNight ',
    title_en: 'Paribu CodeNight',
    date: '2025',
    tag_tr: 'Codenight',
    tag_en: 'Codenight',
    desc_tr: 'İYTE Yazılım Topluluğu önülüğünde oluşturulan bu etkinlikte, Python ile teknik indikatörler ve backtesting yöntemleri kullanan algoritmik trading stratejisi geliştirdik.',
    desc_en: 'At this event organized by the IZTECH Software Community, we developed an algorithmic trading strategy using Python, incorporating technical indicators and backtesting methods.',
    image: 'images/events/paribu-codenight.jpg',
    color: '#ffd32a',
    icon: '📈',
  },
  {
    id: 3,
    title_tr: "MII'25 Sempozyumu",
    title_en: "MII'25 Symposium",
    date: '2025',
    tag_tr: 'Sempozyum',
    tag_en: 'Symposium',
    desc_tr: 'YBS Topluluğu ekibiyle geliştirdiğimiz MIS Chatbot & Meslek Karşılaştırma projesini akademik ortamda sunduğumuz etkinlik.',
    desc_en: 'Academic event where we presented the MIS Chatbot & Career Comparison project developed with the MIS Community team.',
    image: 'images/events/mii25.jpg',
    color: '#8c52ff',
    icon: '🎓',
  },
  {
  id: 4,
  title_tr: 'GDSC Unity Etkinliği',
  title_en: 'GDSC Unity Event',
  date_tr: '2024 – 2025',
  date_en: '2024 – 2025',
  tag_tr: 'Etkinlik',
  tag_en: 'Event',
  desc_tr: 'Google Developer Student Clubs bünyesinde Unity eğitim programında Sosyal Medya Koordinatörü olarak görev aldım ve syntax hataları kontrol etme süreçlerinde destek sağladım.',
  desc_en: 'Served as Social Media Coordinator in the Unity training program under Google Developer Student Clubs and supported syntax error checking processes.',
  image: 'images/events/gdsc-unity.jpg',
  color: '#4285f4',
  icon: '🎮',
},
{
  id: 5,
  title_tr: 'Catify Proje Sunumu',
  title_en: 'Catify Project Presentation',
  date_tr: '2025',
  date_en: '2025',
  tag_tr: 'Akademik Sunum',
  tag_en: 'Academic Presentation',
  desc_tr: 'Bilişim Sistemleri Analizi ve Tasarımı dersi kapsamında Catify barınak yönetim sistemi projesini sınıfa sundum.',
  desc_en: 'Presented the Catify animal shelter management system project as part of the Information Systems Analysis and Design course.',
  image: 'images/events/catify-sunum.jpg',
  color: '#ff6b6b',
  icon: '🐾',
},
  {
    id: 6,
    title_tr: 'Google Developer Student Clubs',
    title_en: 'Google Developer Student Clubs',
    date_tr: 'Eki 2024 – Mar 2025',
    date_en: 'Oct 2024 – Mar 2025',
    tag_tr: 'Topluluk',
    tag_en: 'Community',
    desc_tr: 'GDSC olarak İzmir Devfest etkinliğinde bulunduk ve GDSC bünyesinde Sosyal Medya Koordinatörü olarak görev yaptım; topluluk etkinlikleri için içerik stratejisi geliştirdim.',
    desc_en: 'Served as Social Media Coordinator at GDSC, developing content strategy and organizing community events.',
    image: 'images/events/gdsc.jpg',
    color: '#4285f4',
    icon: '🔵',
  },
  {
  id: 7,
  title_tr: 'GDSC Stant Etkinliği',
  title_en: 'GDSC Stand Event',
  date_tr: '2024 – 2025',
  date_en: '2024 – 2025',
  tag_tr: 'Etkinlik',
  tag_en: 'Event',
  desc_tr: 'Google Developer Student Clubs stant etkinliğinde Sosyal Medya Koordinatörü olarak görev aldım. Edit, akım ve fotoğraf çekimi yaparak topluluk üyesi kazanım süreçlerinde aktif rol üstlendim.',
  desc_en: 'Served as Social Media Coordinator at the GDSC stand event. Actively contributed to member recruitment through content editing, reels, and photography.',
  image: 'images/events/gdsc-stant.jpg',
  color: '#34a853',
  icon: '📸',
},

]

function EventCard({ event, index, lang }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.08 })
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgErr, setImgErr] = useState(false)

  const title = lang === 'tr' ? event.title_tr : event.title_en
  const desc = lang === 'tr' ? event.desc_tr : event.desc_en
  const tag = lang === 'tr' ? event.tag_tr : event.tag_en
  const date = lang === 'tr' ? (event.date_tr || event.date) : (event.date_en || event.date)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card rounded-2xl overflow-hidden flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
      whileHover={{ borderColor: event.color + '30', boxShadow: `0 8px 32px ${event.color}10` }}
    >
      {/* Image / placeholder area */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${event.color}16, ${event.color}05)` }}
      >
        {!imgErr && (
          <img
            src={event.image}
            alt={title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgErr(true)}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Always-visible decorative background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-6xl transition-opacity duration-300 ${imgLoaded && !imgErr ? 'opacity-0' : 'opacity-20 group-hover:opacity-30'}`}>
            {event.icon}
          </span>
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,5,14,0.65) 0%, transparent 55%)' }} />

        {/* Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wide"
          style={{ background: `${event.color}18`, border: `1px solid ${event.color}35`, color: event.color }}
        >
          {tag}
        </div>

        {/* Icon top-right */}
        <div className="absolute top-3 right-3 text-xl">{event.icon}</div>
      </div>

      {/* Text content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-[15px] text-white leading-snug mb-1">
          {title}
        </h3>
        <span className="font-mono text-[10px] text-white/28 mb-3 block">{date}</span>
        <p className="font-body text-sm text-white/46 leading-relaxed flex-1">
          {desc}
        </p>
      </div>

      {/* Bottom color line on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${event.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function EventsSection() {
  const { lang } = useLang()

  return (
    <SectionWrapper id="events">
      <div className="max-w-6xl mx-auto">
       <SectionHeading
  eyebrow={lang === 'tr' ? 'Yolculuğum' : 'My Journey'}
  title={lang === 'tr' ? 'Katıldığım etkinlikler.' : 'Events & community.'}
  subtitle={lang === 'tr'
    ? 'CodeNight’tan eğitimlere, sempozyumlardan topluluklara işte gelişim yolculuğumdan kesitler.'
    : 'From CodeNight to trainings, symposiums, and communities highlights of my journey.'}
/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} lang={lang} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-mono text-xs text-white/18 mt-10"
        >
          {lang === 'tr' ? '✦ Daha fazla etkinlik eklenecek' : '✦ More events will be added'}
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
