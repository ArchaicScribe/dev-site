import { motion } from 'framer-motion'
import { useTypewriter, useReducedMotion } from '../hooks'
import styles from './Hero.module.css'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2, delayChildren: prefersReducedMotion ? 0 : 0.3 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' } }
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

  const cursorStyle = {
    display: 'inline-block',
    width: '2px',
    height: '1.2em',
    backgroundColor: '#4fc3dc',
    marginLeft: '4px',
    verticalAlign: 'text-bottom',
    animation: isTyping ? 'none' : 'cursor-blink 1s step-end infinite'
  }

  return (
    <section className={styles.hero} style={heroStyle} aria-label="Introduction">
      <motion.div style={{ textAlign: 'center', maxWidth: '900px', zIndex: 1 }} variants={containerVariants} initial="hidden" animate="visible">
        <motion.p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85rem', color: '#5a7a8a', marginBottom: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }} variants={itemVariants}>// SYSTEM.INIT</motion.p>
        <motion.h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: 600, color: '#4fc3dc', letterSpacing: '0.08em', marginBottom: '1.5rem' }} variants={itemVariants}>ALEX RAUENZAHN</motion.h1>
        <motion.div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 300, color: '#a8d8e8', marginBottom: '2.5rem', minHeight: '2.5rem' }} variants={itemVariants}>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {text}<span style={cursorStyle}></span>
          </span>
        </motion.div>
        <motion.p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', fontWeight: 300, color: '#5a7a8a', lineHeight: 1.8, marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }} variants={itemVariants}>
          Building enterprise-grade systems and secure APIs that scale.<br/>Based in Albuquerque, NM. Currently open to new opportunities.
        </motion.p>
        <motion.div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }} variants={itemVariants}>
          <a href="#projects" className="btn btn-primary" onClick={(e) => handleScrollTo(e, 'projects')} style={{ minWidth: '180px' }}>VIEW PROJECTS</a>
          <a href="#skills" className="btn btn-ghost" onClick={(e) => handleScrollTo(e, 'skills')} style={{ minWidth: '180px' }}>READ MY STACK</a>
        </motion.div>
      </motion.div>
    </section>
  )
}
export default Hero
