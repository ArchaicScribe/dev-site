import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks'
import './ResumeAnalyzer.css'

export function ResumeAnalyzer({ onChatHandoff }) {
    const prefersReducedMotion = useReducedMotion()
    const [jobDescription, setJobDescription] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysis, setAnalysis] = useState(null)
    const [error, setError] = useState(null)

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } } }
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.5 } } }

    const handleAnalyze = async () => {
        if (!jobDescription.trim() || jobDescription.length < 50) {
            setError('Please enter a job description (minimum 50 characters)')
            return
        }

        setIsAnalyzing(true)
        setError(null)
        setAnalysis(null)

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Analysis failed')
            }

            setAnalysis(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsAnalyzing(false)
        }
    }

    const handleChatHandoff = () => {
        if (!analysis) return

        const contextPrompt = `You are continuing a conversation about Alex Rauenzahn's fit for a specific role. Here is the job fit analysis that was just performed:

FIT SCORE: ${analysis.fitScore}/100
SUMMARY: ${analysis.fitSummary}

STRONG MATCHES:
${analysis.strongMatches.map(m => `- ${m}`).join('\n')}

RELEVANT PROJECTS:
${analysis.relevantProjects.map(p => `- ${p}`).join('\n')}

GAPS:
${analysis.gaps.map(g => `- ${g}`).join('\n')}

INTERVIEW TALKING POINTS:
${analysis.interviewTalkingPoints.map(t => `- ${t}`).join('\n')}

The user may want to:
- Ask follow-up questions about specific skills or experience
- Get more detail on how projects relate to the job requirements
- Discuss strategies for addressing gaps
- Explore the talking points further

Be helpful and specific. Reference the analysis when relevant. Keep responses concise and actionable.`

        const initialMessages = [
            {
                role: 'assistant',
                content: `I've reviewed the job fit analysis (Score: ${analysis.fitScore}/100). I can help you explore Alex's qualifications in more detail, discuss the identified gaps, or expand on the interview talking points. What would you like to know more about?`
            }
        ]

        onChatHandoff({
            systemPrompt: contextPrompt,
            messages: initialMessages
        })
    }

    const getScoreColor = (score) => {
        if (score >= 80) return '#70e0a0'
        if (score >= 60) return '#c8a96e'
        if (score >= 40) return '#d4743a'
        return '#e05050'
    }

    return (
        <section id="resume-analyzer" className="resume-analyzer-section" aria-labelledby="analyzer-heading">
            <motion.div
                className="resume-analyzer-container"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
            >
                <motion.div className="resume-analyzer-header" variants={itemVariants}>
                    <div className="resume-analyzer-header-line"></div>
                    <h2 id="analyzer-heading" className="resume-analyzer-title">RESUME ANALYZER</h2>
                    <div className="resume-analyzer-header-line"></div>
                </motion.div>

                <motion.p className="resume-analyzer-subtitle" variants={itemVariants}>
                    Paste a job description to analyze fit against Alex's background
                </motion.p>

                <motion.div className="resume-analyzer-input-section" variants={itemVariants}>
                    <label htmlFor="job-description" className="resume-analyzer-label">
            // JOB DESCRIPTION
                    </label>
                    <textarea
                        id="job-description"
                        className="resume-analyzer-textarea"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        rows={8}
                        disabled={isAnalyzing}
                    />
                    <div className="resume-analyzer-char-count">
                        {jobDescription.length} / 10000 characters
                    </div>
                    <button
                        className="resume-analyzer-button"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || jobDescription.length < 50}
                    >
                        {isAnalyzing ? (
                            <>
                                <span className="resume-analyzer-spinner"></span>
                                ANALYZING...
                            </>
                        ) : (
                            'ANALYZE FIT'
                        )}
                    </button>
                </motion.div>

                {error && (
                    <motion.div
                        className="resume-analyzer-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="resume-analyzer-error-icon">!</span>
                        {error}
                    </motion.div>
                )}

                {analysis && (
                    <motion.div
                        className="resume-analyzer-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
                    >
                        <div className="resume-analyzer-results-header">
                            <span className="resume-analyzer-results-title">ANALYSIS COMPLETE</span>
                            <span className="resume-analyzer-remaining">
                                {analysis.remaining} analyses remaining this hour
                            </span>
                        </div>

                        <div className="resume-analyzer-score-section">
                            <div className="resume-analyzer-score-label">FIT SCORE</div>
                            <div
                                className="resume-analyzer-score-value"
                                style={{ color: getScoreColor(analysis.fitScore) }}
                            >
                                {analysis.fitScore}
                                <span className="resume-analyzer-score-max">/100</span>
                            </div>
                        </div>

                        <div className="resume-analyzer-summary">
                            {analysis.fitSummary}
                        </div>

                        <div className="resume-analyzer-sections">
                            <div className="resume-analyzer-section">
                                <h3 className="resume-analyzer-section-title">
                                    <span className="resume-analyzer-section-icon" style={{ color: '#70e0a0' }}>+</span>
                                    Strong Matches
                                </h3>
                                <ul className="resume-analyzer-list">
                                    {analysis.strongMatches.map((match, i) => (
                                        <li key={i}>{match}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="resume-analyzer-section">
                                <h3 className="resume-analyzer-section-title">
                                    <span className="resume-analyzer-section-icon" style={{ color: '#8ff0ff' }}>◆</span>
                                    Relevant Projects
                                </h3>
                                <ul className="resume-analyzer-list">
                                    {analysis.relevantProjects.map((project, i) => (
                                        <li key={i}>{project}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="resume-analyzer-section">
                                <h3 className="resume-analyzer-section-title">
                                    <span className="resume-analyzer-section-icon" style={{ color: '#d4743a' }}>-</span>
                                    Gaps to Address
                                </h3>
                                <ul className="resume-analyzer-list resume-analyzer-list-gaps">
                                    {analysis.gaps.length > 0 ? (
                                        analysis.gaps.map((gap, i) => (
                                            <li key={i}>{gap}</li>
                                        ))
                                    ) : (
                                        <li className="resume-analyzer-no-gaps">No significant gaps identified</li>
                                    )}
                                </ul>
                            </div>

                            <div className="resume-analyzer-section resume-analyzer-section-full">
                                <h3 className="resume-analyzer-section-title">
                                    <span className="resume-analyzer-section-icon" style={{ color: '#c8a96e' }}>▶</span>
                                    Interview Talking Points
                                </h3>
                                <ul className="resume-analyzer-list resume-analyzer-list-talking-points">
                                    {analysis.interviewTalkingPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <button
                            className="resume-analyzer-chat-button"
                            onClick={handleChatHandoff}
                        >
                            <svg className="resume-analyzer-chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            OPEN AI CHAT TO DISCUSS
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </section>
    )
}

export default ResumeAnalyzer
