import { Diagram } from './Diagram'

export const MDXComponents = {
  Diagram,
  h1: (props) => <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--ui-highlight)', marginBottom: '1.5rem', letterSpacing: '0.05em' }} {...props} />,
  h2: (props) => <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--accent-primary)', marginTop: '3rem', marginBottom: '1rem', letterSpacing: '0.05em', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(79, 195, 220, 0.2)' }} {...props} />,
  h3: (props) => <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2rem', marginBottom: '0.75rem' }} {...props} />,
  p: (props) => <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.25rem' }} {...props} />,
  ul: (props) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem' }} {...props} />,
  ol: (props) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem' }} {...props} />,
  li: (props) => <li style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '0.4rem' }} {...props} />,
  code: ({ children, className, ...props }) => {
    if (className) {
      return (
        <code style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.875rem', color: '#8ff0ff', background: 'rgba(13, 33, 55, 0.8)', border: '1px solid rgba(79, 195, 220, 0.2)', padding: '1.25rem 1.5rem', overflowX: 'auto', lineHeight: 1.7, marginBottom: '1.5rem' }} className={className} {...props}>{children}</code>
      )
    }
    return <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.875em', color: '#8ff0ff', background: 'rgba(13, 33, 55, 0.8)', padding: '0.15em 0.4em', border: '1px solid rgba(79, 195, 220, 0.15)' }} {...props}>{children}</code>
  },
  pre: (props) => <pre style={{ background: 'rgba(13, 33, 55, 0.8)', border: '1px solid rgba(79, 195, 220, 0.2)', padding: '1.25rem 1.5rem', overflowX: 'auto', marginBottom: '1.5rem', fontFamily: "'Share Tech Mono', monospace" }} {...props} />,
  blockquote: (props) => <blockquote style={{ borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1.25rem', margin: '1.5rem 0', color: 'var(--chat-muted)', fontStyle: 'italic' }} {...props} />,
  a: (props) => <a style={{ color: 'var(--accent-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(79, 195, 220, 0.4)' }} {...props} />,
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(79, 195, 220, 0.2)', margin: '2.5rem 0' }} />,
  strong: (props) => <strong style={{ color: 'var(--ui-highlight)', fontWeight: 600 }} {...props} />,
  table: (props) => <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Exo 2', sans-serif", fontSize: '0.9rem' }} {...props} /></div>,
  th: (props) => <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--ui-highlight)', borderBottom: '2px solid rgba(79, 195, 220, 0.3)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.1em' }} {...props} />,
  td: (props) => <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', borderBottom: '1px solid rgba(79, 195, 220, 0.1)' }} {...props} />,
}

export default MDXComponents
