import { motion } from 'framer-motion'
import { useTypewriter, useReducedMotion } from '../hooks'
import { fadeUpVariants, transition } from '../constants/animationVariants'

const roles = [
  "Senior Software Engineer",
  "Java Modernization Specialist",
  "Spring Boot Architect",
  "Cloud Infrastructure Engineer",
  "Enterprise API Designer",
]

export function Hero() {
  const { text, isTyping } = useTypewriter(roles, 80, 40, 2500)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion || isMobile ? 0 : 0.2,
        delayChildren: prefersReducedMotion || isMobile ? 0 : 0.3
      }
    }
  }
  const itemVariants = {
    hidden: fadeUpVariants.hidden,
    visible: {
      ...fadeUpVariants.visible,
      transition: {
        ...transition,
        duration: prefersReducedMotion || isMobile ? 0 : transition.duration
      }
    }
  }

  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  const heroStyle = {
    minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
    alignItems: 'center', position: 'relative', padding: '8rem 2rem', overflow: 'hidden'
  }

  const energyGlowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
    background: `
      radial-gradient(
        ellipse 60% 40% at 50% 0%,
        rgba(143, 240, 255, 0.07) 0%,
        rgba(143, 240, 255, 0.03) 40%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 30% 20% at 50% 0%,
        rgba(143, 240, 255, 0.12) 0%,
        transparent 60%
      )
    `,
  }

  const cursorStyle = {
    display: 'inline-block',
    width: '2px',
    height: '1.2em',
    backgroundColor: 'var(--ui-highlight)',
    marginLeft: '4px',
    verticalAlign: 'text-bottom',
    animation: isTyping ? 'none' : 'cursor-blink 1s step-end infinite'
  }

  return (
    <section className="hero" style={heroStyle} aria-label="Introduction">
      <div style={energyGlowStyle} />
      <motion.div style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 1 }} variants={containerVariants} initial="hidden" animate="visible">
        <motion.p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85rem', color: 'var(--chat-muted)', marginBottom: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }} variants={itemVariants}>// SYSTEM.INIT</motion.p>
        <motion.h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: 600, color: 'var(--ui-highlight)', letterSpacing: '0.08em', marginBottom: '1.5rem' }} variants={itemVariants}>ALEX RAUENZAHN</motion.h1>
        <motion.div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 300, color: 'var(--text-secondary)', marginBottom: '2.5rem', minHeight: '2.5rem' }} variants={itemVariants}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {text}<span style={cursorStyle}></span>
          </span>
        </motion.div>
        <motion.p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'var(--chat-muted)', lineHeight: 1.8, marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }} variants={itemVariants}>
          Building enterprise-grade systems and secure APIs that scale.<br />Open to Washington state, Massachusetts, or remote · Direct hire only · Not considering on-site NM roles
        </motion.p>
        <motion.div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }} variants={itemVariants}>
          <a href="#projects" className="btn btn-primary" onClick={(e) => handleScrollTo(e, 'projects')} style={{ minWidth: '180px', backgroundColor: 'var(--ui-button-bg)', borderColor: 'var(--ui-button-bg)', color: 'var(--ui-button-text)' }}>VIEW PROJECTS</a>
          <a href="#skills" className="btn btn-ghost" onClick={(e) => handleScrollTo(e, 'skills')} style={{ minWidth: '180px', color: 'var(--ui-highlight)', borderColor: 'var(--ui-highlight)' }}>READ MY STACK</a>
        </motion.div>
      </motion.div>
    </section>
  )
}
export default Hero
