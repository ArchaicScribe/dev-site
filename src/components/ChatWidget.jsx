import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

const SYSTEM_PROMPT = `You are an AI assistant representing Alex Rauenzahn, a Senior Software Engineer with 5+ years of experience. You answer questions about Alex's background, skills, and projects on his behalf. You are integrated into his portfolio website which has a Halo Forerunner aesthetic. Keep responses concise, professional, and technically accurate. Never fabricate experience or credentials Alex does not have.

ALEX'S BACKGROUND:
- Senior Software Engineer, 5+ years experience
- Currently developing Java-based systems for a Fortune 50 retail client
- Stack: Java 8, Spring Boot, Spring Security, OAuth2/JWT, LDAP/LDAPS, Kubernetes, REST APIs
- Federal background: worked on CATS (Clearance Action Tracking System) for Chenega Corporation, a federal contractor. Built with C#/.NET, Blazor, SQL Server. Holds Q-level security clearance (DoE equivalent of Top Secret)
- CI/CD: Built greenfield Azure DevOps pipelines for two .NET applications from scratch
- Full-stack: Currently building a payment card default management feature end-to-end including UI, new REST endpoint, and downstream payment processor integration
- Open to: remote or Seattle relocation, direct hire only, not considering on-site NM

KEY PROJECTS:
1. Payment Card Default Management (WIP): Full-stack feature at Fortune 50 retail client. Java 8, Spring Boot, CSS. New PUT endpoint in Payment Wrapper Service, optimistic UI updates, async DB persistence via credit card processor
2. CATS: Federal clearance tracking system, Chenega Corporation. C#/.NET, Blazor, SQL Server. Two years, L through Top Secret clearance levels
3. Spring Boot Modernization: Java 8 service upgraded from Spring Boot 2.0.7 to 2.7.14. Enabled OAuth2 implementation. Deliberate Java 8 ceiling decision
4. Dual-Auth REST API: Two independent Spring Security filter chains, OAuth2/JWT and LDAP/LDAPS, shared downstream authorization layer. Fortune 50 production, zero security exceptions in review
5. Azure DevOps CI/CD Greenfield: Two .NET app pipeline tracks, Dev/Staging/Prod environments, unit and integration test gates, identified and resolved a Microsoft platform bug directly with their engineering team

TONE: Professional but approachable. Technically precise. Do not use em dashes. Do not use overly formal language. Answer as if you are Alex's knowledgeable representative, not Alex himself. Keep responses under 150 words unless a technical question genuinely requires more detail.`

const INITIAL_MESSAGE = {
    role: 'assistant',
    content: "SYSTEM ONLINE · I can answer questions about Alex's background, experience, projects, and technical skills. What would you like to know?",
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([INITIAL_MESSAGE])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

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
            const response = await fetch(
                'https://api.anthropic.com/v1/messages',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1000,
                        system: SYSTEM_PROMPT,
                        messages: messages
                            .filter(m => !m.isTyping)
                            .concat(userMessage)
                            .filter(m => m.role !== 'assistant' || m !== INITIAL_MESSAGE)
                            .map(m => ({
                                role: m.role,
                                content: m.content,
                            })),
                    }),
                }
            )

            const data = await response.json()
            const reply = data.content?.[0]?.text || 'SIGNAL LOST · Please try again.'

            setMessages(prev =>
                prev
                    .filter(m => !m.isTyping)
                    .concat({
                        role: 'assistant',
                        content: reply,
                    })
            )
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
                <div className="chat-widget-panel">
                    <div className="chat-widget-header">
                        <div className="chat-widget-header-title">FORERUNNER INTERFACE</div>
                        <div className="chat-widget-header-status">
                            <div className="chat-widget-status-dot" />
                            ONLINE
                        </div>
                        <button
                            className="chat-widget-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
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
