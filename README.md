# ✦ Rabia — 3D Developer Portfolio

A production-grade, fully interactive 3D portfolio website built with React, Vite, Three.js, and Framer Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 3D Graphics | React Three Fiber + Three.js + Drei |
| Fonts | Syne · DM Sans · JetBrains Mono |

## Features

- **3D Hero** — Particle starfield + floating wireframe octahedra with mouse-reactive rotation
- **Custom cursor** — Smooth lag-behind ring with hover expansion
- **Typewriter effect** — Cycling job titles in the hero
- **Glassmorphism UI** — Cards with backdrop blur and gradient borders
- **Scroll progress bar** — Gradient line at top of viewport
- **Orbit skills** — Icons orbiting a central hub at varied speeds
- **Stagger animations** — Section fade-ins and slide-ups on scroll
- **Lazy loading** — Below-fold sections loaded on demand
- **Responsive** — Mobile-first, works on all screen sizes
- **Contact form** — With animated send state

## Folder Structure

```
src/
├── components/
│   ├── CustomCursor.jsx      # Custom animated cursor
│   ├── Footer.jsx
│   ├── Navbar.jsx            # Sticky nav with active section tracking
│   ├── ScrollProgress.jsx    # Top progress bar
│   ├── SectionHeading.jsx    # Reusable heading with eyebrow text
│   ├── SectionWrapper.jsx    # Fade-in animation wrapper
│   └── ThreeBackground.jsx   # R3F 3D scene (starfield + floating shapes)
├── hooks/
│   ├── useMousePosition.js
│   └── useScrollProgress.js
├── sections/
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── ProjectsSection.jsx
│   ├── SkillsSection.jsx
│   ├── EducationSection.jsx
│   └── ContactSection.jsx
├── utils/
│   └── data.js               # All portfolio content (edit this!)
├── App.jsx
├── index.css                 # Design system, utilities, cursor styles
└── main.jsx
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

## Customization

All content lives in **`src/utils/data.js`** — edit:
- `PROJECTS` — your projects (title, description, tags, links, color)
- `SKILLS` — skill names, levels, categories
- `EDUCATION` — your timeline entries
- `SOCIALS` — your social links

Update your name and info in:
- `src/sections/HeroSection.jsx` — name, tagline, intro text
- `src/sections/AboutSection.jsx` — bio paragraphs, stats
- `src/sections/ContactSection.jsx` — email, location
- `index.html` — page title and meta description

## Performance Notes

- Three.js canvas uses `dpr={[1, 1.5]}` cap for performance
- All sections below the fold are lazy-loaded via `React.lazy`
- Framer Motion `triggerOnce: true` prevents re-animation on scroll up
- Cursor animation uses `requestAnimationFrame` + lerp (no CSS transitions for position)
