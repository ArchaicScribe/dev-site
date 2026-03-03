import { lazy, Suspense, useState } from 'react'
import { Nav, Hero, ForerunnerBackground, ChatWidget, Terminal, SectionLoader } from './components'
import { useReducedMotion } from './hooks'
import { ThemeProvider, useTheme } from './context/ThemeContext'

// Lazy load below-the-fold sections for better performance
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const ResumeAnalyzer = lazy(() => import('./components/ResumeAnalyzer'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function AppContent() {
  const { theme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const [chatContext, setChatContext] = useState(null)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  const handleChatHandoff = (context) => {
    setChatContext(context)
  }

  const handleContextCleared = () => {
    setChatContext(null)
  }

  return (
    <>
      <ForerunnerBackground theme={theme} />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Nav onTerminalOpen={() => setIsTerminalOpen(true)} />

      {/* Main content */}
      <main id="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero loads immediately */}
        <Hero />

        {/* Lazy-loaded sections */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ResumeAnalyzer onChatHandoff={handleChatHandoff} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </main>

      <ChatWidget
        injectedContext={chatContext}
        onContextCleared={handleContextCleared}
      />

      {isTerminalOpen && (
        <Terminal onClose={() => setIsTerminalOpen(false)} />
      )}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
