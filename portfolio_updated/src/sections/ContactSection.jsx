import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from '../components/SectionWrapper'
import SectionHeading from '../components/SectionHeading'
import { SOCIALS } from '../utils/data'
import { useLang } from '../hooks/useLang'

function InputField({ label, name, type = 'text', value, onChange, textarea = false, placeholder }) {
  const [focused, setFocused] = useState(false)
  const baseClass = `w-full bg-transparent font-body text-sm text-white placeholder-white/20 outline-none resize-none transition-all duration-200`
  const wrapClass = `relative rounded-xl px-4 py-3.5 transition-all duration-300`
  const borderStyle = {
    border: `1px solid ${focused ? 'rgba(140,82,255,0.5)' : 'rgba(255,255,255,0.07)'}`,
    background: focused ? 'rgba(140,82,255,0.04)' : 'rgba(255,255,255,0.02)',
    boxShadow: focused ? '0 0 20px rgba(140,82,255,0.08)' : 'none',
  }
  return (
    <div className="space-y-1.5">
      <label className="block font-mono text-xs text-white/40 tracking-wider">{label}</label>
      <div className={wrapClass} style={borderStyle}>
        {textarea ? (
          <textarea name={name} rows={5} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder={placeholder} className={`${baseClass} leading-relaxed`} />
        ) : (
          <input name={name} type={type} value={value} onChange={onChange}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder={placeholder} className={baseClass} />
        )}
      </div>
    </div>
  )
}

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const { lang, t } = useLang()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    const res = await fetch('https://formspree.io/f/xbdwdgnb', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
})
if (res.ok) {
  setStatus('success')
} else {
  setStatus('idle')
  alert('Bir hata oluştu, tekrar dene.')
}
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const labels = lang === 'tr'
    ? { name: 'İSİM', email: 'E-POSTA', message: 'MESAJ', namePh: 'Adınız', msgPh: 'Ne düşünüyorsunuz?', sending: 'Gönderiliyor...', sent: '✓ Mesaj gönderildi!' }
    : { name: 'NAME', email: 'EMAIL', message: 'MESSAGE', namePh: 'Your name', msgPh: "What's on your mind?", sending: 'Sending...', sent: '✓ Message sent!' }

  const infoItems = lang === 'tr'
    ? [
        { label: 'E-POSTA', value: 'rabiaozcann02@gmail.com', href: 'mailto:rabiaozcann02@gmail.com' },
        { label: 'KONUM', value: 'İzmir, Türkiye 🇹🇷', href: null },
        { label: 'UYGUNLUK', value: 'Staj & iş birliklerine açığım', href: null },
      ]
    : [
        { label: 'EMAIL', value: 'rabiaozcann02@gmail.com', href: 'mailto:rabiaozcann02@gmail.com' },
        { label: 'LOCATION', value: 'Izmir, Turkey 🇹🇷', href: null },
        { label: 'AVAILABILITY', value: 'Open to internships & collaborations', href: null },
      ]

  return (
    <SectionWrapper id="contact">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField label={labels.name} name="name" value={form.name} onChange={handleChange} placeholder={labels.namePh} />
              <InputField label={labels.email} name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@ornek.com" />
              <InputField label={labels.message} name="message" textarea value={form.message} onChange={handleChange} placeholder={labels.msgPh} />

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-body font-medium text-white transition-all duration-300 relative overflow-hidden"
                style={{
                  background: status === 'success' ? 'linear-gradient(135deg, #00ff9f40, #00ff9f20)' : 'linear-gradient(135deg, #8c52ff, #00d4ff)',
                  border: status === 'success' ? '1px solid #00ff9f40' : 'none',
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                      {t.contact.send} <span>→</span>
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block">⟳</motion.span>
                      {labels.sending}
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2 text-aurora-green">
                      {labels.sent}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-10"
          >
            <div className="space-y-6">
              {infoItems.map(item => (
                <div key={item.label}>
                  <p className="font-mono text-[10px] text-white/30 tracking-widest mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-body text-white/70 hover:text-aurora-blue transition-colors">{item.value}</a>
                  ) : (
                    <p className="font-body text-white/70">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-[10px] text-white/30 tracking-widest mb-4">
                {lang === 'tr' ? 'BENI BUL' : 'FIND ME ON'}
              </p>
              <div className="flex gap-3 flex-wrap">
                {SOCIALS.map((social) => (
                  <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-sm font-mono text-white/60 hover:text-white transition-colors"
                  >
                    <span className="text-xs font-bold text-aurora-purple">{social.icon}</span>
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-aurora-green" />
                <div className="absolute inset-0 rounded-full bg-aurora-green animate-ping opacity-40" />
              </div>
              <div>
                <p className="font-body text-sm text-white/80">
                  {lang === 'tr' ? 'Şu an müsaitim' : 'Currently available'}
                </p>
                <p className="font-mono text-xs text-white/30 mt-0.5">
                  {lang === 'tr' ? 'Yanıt süresi: 24 saat içinde' : 'Response time: within 24 hours'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
