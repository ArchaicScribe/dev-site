import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import { ForerunnerBackground } from '../components'
import { useTheme } from '../context/ThemeContext'
import './Blog.css'

const modules = import.meta.glob('../posts/*.mdx', { eager: true })

const posts = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.replace('../posts/', '').replace('.mdx', ''),
    ...mod.meta,
  }))
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

function estimateReadingTime(content) {
  const words = content?.split(/\s+/).length ?? 0
  return Math.max(1, Math.ceil(words / 200))
}

export function Blog() {
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.4 } },
  }

  return (
    <>
      <ForerunnerBackground theme={theme} />
      <main className="blog-page" id="main-content">
        <div className="blog-container">
          <motion.div className="blog-header" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="blog-header-label">// TRANSMISSIONS</motion.div>
            <motion.h1 variants={itemVariants} className="blog-title">TECH BLOG</motion.h1>
            <motion.p variants={itemVariants} className="blog-subtitle">
              Engineering deep-dives, system design, and hard-won lessons from the field.
            </motion.p>
          </motion.div>

          {posts.length === 0 ? (
            <div className="blog-empty">
              <p>No posts yet. Check back soon.</p>
            </div>
          ) : (
            <motion.div className="blog-grid" variants={containerVariants} initial="hidden" animate="visible">
              {posts.map((post) => (
                <motion.article key={post.slug} variants={itemVariants} className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    {post.coverImage && (
                      <div className="blog-card-image">
                        <img src={post.coverImage} alt={post.title} loading="lazy" />
                      </div>
                    )}
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="blog-card-date">
                          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="blog-card-reading-time">
                          {post.readingTime ?? estimateReadingTime(post.description)} min read
                        </span>
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      <p className="blog-card-description">{post.description}</p>
                      {post.tags?.length > 0 && (
                        <div className="blog-card-tags">
                          {post.tags.map(tag => (
                            <span key={tag} className="blog-card-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                      <span className="blog-card-cta">READ MORE →</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}

export default Blog
