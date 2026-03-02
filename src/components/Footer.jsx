import { motion } from 'framer-motion'
import { fadeUpVariants, viewportConfig, transition } from '../constants/animationVariants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(79, 195, 220, 0.15)',
      }}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={transition}
    >
      <p
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.8rem',
          color: '#5a7a8a',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        ALEX RAUENZAHN — ENGINEERED WITH{' '}
        <span style={{ color: '#4fc3dc' }}>REACT</span> +{' '}
        <span style={{ color: '#c8a96e' }}>VITE</span> — {year}
      </p>
      <p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.7rem',
          color: '#3a4a5a',
          marginTop: '1rem',
          letterSpacing: '0.1em',
        }}
      >
        ALL SYSTEMS OPERATIONAL
      </p>
    </motion.footer>
  )
}

export default Footer
