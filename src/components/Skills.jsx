import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { fadeUpVariants, staggerContainer, viewportConfig, transition } from '../constants/animationVariants'

const skillCategories = [
  { title: 'Languages', skills: ['Java', 'C#', 'SQL', 'TypeScript', 'Python'] },
  { title: 'Frameworks', skills: ['Spring Boot', 'Spring Security', '.NET', 'Hibernate', 'JPA'] },
  { title: 'Databases', skills: ['Oracle', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { title: 'Infrastructure', skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux'] },
  { title: 'Auth & Security', skills: ['OAuth2/JWT', 'LDAP/LDAPS', 'Spring Security', 'SSO'] },
  { title: 'Tools & Practices', skills: ['Git', 'GitHub Actions', 'Azure DevOps', 'CI/CD', 'Agile'] },
]

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const skillVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: prefersReducedMotion ? 0 : 0.3 } } }

  const categoryStyle = { backgroundColor: 'var(--ui-panel-bg)', border: '1px solid var(--ui-input-border)', padding: '2rem', transition: 'border-color 200ms ease' }
  const skillStyle = { display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: 'var(--ui-input-bg)', border: '1px solid var(--ui-panel-border-light)', cursor: 'default', transition: 'all 200ms ease' }

  return (
    <section id="skills" style={{ padding: '8rem 2rem' }} aria-labelledby="skills-heading">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={prefersReducedMotion ? { duration: 0 } : transition}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-highlight-dim))' }}></div>
          <h2 id="skills-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: 'var(--accent-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SKILLS</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--ui-highlight-dim), transparent)' }}></div>
        </motion.div>
        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          {skillCategories.map((category) => (
            <motion.div key={category.title} style={categoryStyle} variants={fadeUpVariants} whileHover={prefersReducedMotion ? {} : { borderColor: 'var(--ui-input-border-focus)' }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent-gold)', marginBottom: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{category.title}</h3>
              <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} variants={staggerContainer}>
                {category.skills.map((skill) => (
                  <motion.span key={skill} style={skillStyle} variants={skillVariants} whileHover={prefersReducedMotion ? {} : { color: 'var(--accent-secondary)', borderColor: 'var(--ui-input-border-focus)' }} tabIndex={0} role="listitem">{skill}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div style={{ marginTop: '4rem', padding: '1rem 1.5rem', fontSize: '0.85rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', borderLeft: '2px solid var(--ui-highlight-dim)' }} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={prefersReducedMotion ? { duration: 0 } : { ...transition, delay: 0.5 }}>
          <span style={{ color: 'var(--accent-gold)', marginRight: '0.5rem' }}>*</span>Always learning. Currently exploring: Advanced Spring patterns, cloud-native architectures, and distributed systems.
        </motion.div>
      </div>
    </section>
  )
}
export default Skills
