import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/ArchaicScribe', tooltip: 'github.com/ArchaicScribe', icon: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/alexrauenzahn', tooltip: 'linkedin.com/in/alexrauenzahn', icon: '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>' },
  { name: 'Email', href: 'mailto:alex.rauenzahn@gmail.com', tooltip: 'alex.rauenzahn@gmail.com', icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2"/>' },
]

export function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => { e.preventDefault(); setIsSubmitting(true); await new Promise(r => setTimeout(r, 1000)); setIsSubmitting(false); setFormState({ name: '', email: '', message: '' }); alert('Message sent! (This is a demo)') }

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } } }

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.9rem', color: 'var(--text-secondary)', backgroundColor: '#0a1219', border: '1px solid rgba(79, 195, 220, 0.2)', transition: 'border-color 200ms ease' }
  const socialStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', color: 'var(--text-secondary)', border: '1px solid rgba(79, 195, 220, 0.25)', transition: 'all 200ms ease' }

  return (
    <section id="contact" style={{ padding: '8rem 2rem', textAlign: 'center' }} aria-labelledby="contact-heading">
      <motion.div style={{ maxWidth: '600px', margin: '0 auto' }} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
        <motion.div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }} variants={itemVariants}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 195, 220, 0.3))' }}></div>
          <h2 id="contact-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: '#4fc3dc', letterSpacing: '0.15em', textTransform: 'uppercase' }}>CONTACT</h2>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, rgba(79, 195, 220, 0.3), transparent)' }}></div>
        </motion.div>
        <motion.p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.05em' }} variants={itemVariants}>Let's build something.</motion.p>
        <motion.p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1rem', fontWeight: 300, color: 'var(--text-muted)', marginBottom: '4rem', lineHeight: 1.8 }} variants={itemVariants}>Always interested in discussing distributed systems, performance optimization, or new opportunities. Drop me a line.</motion.p>
        <motion.div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }} variants={itemVariants}>
          {socialLinks.map((link) => <a key={link.name} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'} style={socialStyle} aria-label={link.name} title={link.tooltip}><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: link.icon }}></svg></a>)}
        </motion.div>
        <motion.div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '4rem',
          padding: '1rem 1.5rem',
          border: '1px solid rgba(79, 195, 220, 0.3)',
          backgroundColor: 'rgba(7, 13, 20, 0.5)'
        }} variants={itemVariants}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            fontFamily: "'Exo 2', sans-serif",
            fontSize: '0.9rem',
            color: '#4fc3dc',
            fontWeight: 400
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#4fc3dc',
              animation: 'pulse 2s ease-in-out infinite'
            }}></span>
            Available for new opportunities
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
            textAlign: 'center'
          }}>
            Remote · Open to relocation · Direct hire only · Not considering on-site NM roles
          </div>
        </motion.div>
        <motion.form style={{ textAlign: 'left', backgroundColor: '#0d1620', border: '1px solid rgba(79, 195, 220, 0.2)', padding: '2rem' }} onSubmit={handleSubmit} variants={itemVariants}>
          <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} htmlFor="name">// NAME</label><input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required style={inputStyle} placeholder="John Doe" autoComplete="name" /></div>
          <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} htmlFor="email">// EMAIL</label><input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required style={inputStyle} placeholder="you@example.com" autoComplete="email" /></div>
          <div style={{ marginBottom: '1.25rem' }}><label style={{ display: 'block', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} htmlFor="message">// MESSAGE</label><textarea id="message" name="message" value={formState.message} onChange={handleChange} required style={{...inputStyle, resize: 'vertical', minHeight: '120px'}} placeholder="Your message..." rows={4}></textarea></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT'}</button>
        </motion.form>
      </motion.div>
    </section>
  )
}
export default Contact
