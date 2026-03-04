import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { viewportConfig } from '../constants/animationVariants'

const systemInfo = [
  { label: 'OS', value: 'Windows 11 + Ubuntu (WSL2)' },
  { label: 'Shell', value: 'zsh / bash' },
  { label: 'Languages', value: 'Java, C#, SQL, TypeScript' },
  { label: 'Frameworks', value: 'Spring Boot, Spring Security, .NET' },
  { label: 'DB', value: 'Oracle, SQL Server' },
  { label: 'Infra', value: 'Docker, K8s (Rancher), AWS, Azure' },
  { label: 'Auth', value: 'OAuth2/JWT, LDAP/LDAPS' },
  { label: 'CI/CD', value: 'GitHub Actions, Azure DevOps' },
]

export function TerminalCard() {
  const prefersReducedMotion = useReducedMotion()
  const lineVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: prefersReducedMotion ? 0 : i * 0.1, duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeOut' } })
  }

  const cardStyle = {
    backgroundColor: 'var(--ui-panel-bg)', border: '1px solid var(--ui-panel-border)',
    overflow: 'hidden', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.85rem'
  }

  return (
    <div style={cardStyle} role="img" aria-label="System profile information">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', backgroundColor: 'var(--ui-input-bg)', borderBottom: '1px solid var(--ui-input-border)' }}>
        <span style={{ color: 'var(--chat-muted)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// SYSTEM.PROFILE</span>
        <span style={{ color: 'var(--accent-gold)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>ACTIVE</span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div className="terminal-card-content" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          <pre className="terminal-card-ascii" style={{ color: 'var(--accent-secondary)', fontSize: '0.55rem', lineHeight: 1.3, margin: 0, flexShrink: 0, opacity: 0.6 }} aria-hidden="true">{`  ╔═══════════╗
  ║           ║
  ║   ◈   ◈   ║
  ║     ◇     ║
  ║   ◇   ◇   ║
  ║           ║
  ╚═══════════╝`}</pre>
          <div style={{ flex: 1, minWidth: 0 }}>
            {systemInfo.map((item, index) => (
              <motion.div key={item.label} style={{ display: 'flex', marginBottom: '0.5rem', flexWrap: 'wrap' }}
                custom={index} variants={lineVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
                <span className="terminal-card-label" style={{ color: 'var(--accent-secondary)', fontWeight: 500, minWidth: '90px' }}>{item.label}</span>
                <span style={{ color: 'var(--chat-muted)', marginRight: '0.75em' }}>→</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.value}</span>
              </motion.div>
            ))}
            <motion.div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              custom={systemInfo.length} variants={lineVariants} initial="hidden" whileInView="visible" viewport={viewportConfig}>
              <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-secondary)', display: 'inline-block' }}></span>
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 500, letterSpacing: '0.1em' }}>ONLINE</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TerminalCard
