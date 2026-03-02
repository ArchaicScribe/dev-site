import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'

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
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } } }
  const categoryVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } } }
  const skillVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: prefersReducedMotion ? 0 : 0.3 } } }

  const categoryStyle = { backgroundColor: '#0d1620', border: '1px solid rgba(79, 195, 220, 0.2)', padding: '2rem', transition: 'border-color 200ms ease' }
  const skillStyle = { display: 'inline-flex', alignItems: 'center', padding: '0.4rem 1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', color: 'var(--text-secondary)', backgroundColor: '#0a1219', border: '1px solid rgba(79, 195, 220, 0.15)', cursor: 'default', transition: 'all 200ms ease' }

  return (
    <section id="skills" style={{ padding: '8rem 2rem' }} aria-labelledby="skills-heading">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 195, 220, 0.3))' }}></div>
          <h2 id="skills-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: '#4fc3dc', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SKILLS</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(79, 195, 220, 0.3), transparent)' }}></div>
        </motion.div>
        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {skillCategories.map((category) => (
            <motion.div key={category.title} style={categoryStyle} variants={categoryVariants} whileHover={prefersReducedMotion ? {} : { borderColor: 'rgba(79, 195, 220, 0.5)' }}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: '#c8a96e', marginBottom: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{category.title}</h3>
              <motion.div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} variants={containerVariants}>
                {category.skills.map((skill) => (
                  <motion.span key={skill} style={skillStyle} variants={skillVariants} whileHover={prefersReducedMotion ? {} : { color: '#4fc3dc', borderColor: 'rgba(79, 195, 220, 0.5)' }} tabIndex={0} role="listitem">{skill}</motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div style={{ marginTop: '4rem', padding: '1rem 1.5rem', fontSize: '0.85rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', borderLeft: '2px solid rgba(79, 195, 220, 0.3)' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}>
          <span style={{ color: '#c8a96e', marginRight: '0.5rem' }}>*</span>Always learning. Currently exploring: Advanced Spring patterns, cloud-native architectures, and distributed systems.
        </motion.div>
      </div>
    </section>
  )
}
export default Skills
