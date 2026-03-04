import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { fadeUpVariants, staggerContainer, viewportConfig, transition } from '../constants/animationVariants'
import './Skills.css'

const skillDescriptions = {
  // Languages
  'Java': 'Enterprise-grade backend development with focus on Spring ecosystem, microservices architecture, and high-performance concurrent systems.',
  'C#': 'Full-stack .NET development including ASP.NET Core APIs, Entity Framework, and Azure-integrated enterprise applications.',
  'SQL': 'Advanced query optimization, stored procedures, and database design across Oracle, SQL Server, and PostgreSQL environments.',
  'TypeScript': 'Strongly-typed JavaScript for scalable frontend applications, React components, and Node.js backend services.',
  'Python': 'Scripting, automation, data processing, and rapid prototyping for DevOps tooling and API development.',

  // Frameworks
  'Spring Boot': 'Rapid development of production-ready microservices with auto-configuration, embedded servers, and cloud-native patterns.',
  'Spring Security': 'Comprehensive authentication and authorization including OAuth2, JWT, LDAP integration, and custom security filters.',
  '.NET': 'Microsoft ecosystem development with ASP.NET Core, Blazor, and Azure service integrations for enterprise solutions.',
  'Hibernate': 'Object-relational mapping for Java applications with optimized queries, caching strategies, and database migrations.',
  'JPA': 'Java Persistence API for standardized ORM across enterprise applications with repository patterns and query methods.',

  // Databases
  'Oracle': 'Enterprise database administration, PL/SQL development, performance tuning, and complex stored procedures.',
  'SQL Server': 'Microsoft SQL Server design, T-SQL development, SSIS packages, and high-availability configurations.',
  'PostgreSQL': 'Advanced open-source relational database with JSON support, full-text search, and extension development.',
  'MongoDB': 'Document-oriented NoSQL for flexible schemas, aggregation pipelines, and horizontally scalable architectures.',
  'Redis': 'In-memory caching, session management, pub/sub messaging, and distributed locks for high-throughput systems.',

  // Infrastructure
  'Docker': 'Containerization of applications with multi-stage builds, compose orchestration, and optimized image layers.',
  'Kubernetes': 'Container orchestration with deployments, services, ingress controllers, and Helm chart management.',
  'AWS': 'Cloud architecture with EC2, Lambda, S3, RDS, and infrastructure-as-code using CloudFormation and CDK.',
  'Azure': 'Microsoft cloud services including App Services, Functions, AKS, and Azure DevOps pipeline orchestration.',
  'Linux': 'Server administration, shell scripting, systemd services, and performance monitoring in production environments.',

  // Auth & Security
  'OAuth2/JWT': 'Token-based authentication flows including authorization code, client credentials, and secure token validation.',
  'LDAP/LDAPS': 'Directory service integration for enterprise single sign-on, user synchronization, and group-based access control.',
  'SSO': 'Single sign-on implementation with SAML, OpenID Connect, and federated identity across enterprise applications.',

  // Tools & Practices
  'Git': 'Version control with branching strategies, rebasing workflows, and collaborative code review processes.',
  'GitHub Actions': 'CI/CD automation with workflow definitions, matrix builds, and deployment to cloud environments.',
  'Azure DevOps': 'End-to-end DevOps platform for work tracking, repositories, pipelines, and artifact management.',
  'CI/CD': 'Continuous integration and deployment pipelines ensuring rapid, reliable software delivery with automated testing.',
  'Agile': 'Scrum and Kanban methodologies for iterative development, sprint planning, and continuous improvement.',
}

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
  const [selectedSkill, setSelectedSkill] = useState(null)
  const panelRef = useRef(null)

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedSkill && panelRef.current && !panelRef.current.contains(event.target)) {
        if (!event.target.classList.contains('skill-item')) {
          setSelectedSkill(null)
        }
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedSkill(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedSkill])

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill === skill ? null : skill)
  }

  const categoryStyle = { backgroundColor: 'var(--ui-panel-bg)', border: '1px solid var(--ui-input-border)', padding: '2rem', transition: 'border-color 200ms ease' }

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
            <motion.div key={category.title} className="skills-category" style={categoryStyle} variants={fadeUpVariants}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent-gold)', marginBottom: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{category.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`skill-item ${selectedSkill === skill ? 'selected' : ''}`}
                    onClick={() => handleSkillClick(skill)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSkillClick(skill)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedSkill === skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedSkill && skillDescriptions[selectedSkill] && (
          <div ref={panelRef} style={{ marginTop: '2rem' }}>
            <div className="skill-info-panel">
              <div className="skill-info-header">
                <span>{selectedSkill}</span>
                <button
                  className="skill-info-close"
                  onClick={() => setSelectedSkill(null)}
                  aria-label="Close skill description"
                >
                  [ESC]
                </button>
              </div>
              <p className="skill-info-description">
                {skillDescriptions[selectedSkill]}
              </p>
            </div>
          </div>
        )}

        <motion.div style={{ marginTop: '4rem', padding: '1rem 1.5rem', fontSize: '0.85rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', borderLeft: '2px solid var(--ui-highlight-dim)' }} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={prefersReducedMotion ? { duration: 0 } : { ...transition, delay: 0.5 }}>
          <span style={{ color: 'var(--accent-gold)', marginRight: '0.5rem' }}>*</span>Always learning. Currently exploring: Advanced Spring patterns, cloud-native architectures, and distributed systems.
        </motion.div>
      </div>
    </section>
  )
}
export default Skills
