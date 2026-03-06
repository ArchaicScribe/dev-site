import { useState, useEffect, useRef, useCallback } from 'react'
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
  'Python': 'Used for scripting and task automation. Not a primary language — day-to-day development is primarily Java and C#.',

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

const TOOLTIP_WIDTH = 280
const TOOLTIP_HEIGHT_ESTIMATE = 120
const TOOLTIP_GAP = 8

export function Skills() {
  const prefersReducedMotion = useReducedMotion()
  const [tooltip, setTooltip] = useState(null) // { skill }
  const [tooltipPosition, setTooltipPosition] = useState(null) // { top, left }
  const tooltipRef = useRef(null)

  const closeTooltip = useCallback(() => {
    setTooltip(null)
    setTooltipPosition(null)
  }, [])

  // Close on Escape or click outside
  useEffect(() => {
    if (!tooltip) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeTooltip()
    }

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target) && !e.target.classList.contains('skill-item')) {
        closeTooltip()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [tooltip, closeTooltip])

  // Dismiss tooltip on scroll
  useEffect(() => {
    if (!tooltip) return

    window.addEventListener('scroll', closeTooltip, { passive: true })
    return () => {
      window.removeEventListener('scroll', closeTooltip)
    }
  }, [tooltip, closeTooltip])

  const handleSkillClick = (e, skill) => {
    e.stopPropagation()
    e.preventDefault()

    // Toggle off if clicking the same skill
    if (tooltip?.skill === skill) {
      closeTooltip()
      return
    }

    // Calculate position from clicked element
    const rect = e.currentTarget.getBoundingClientRect()
    const card = e.currentTarget.closest('.skills-category')
    const cardRect = card ? card.getBoundingClientRect() : null

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let top, left

    // Default: position above the card to avoid overlap
    const aboveCardTop = cardRect ? cardRect.top - TOOLTIP_HEIGHT_ESTIMATE - TOOLTIP_GAP : rect.top - TOOLTIP_HEIGHT_ESTIMATE - TOOLTIP_GAP
    const belowSkillBottom = rect.bottom + TOOLTIP_GAP

    if (aboveCardTop >= 10) {
      top = aboveCardTop
    } else {
      top = belowSkillBottom
    }

    // Horizontal positioning - center on the skill tag
    left = rect.left + (rect.width / 2) - (TOOLTIP_WIDTH / 2)

    // Keep within viewport
    if (left < 10) {
      left = 10
    } else if (left + TOOLTIP_WIDTH > viewportWidth - 10) {
      left = viewportWidth - TOOLTIP_WIDTH - 10
    }

    if (top + TOOLTIP_HEIGHT_ESTIMATE > viewportHeight - 10) {
      top = viewportHeight - TOOLTIP_HEIGHT_ESTIMATE - 10
    }

    setTooltip({ skill })
    setTooltipPosition({ top, left })
  }

  // Get tooltip style from position state
  const getTooltipStyle = () => {
    if (!tooltipPosition) return { visibility: 'hidden' }

    return {
      position: 'fixed',
      top: `${tooltipPosition.top}px`,
      left: `${tooltipPosition.left}px`,
      zIndex: 9999,
    }
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
        <motion.div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          {skillCategories.map((category) => (
            <motion.div key={category.title} className="skills-category" style={categoryStyle} variants={fadeUpVariants}>
              <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent-gold)', marginBottom: '1.25rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{category.title}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {category.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className={`skill-item ${tooltip?.skill === skill ? 'selected' : ''}`}
                    onClick={(e) => handleSkillClick(e, skill)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSkillClick(e, skill)}
                    aria-pressed={tooltip?.skill === skill}
                    aria-describedby={tooltip?.skill === skill ? 'skill-tooltip' : undefined}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ marginTop: '4rem', padding: '1rem 1.5rem', fontSize: '0.85rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)', borderLeft: '2px solid var(--ui-highlight-dim)', textAlign: 'center' }} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={prefersReducedMotion ? { duration: 0 } : { ...transition, delay: 0.5 }}>
          <span style={{ color: 'var(--accent-gold)', marginRight: '0.5rem' }}>*</span>Always learning. Currently exploring: Advanced Spring patterns, cloud-native architectures, distributed systems, and AI/ML integration.
        </motion.div>
      </div>

      {/* Floating Tooltip */}
      {tooltip && skillDescriptions[tooltip.skill] && (
        <div
          ref={tooltipRef}
          id="skill-tooltip"
          className="skill-tooltip"
          style={getTooltipStyle()}
          role="tooltip"
        >
          <div className="skill-tooltip-header">{tooltip.skill}</div>
          <p className="skill-tooltip-description">{skillDescriptions[tooltip.skill]}</p>
        </div>
      )}
    </section>
  )
}
export default Skills
