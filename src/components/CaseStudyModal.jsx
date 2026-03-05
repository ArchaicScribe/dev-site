import { useEffect, useRef, cloneElement } from 'react'
import { STATUS_COLORS } from '../constants/statusColors'

export function CaseStudyModal({ project, onClose, onNavigate, isTransitioning, prevProject, nextProject, currentIndex, totalCount }) {
    const { title, status, tags, fullCaseStudy, diagram } = project
    const panelRef = useRef(null)

    // Scroll to top on project change
    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.scrollTop = 0
        }
    }, [project])

    // Keyboard navigation handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose()
                    break
                case 'ArrowLeft':
                    if (prevProject) onNavigate(prevProject.title)
                    break
                case 'ArrowRight':
                    if (nextProject) onNavigate(nextProject.title)
                    break
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onClose, onNavigate, prevProject, nextProject])


    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(4, 9, 16, 0.92)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(4px)',
        overflow: 'hidden',
        touchAction: 'pan-y',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
    }

    const panelStyle = {
        touchAction: 'pan-y',
        background: 'var(--ui-panel-bg)',
        border: '1px solid var(--ui-panel-border)',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: 'calc(100vh - 2rem)',
        paddingTop: '4rem',
        minHeight: 0,
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 250ms ease',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
    }

    const headerStyle = {
        padding: '1.5rem 2rem 1rem',
        borderBottom: '1px solid var(--ui-panel-border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
    }

    const tagStyle = {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.7rem',
        color: 'var(--text-secondary)',
        backgroundColor: 'var(--ui-highlight-glow)',
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
        color: 'var(--chat-muted)',
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
        <div className="case-study-overlay" style={overlayStyle} onClick={onClose}>
            <div ref={panelRef} className="case-study-panel" style={panelStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="case-study-header" style={headerStyle}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                            <h3 style={{
                                fontFamily: "'Orbitron', sans-serif",
                                fontSize: '1.2rem',
                                fontWeight: 500,
                                color: 'var(--ui-highlight)',
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
                            color: 'var(--chat-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            letterSpacing: '0.1em',
                            transition: 'color 200ms ease',
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--ui-highlight)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--chat-muted)'}
                    >
                        [ CLOSE ]
                    </button>
                </div>

                {/* Navigation Bar */}
                {(prevProject || nextProject) && (
                    <div className="case-study-nav" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.6rem 1.5rem',
                        borderBottom: '1px solid var(--ui-panel-border-light)',
                        background: 'var(--ui-highlight-glow)',
                    }}>
                        {prevProject ? (
                            <button
                                onClick={() => onNavigate(prevProject.title)}
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: 'var(--ui-highlight)',
                                    background: 'none',
                                    border: '1px solid var(--chat-user-bubble-border)',
                                    padding: '0.4rem 0.9rem',
                                    cursor: 'pointer',
                                    letterSpacing: '0.08em',
                                    transition: 'border-color 200ms, background 200ms',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = 'var(--ui-input-border-focus)'
                                    e.target.style.background = 'var(--ui-highlight-glow)'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = 'var(--chat-user-bubble-border)'
                                    e.target.style.background = 'none'
                                }}
                            >
                                ◂ {prevProject.title}
                            </button>
                        ) : <div />}
                        <span style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.7rem',
                            color: 'var(--chat-muted)',
                            letterSpacing: '0.1em',
                        }}>
                            {currentIndex + 1} / {totalCount}
                        </span>
                        {nextProject ? (
                            <button
                                onClick={() => onNavigate(nextProject.title)}
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: 'var(--ui-highlight)',
                                    background: 'none',
                                    border: '1px solid var(--chat-user-bubble-border)',
                                    padding: '0.4rem 0.9rem',
                                    cursor: 'pointer',
                                    letterSpacing: '0.08em',
                                    transition: 'border-color 200ms, background 200ms',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.borderColor = 'var(--ui-input-border-focus)'
                                    e.target.style.background = 'var(--ui-highlight-glow)'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.borderColor = 'var(--chat-user-bubble-border)'
                                    e.target.style.background = 'none'
                                }}
                            >
                                {nextProject.title} ▸
                            </button>
                        ) : <div />}
                    </div>
                )}

                {/* Body */}
                <div className="case-study-body" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* PROBLEM */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: 'var(--ui-highlight)', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>PROBLEM</div>
                            <div style={contentStyle}>{fullCaseStudy.problem}</div>
                        </div>
                    </div>

                    {/* DECISION */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: 'var(--ui-highlight)', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>DECISION</div>
                            <div style={contentStyle}>{fullCaseStudy.decision}</div>
                        </div>
                    </div>

                    {/* OUTCOME */}
                    <div style={sectionStyle}>
                        <div style={{ width: '2px', backgroundColor: 'var(--ui-highlight)', flexShrink: 0 }}></div>
                        <div>
                            <div style={labelStyle}>OUTCOME</div>
                            <div style={contentStyle}>{fullCaseStudy.outcome}</div>
                        </div>
                    </div>

                    {/* ARCHITECTURE (if diagram exists) */}
                    {diagram && (
                        <div style={{
                            borderTop: '1px solid var(--ui-panel-border-light)',
                            paddingTop: '1.5rem',
                        }}>
                            <div style={{
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.8rem',
                                color: 'var(--chat-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem',
                            }}>
                                ARCHITECTURE
                            </div>
                            <div style={{
                                width: '100%',
                                overflowX: 'auto',
                                overscrollBehavior: 'contain',
                                touchAction: 'pan-y',
                                flexShrink: 0
                            }}>
                                {diagram ? cloneElement(diagram, { onNavigate }) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CaseStudyModal
