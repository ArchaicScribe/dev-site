import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import ProjectCard from './ProjectCard'
import CaseStudyModal from './CaseStudyModal'
import { projects } from '../data/projects'

export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionStyle = { padding: '8rem 2rem', backgroundColor: '#0a1219', position: 'relative' }

  const navigateToProject = (projectTitle) => {
    setIsTransitioning(true)
    setTimeout(() => {
      const target = projects.find(p => p.title === projectTitle)
      if (target) setActiveProject(target)
      setIsTransitioning(false)
    }, 250)
  }

  return (
    <section id="projects" style={sectionStyle} aria-labelledby="projects-heading">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 195, 220, 0.2), #4fc3dc, rgba(79, 195, 220, 0.2), transparent)' }}></div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(79, 195, 220, 0.3))' }}></div>
          <h2 id="projects-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: '#4fc3dc', letterSpacing: '0.15em', textTransform: 'uppercase' }}>PROJECTS</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(79, 195, 220, 0.3), transparent)' }}></div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }} role="list">
          {projects.map((project) => <ProjectCard key={project.title} project={project} onOpenCaseStudy={(p) => setActiveProject(p)} />)}
        </div>
        <motion.div style={{ textAlign: 'center', marginTop: '4rem' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}>
          <a href="https://github.com/ArchaicScribe" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Exo 2', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: '#a8d8e8', textDecoration: 'none', padding: '0.75rem 1.5rem', border: '1px solid rgba(79, 195, 220, 0.3)', letterSpacing: '0.05em', transition: 'all 200ms ease' }}>VIEW MORE ON GITHUB →</a>
        </motion.div>
      </div>
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onNavigate={navigateToProject}
          isTransitioning={isTransitioning}
        />
      )}
    </section>
  )
}
export default Projects
