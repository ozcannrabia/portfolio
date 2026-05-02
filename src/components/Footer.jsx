import { useLang } from '../hooks/useLang'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useLang()

  return (
    <footer className="border-t border-white/5 px-6 md:px-12 lg:px-24 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/20">
          © {year} Rabia Özcan.{' '}
          {lang === 'tr'
            ? 'React, Three.js & Framer Motion ile yapıldı.'
            : 'Crafted with React, Three.js & Framer Motion.'}
        </p>
        <div className="flex items-center gap-2 font-mono text-xs text-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-aurora-green" />
          {lang === 'tr' ? 'Tüm sistemler çalışıyor' : 'All systems operational'}
        </div>
      </div>
    </footer>
  )
}
