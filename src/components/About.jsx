import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import TerminalCard from './TerminalCard'
import { fadeUpVariants, transition } from '../constants/animationVariants'

export function About() {
  const prefersReducedMotion = useReducedMotion()
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 } } }
  const itemVariants = { hidden: fadeUpVariants.hidden, visible: { ...fadeUpVariants.visible, transition: { ...transition, duration: prefersReducedMotion ? 0 : transition.duration } } }

  const sectionStyle = { padding: '8rem 2rem', backgroundColor: 'var(--ui-input-bg)', position: 'relative' }
  const contentStyle = { display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '4rem', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }
  const statStyle = { display: 'flex', flexDirection: 'column', gap: '0.25rem' }

  return (
    <section id="about" style={sectionStyle} aria-labelledby="about-heading">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-input-border), var(--accent-secondary), var(--ui-input-border), transparent)' }}></div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        <motion.div style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }} variants={itemVariants}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-highlight-dim))' }}></div>
          <h2 id="about-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: 'var(--accent-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ABOUT</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--ui-highlight-dim), transparent)' }}></div>
        </motion.div>
        <div style={contentStyle}>
          <motion.div variants={itemVariants}><TerminalCard /></motion.div>
          <motion.div style={{ color: 'var(--text-primary)', fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', fontWeight: 300, lineHeight: 1.9 }} variants={itemVariants}>
            <p style={{ marginBottom: '2rem' }}>Senior Software Engineer with 5+ years modernizing long-lived enterprise Java and .NET applications into maintainable Spring Boot architectures and cloud-ready deployments.</p>
            <p style={{ marginBottom: '2rem' }}>Deep experience in production troubleshooting — concurrency issues, memory behavior, performance bottlenecks, and transactional correctness — with a strong focus on observability using SLF4J and Logback.</p>
            <p style={{ marginBottom: '2rem' }}>Specialized in secure API design: dual-authentication systems with OAuth2/JWT and LDAP/LDAPS via Spring Security, deployed on Docker and Kubernetes (Rancher) across AWS and Azure environments.</p>
            <p style={{ marginBottom: '4rem', color: 'var(--text-muted)' }}>Open to Washington state, Massachusetts, or remote · Direct hire only · Not considering on-site NM roles</p>
            <div style={{ display: 'flex', gap: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--ui-input-border)' }}>
              <div style={statStyle}><span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>5+</span><span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Experience</span></div>
              <div style={statStyle}><span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>Fortune 50</span><span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Client Scale</span></div>
              <div style={statStyle}><span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>Q-Cleared</span><span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DOE Security</span></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
export default About
