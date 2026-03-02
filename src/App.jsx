import { lazy, Suspense, useState } from 'react'
import { Nav, Hero } from './components'
import { useReducedMotion } from './hooks'
import ForerunnerBackground from './components/ForerunnerBackground'
import ChatWidget from './components/ChatWidget'

// Lazy load below-the-fold sections for better performance
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const ResumeAnalyzer = lazy(() => import('./components/ResumeAnalyzer'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Loading fallback with Forerunner-style loader
function SectionLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        color: '#4fc3dc',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.85rem',
        letterSpacing: '0.1em',
      }}
    >
      <div style={{ width: '24px', height: '24px', border: '2px solid rgba(79, 195, 220, 0.3)', borderTopColor: '#4fc3dc', borderRadius: '0', animation: 'spin 1s linear infinite', marginRight: '1rem' }} />
      LOADING MODULE...
    </div>
  )
}

export default function App() {
  const prefersReducedMotion = useReducedMotion()
  const [chatContext, setChatContext] = useState(null)

  const handleChatHandoff = (context) => {
    setChatContext(context)
  }

  const handleContextCleared = () => {
    setChatContext(null)
  }

  return (
    <>
      <ForerunnerBackground />

      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation */}
      <Nav />

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
    </>
  )
}
