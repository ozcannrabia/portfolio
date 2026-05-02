import { lazy, Suspense } from 'react'
import { LangProvider } from './hooks/useLang'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import HeroSection from './sections/HeroSection'

const AboutSection = lazy(() => import('./sections/AboutSection'))
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const EventsSection = lazy(() => import('./sections/EventsSection'))
const SkillsSection = lazy(() => import('./sections/SkillsSection'))
const EducationSection = lazy(() => import('./sections/EducationSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 rounded-full border border-aurora-purple/30 border-t-aurora-purple animate-spin" />
    </div>
  )
}

function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #8c52ff, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute top-2/3 left-1/2 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ff2d78, transparent 70%)', filter: 'blur(60px)' }} />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <div className="relative min-h-screen bg-void noise-overlay">
        <AmbientOrbs />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}><AboutSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><ExperienceSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><ProjectsSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><EventsSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><SkillsSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><EducationSection /></Suspense>
          <Suspense fallback={<SectionFallback />}><ContactSection /></Suspense>
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
