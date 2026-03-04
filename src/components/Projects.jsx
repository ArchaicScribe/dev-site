import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import ProjectCard from './ProjectCard'
import CaseStudyModal from './CaseStudyModal'
import { projects } from '../data/projects'
import { fadeUpVariants, staggerContainer, viewportConfig, transition } from '../constants/animationVariants'

export function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionStyle = { padding: '8rem 2rem', backgroundColor: 'var(--ui-input-bg)', position: 'relative' }

  const navigateToProject = (projectTitle) => {
    setIsTransitioning(true)
    setTimeout(() => {
      const target = projects.find(p => p.title === projectTitle)
      if (target) setActiveProject(target)
      setIsTransitioning(false)
    }, 250)
  }

  const currentIndex = projects.findIndex(p => p.title === activeProject?.title)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <section id="projects" style={sectionStyle} aria-labelledby="projects-heading">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-input-border), var(--accent-secondary), var(--ui-input-border), transparent)' }}></div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          style={{ marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={prefersReducedMotion ? { duration: 0 } : transition}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ui-highlight-dim))' }}></div>
          <h2 id="projects-heading" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 500, color: 'var(--accent-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>PROJECTS</h2>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--ui-highlight-dim), transparent)' }}></div>
        </motion.div>
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}
          role="list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {projects.map((project) => <ProjectCard key={project.title} project={project} onOpenCaseStudy={(p) => setActiveProject(p)} useStagger={!prefersReducedMotion} />)}
        </motion.div>
        <motion.div
          style={{ textAlign: 'center', marginTop: '4rem' }}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={prefersReducedMotion ? { duration: 0 } : { ...transition, delay: 0.3 }}
        >
          <a href="https://github.com/ArchaicScribe" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'Exo 2', sans-serif", fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', padding: '0.75rem 1.5rem', border: '1px solid var(--ui-highlight-dim)', letterSpacing: '0.05em', transition: 'all 200ms ease' }}>VIEW MORE ON GITHUB →</a>
        </motion.div>
      </div>
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onNavigate={navigateToProject}
          isTransitioning={isTransitioning}
          prevProject={prevProject}
          nextProject={nextProject}
          currentIndex={currentIndex}
          totalCount={projects.length}
        />
      )}
    </section>
  )
}
export default Projects
