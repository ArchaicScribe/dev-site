import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { STATUS_COLORS } from '../constants/statusColors'
import { fadeUpVariants, viewportConfig, transition } from '../constants/animationVariants'

export function ProjectCard({ project, onOpenCaseStudy, useStagger = false }) {
  const prefersReducedMotion = useReducedMotion()
  const { title, status, description, tags, githubRepo, liveUrl, featured, fullCaseStudy } = project

  const cardStyle = {
    backgroundColor: 'var(--ui-panel-bg)',
    border: '1px solid var(--ui-input-border)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 200ms ease',
    position: 'relative',
    ...(featured && { gridColumn: '1 / -1' })
  }

  const tagStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--ui-highlight-glow)',
    padding: '3px 10px',
    letterSpacing: '0.05em'
  }

  const linkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontFamily: "'Exo 2', sans-serif",
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    padding: '0.4rem 0.75rem',
    transition: 'color 200ms ease'
  }

  const readMoreStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.8rem',
    color: 'var(--accent-primary)',
    background: 'none',
    border: 'none',
    padding: '0.5rem 0',
    cursor: 'pointer',
    transition: 'color 200ms ease',
    marginTop: '0.75rem'
  }

  // Use variants for stagger animation, or individual props for standalone
  const motionProps = useStagger
    ? {
      variants: fadeUpVariants,
      transition: prefersReducedMotion ? { duration: 0 } : transition
    }
    : {
      variants: fadeUpVariants,
      initial: "hidden",
      whileInView: "visible",
      viewport: viewportConfig,
      transition: prefersReducedMotion ? { duration: 0 } : transition
    }

  return (
    <motion.article
      style={cardStyle}
      {...motionProps}
      whileHover={prefersReducedMotion ? {} : { borderColor: 'var(--ui-input-border-focus)' }}
    >
      {featured && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--accent-gold)',
          letterSpacing: '0.1em',
          fontWeight: 500
        }}>
          FEATURED
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', marginTop: featured ? '1.5rem' : '0' }}>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: featured ? '1.3rem' : '1.1rem',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          margin: 0,
          letterSpacing: '0.05em'
        }}>
          {title}
        </h3>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          padding: '3px 10px',
          border: `1px solid ${STATUS_COLORS[status]}`,
          whiteSpace: 'nowrap',
          letterSpacing: '0.1em',
          color: STATUS_COLORS[status]
        }}>
          {status}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
        {tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
      </div>

      <p style={{
        fontFamily: "'Exo 2', sans-serif",
        fontSize: '0.9rem',
        fontWeight: 300,
        color: 'var(--text-muted)',
        lineHeight: 1.7,
        flex: 1,
        marginBottom: '0.5rem'
      }}>
        {description}
      </p>

      {fullCaseStudy && (
        <button
          onClick={() => onOpenCaseStudy(project)}
          style={readMoreStyle}
          onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--accent-primary)'}
        >
          // view case study ▸
        </button>
      )}

      {(githubRepo || liveUrl) && (
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--ui-panel-border-light)',
          marginTop: '1rem'
        }}>
          {githubRepo && (
            <a href={githubRepo} target="_blank" rel="noopener noreferrer" style={linkStyle} aria-label={`View ${title} source code on GitHub`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>SOURCE</span>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={linkStyle} aria-label={`View ${title} live demo`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>LIVE</span>
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
export default ProjectCard
