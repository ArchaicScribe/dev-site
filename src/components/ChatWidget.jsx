import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "SYSTEM ONLINE · I can answer questions about Alex's background, experience, projects, and technical skills. What would you like to know?",
}

export default function ChatWidget({ injectedContext, onContextCleared }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [messages, setMessages] = useState([INITIAL_MESSAGE])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [activeSystemPrompt, setActiveSystemPrompt] = useState(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    // Handle injected context from Resume Analyzer
    useEffect(() => {
        if (injectedContext) {
            setActiveSystemPrompt(injectedContext.systemPrompt)
            setMessages(injectedContext.messages || [INITIAL_MESSAGE])
            setIsOpen(true)
            setIsExpanded(true)
        }
    }, [injectedContext])

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = {
            role: 'user',
            content: input.trim()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        // Add typing indicator
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'PROCESSING...',
            isTyping: true,
        }])

        try {
            const requestBody = {
                messages: [...messages, userMessage]
                    .filter(m => !m.isTyping)
                    .filter(m => m.role === 'user' || (m.role === 'assistant' && m !== INITIAL_MESSAGE))
                    .map(m => ({ role: m.role, content: m.content }))
            }

            // Include custom system prompt if set by Resume Analyzer
            if (activeSystemPrompt) {
                requestBody.systemPrompt = activeSystemPrompt
            }

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            // Remove typing indicator
            setMessages(prev => prev.filter(m => !m.isTyping))

            if (response.status === 429) {
                const data = await response.json()
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: `RATE LIMIT REACHED: Maximum requests exceeded. Please try again in ${data.resetIn} minutes.`
                }])
                setIsLoading(false)
                return
            }

            if (!response.ok) {
                throw new Error('API request failed')
            }

            const data = await response.json()
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content
            }])
        } catch (err) {
            setMessages(prev =>
                prev
                    .filter(m => !m.isTyping)
                    .concat({
                        role: 'assistant',
                        content: 'SIGNAL LOST · Connection failed. Please try again.',
                    })
            )
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const handleReset = () => {
        setActiveSystemPrompt(null)
        setMessages([INITIAL_MESSAGE])
        if (onContextCleared) {
            onContextCleared()
        }
    }

    return (
        <>
            <button
                className="chat-widget-trigger"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <svg
                    className="chat-widget-trigger-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </button>

            {isOpen && (
                <div className={`chat-widget-panel ${isExpanded ? 'chat-widget-panel-expanded' : ''}`}>
                    <div className="chat-widget-header">
                        <div className="chat-widget-header-title">
                            {activeSystemPrompt ? 'ANALYSIS CONTEXT' : 'FORERUNNER INTERFACE'}
                        </div>
                        <div className="chat-widget-header-status">
                            <div className={`chat-widget-status-dot ${activeSystemPrompt ? 'chat-widget-status-dot-context' : ''}`} />
                            {activeSystemPrompt ? 'CONTEXT MODE' : 'ONLINE'}
                        </div>
                        <div className="chat-widget-header-controls">
                            {activeSystemPrompt && (
                                <button
                                    className="chat-widget-reset"
                                    onClick={handleReset}
                                    title="Reset to normal mode"
                                >
                                    ↺
                                </button>
                            )}
                            <button
                                className="chat-widget-expand"
                                onClick={() => setIsExpanded(prev => !prev)}
                                title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                                {isExpanded ? '⤡' : '⤢'}
                            </button>
                            <button
                                className="chat-widget-close"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div className="chat-widget-messages">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`chat-message ${m.isTyping ? 'chat-message-typing' : ''} ${m.role}`}
                            >
                                <span className="chat-message-label">
                                    {m.role === 'user' ? '// YOU' : '// SYSTEM'}
                                </span>
                                <div className="chat-message-bubble">{m.content}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-widget-input-row">
                        <input
                            className="chat-widget-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about Alex's experience..."
                            disabled={isLoading}
                        />
                        <button
                            className="chat-widget-send"
                            onClick={sendMessage}
                            disabled={isLoading || !input.trim()}
                        >
                            SEND
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
