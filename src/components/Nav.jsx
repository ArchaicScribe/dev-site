import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { useModal } from '../context/ModalContext'

const navLinks = [
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#resume-analyzer', label: 'ANALYZER' },
  { href: '#contact', label: 'CONTACT' },
]

export function Nav({ onTerminalOpen }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { closeAllModals } = useModal()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= 150) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
    padding: '1rem 0',
    backgroundColor: isScrolled ? 'rgba(7, 13, 20, 0.92)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(79, 195, 220, 0.2)' : 'none',
    transition: 'all 200ms ease'
  }

  const containerStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'
  }

  const logoStyle = {
    fontFamily: "'Orbitron', sans-serif", fontSize: '1.25rem', fontWeight: 600,
    color: 'var(--accent-primary)', textDecoration: 'none', letterSpacing: '0.15em'
  }

  const linkListStyle = { display: 'flex', gap: '2.5rem', listStyle: 'none' }

  const linkStyle = (isActive) => ({
    fontFamily: "'Exo 2', sans-serif", fontSize: '0.85rem', fontWeight: 500,
    letterSpacing: '0.1em',
    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)', textDecoration: 'none', padding: '0.25rem 0.5rem',
    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
    transition: 'all 200ms ease'
  })

  const terminalLinkStyle = {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'var(--ui-highlight-dim)',
    textDecoration: 'none',
    padding: '0.25rem 0.5rem',
    borderBottom: '2px solid transparent',
    transition: 'all 200ms ease',
    cursor: 'pointer'
  }

  const handleTerminalClick = (e) => {
    e.preventDefault()
    onTerminalOpen?.()
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    closeAllModals()
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <motion.nav style={navStyle} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
      <div style={containerStyle}>
        <a href="#" style={logoStyle} onClick={handleLogoClick}>RAUENZAHN</a>
        <ul style={linkListStyle}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} style={linkStyle(activeSection === link.href.slice(1))} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              style={terminalLinkStyle}
              onClick={handleTerminalClick}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-secondary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--ui-highlight-dim)'}
            >
              TERMINAL
            </a>
          </li>
        </ul>
      </div>
    </motion.nav>
  )
}
export default Nav
