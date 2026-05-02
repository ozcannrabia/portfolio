import { createContext, useContext, useState } from 'react'
import { translations } from '../utils/i18n'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('tr')
  const t = translations[lang]
  const toggle = () => setLang(l => l === 'tr' ? 'en' : 'tr')
  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
