import { useEffect, useRef, cloneElement } from 'react'
import { STATUS_COLORS } from '../constants/statusColors'

export function CaseStudyModal({ project, onClose, onNavigate, isTransitioning }) {
    const { title, status, tags, fullCaseStudy, diagram } = project
    const panelRef = useRef(null)

    // Scroll to top on project change
    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.scrollTop = 0
        }
    }, [project])

    // Escape key handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    // Scroll lock
    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(4, 9, 16, 0.92)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backdropFilter: 'blur(4px)',
    }

    const panelStyle = {
        background: '#0b1520',
        border: '1px solid rgba(143, 240, 255, 0.25)',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 250ms ease',
    }

    const headerStyle = {
        padding: '1.5rem 2rem 1rem',
        borderBottom: '1px solid rgba(143, 240, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }

    const tagStyle = {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.7rem',
        color: 'var(--text-secondary)',
        backgroundColor: 'rgba(79, 195, 220, 0.1)',
        padding: '3px 10px',
        letterSpacing: '0.05em',
    }

    const sectionStyle = {
        display: 'flex',
        gap: '1rem',
    }

    const labelStyle = {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.8rem',
        color: '#6a8a9a',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '0.5rem',
    }

    const contentStyle = {
        fontFamily: "'Exo 2', sans-serif",
        fontSize: '1rem',
        fontWeight: 300,
        color: 'var(--text-primary)',
        lineHeight: 1.75,
    }

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div ref={panelRef} style={panelStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={headerStyle}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                            <h3 style={{
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '1.2rem',
                                fontWeight: 500,
                                color: '#8ff0ff',
                                margin: 0,
                                letterSpacing: '0.05em',
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
                                color: STATUS_COLORS[status],
                            }}>
                                {status}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {tags.map((t) => <span key={t} style={tagStyle}>{t}</span>)}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#6a8a9a',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            letterSpacing: '0.1em',
                            transition: 'color 200ms ease',
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#8ff0ff'}
                        onMouseLeave={(e) => e.target.style.color = '#6a8a9a'}
                    >
                        [ CLOSE ]
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* PROBLEM */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: '#8ff0ff', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>PROBLEM</div>
                            <div style={contentStyle}>{fullCaseStudy.problem}</div>
                        </div>
                    </div>

                    {/* DECISION */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: '#8ff0ff', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>DECISION</div>
                            <div style={contentStyle}>{fullCaseStudy.decision}</div>
                        </div>
                    </div>

                    {/* OUTCOME */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: '#8ff0ff', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>OUTCOME</div>
                            <div style={contentStyle}>{fullCaseStudy.outcome}</div>
                        </div>
                    </div>

                    {/* ARCHITECTURE (if diagram exists) */}
                    {diagram && (
                        <div style={{
                            borderTop: '1px solid rgba(143, 240, 255, 0.1)',
                            paddingTop: '1.5rem',
                        }}>
                            <div style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.8rem',
                                color: '#6a8a9a',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem',
                            }}>
                                ARCHITECTURE
                            </div>
                            {diagram ? cloneElement(diagram, { onNavigate }) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CaseStudyModal
