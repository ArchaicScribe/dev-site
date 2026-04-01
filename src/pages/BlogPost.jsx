import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MDXProvider } from '@mdx-js/react'
import { useReducedMotion } from '../hooks'
import { ForerunnerBackground } from '../components'
import { useTheme } from '../context/ThemeContext'
import { MDXComponents } from '../components/blog/MDXComponents'
import './BlogPost.css'

const modules = import.meta.glob('../posts/*.mdx', { eager: true })

export function BlogPost() {
  const { slug } = useParams()
  const prefersReducedMotion = useReducedMotion()
  const { theme } = useTheme()

  const mod = modules[`../posts/${slug}.mdx`]
  if (!mod) return <Navigate to="/blog" replace />

  const PostContent = mod.default
  const meta = mod.meta ?? {}

  return (
    <>
      <ForerunnerBackground theme={theme} />
      <main className="blog-post-page" id="main-content">
        <div className="blog-post-container">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          >
            <Link to="/blog" className="blog-post-back">← BACK TO BLOG</Link>

            <header className="blog-post-header">
              <div className="blog-post-meta">
                <span className="blog-post-date">
                  {new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                {meta.readingTime && (
                  <span className="blog-post-reading-time">{meta.readingTime} min read</span>
                )}
              </div>

              <h1 className="blog-post-title">{meta.title}</h1>

              {meta.description && (
                <p className="blog-post-description">{meta.description}</p>
              )}

              {meta.tags?.length > 0 && (
                <div className="blog-post-tags">
                  {meta.tags.map(tag => (
                    <span key={tag} className="blog-post-tag">{tag}</span>
                  ))}
                </div>
              )}

              {meta.coverImage && (
                <div className="blog-post-cover">
                  <img src={meta.coverImage} alt={meta.title} />
                </div>
              )}
            </header>

            <div className="blog-post-divider" />

            <article className="blog-post-content">
              <MDXProvider components={MDXComponents}>
                <PostContent />
              </MDXProvider>
            </article>

            <div className="blog-post-divider" />

            <footer className="blog-post-footer">
              <Link to="/blog" className="blog-post-back">← BACK TO BLOG</Link>
            </footer>
          </motion.div>
        </div>
      </main>
    </>
  )
}

export default BlogPost
