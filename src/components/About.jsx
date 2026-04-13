import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import TerminalCard from './TerminalCard'
import { fadeUpVariants, transition } from '../constants/animationVariants'

export function About() {
  const prefersReducedMotion = useReducedMotion()
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.2 } } }
  const itemVariants = { hidden: fadeUpVariants.hidden, visible: { ...fadeUpVariants.visible, transition: { ...transition, duration: prefersReducedMotion ? 0 : transition.duration } } }

  const sectionStyle = { padding: '8rem 2rem', backgroundColor: 'var(--ui-input-bg)', position: 'relative' }
  const statStyle = { display: 'flex', flexDirection: 'column', gap: '0.25rem' }

  return (
    <section id="about" style={sectionStyle} aria-labelledby="about-heading">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-input-border), var(--accent-secondary), var(--ui-input-border), transparent)' }}></div>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
        <motion.div style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-highlight-dim))' }}></div>
          <h2 id="about-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: 'var(--accent-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ABOUT</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--ui-highlight-dim), transparent)' }}></div>
        </motion.div>
        <div className="about-content-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1.2fr', gap: '4rem', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}><TerminalCard /></motion.div>
          <motion.div style={{ color: 'var(--text-primary)', fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', fontWeight: 300, lineHeight: 1.9 }} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <p style={{ marginBottom: '2rem' }}>Solutions Architect with 6+ years leading enterprise modernization, translating complex business problems into cloud-native system designs that scale, survive, and ship on time.</p>
            <p style={{ marginBottom: '2rem' }}>Deep background in system design decisions: decomposing monoliths, designing secure API surfaces, evaluating architectural tradeoffs across Java and .NET ecosystems, and owning the technical vision end to end.</p>
            <p style={{ marginBottom: '2rem' }}>Hands-on with Azure and Kubernetes in production. Currently pursuing AZ-104 and AZ-305 (Azure Solutions Architect Expert path). AWS in the pipeline. Comfortable operating at both the whiteboard and the IDE.</p>
            <p style={{ marginBottom: '4rem', color: 'var(--text-muted)' }}>Designing cloud-native systems and leading enterprise modernization at scale. Targeting the Greater Seattle Area and remote-first teams. Direct hire only.</p>
            <div className="about-stats-row" style={{ display: 'flex', gap: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--ui-input-border)' }}>
              <div className="about-stat-item" style={statStyle}><span className="about-stat-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>6+</span><span className="about-stat-label" style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years Experience</span></div>
              <div className="about-stat-item" style={statStyle}><span className="about-stat-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>Fortune 50</span><span className="about-stat-label" style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Client Scale</span></div>
              <div className="about-stat-item" style={statStyle}><span className="about-stat-value" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>AZ-305</span><span className="about-stat-label" style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>In Progress</span></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
export default About
