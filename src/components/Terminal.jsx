import { useState, useEffect, useRef, useCallback } from 'react'
import { projects } from '../data/projects'
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data/config'
import './Terminal.css'

const BOOT_SEQUENCE = [
    'FORERUNNER NETWORK INTERFACE v7.2.1',
    'AUTHENTICATING MONITOR ACCESS...',
    'CLEARANCE VERIFIED',
    'ARCHIVE SUBSYSTEM ONLINE',
    'WELCOME, RECLAIMER',
]

const COMMANDS = {
    help: () => ({
        type: 'system',
        content: `
AVAILABLE COMMANDS:
═══════════════════════════════════════════════════════
  help       Display this command reference
  about      Personnel dossier and specializations
  projects   List archived project records
  contact    Communication channels
  resume     Retrieve personnel file
  clearance  Security classification status
  status     Active system modules
  whoami     Current operator identification
  clear      Clear terminal output
  exit       Close terminal interface
═══════════════════════════════════════════════════════
`.trim()
    }),

    about: () => ({
        type: 'system',
        content: `
╔═══════════════════════════════════════════════════════╗
║  PERSONNEL DOSSIER — CLASSIFIED                       ║
╠═══════════════════════════════════════════════════════╣
║  DESIGNATION:    Alex Rauenzahn                       ║
║  ROLE:           Senior Software Engineer             ║
║  EXPERIENCE:     5+ Years Active Development          ║
║  CLEARANCE:      Q-Level (DOE Top Secret Equivalent)  ║
╠═══════════════════════════════════════════════════════╣
║  SPECIALIZATIONS:                                     ║
║  • Enterprise Java / Spring Boot Architecture         ║
║  • C#/.NET Full-Stack Development                     ║
║  • React Frontend Engineering                         ║
║  • Azure Cloud & DevOps Pipeline Design               ║
║  • Federal Security Compliance Systems                ║
╚═══════════════════════════════════════════════════════╝
`.trim()
    }),

    projects: () => {
        const projectLines = projects.map((p, i) => {
            const status = p.status || 'UNKNOWN'
            const statusClass = status.toLowerCase().replace(' ', '-')
            const title = p.title.length > 45 ? p.title.substring(0, 42) + '...' : p.title
            return `  [${String(i + 1).padStart(2, '0')}] ${title.padEnd(48)} [${status}]`
        }).join('\n')

        return {
            type: 'system',
            content: `
PROJECT ARCHIVE — 5 RECORDS FOUND
═══════════════════════════════════════════════════════════════════
${projectLines}
═══════════════════════════════════════════════════════════════════
`.trim()
        }
    },

    contact: () => ({
        type: 'system',
        content: `
COMMUNICATION CHANNELS
═══════════════════════════════════════════════════════
  EMAIL     ${EMAIL}
  GITHUB    ${GITHUB_URL}
  LINKEDIN  ${LINKEDIN_URL}
═══════════════════════════════════════════════════════
`,
        links: [
            { text: EMAIL, url: `mailto:${EMAIL}` },
            { text: GITHUB_URL, url: GITHUB_URL },
            { text: LINKEDIN_URL, url: LINKEDIN_URL },
        ]
    }),

    resume: () => ({
        type: 'system',
        content: `RETRIEVING PERSONNEL FILE...

DOWNLOAD:`,
        downloadLink: { text: 'AlexRauenzahn_Resume_Jan_2026.pdf', url: '/AlexRauenzahn_Resume_Jan_2026.pdf' }
    }),

    clearance: () => ({
        type: 'system',
        content: `
╔═══════════════════════════════════════════════════════╗
║  SECURITY CLASSIFICATION QUERY                        ║
╠═══════════════════════════════════════════════════════╣
║  SECURITY LEVEL:  Q-EQUIVALENT (DOE TOP SECRET)       ║
║  ACCESS STATUS:   CONFIRMED                           ║
║  SCOPE:           CLASSIFIED FEDERAL SYSTEMS          ║
║  PERSONNEL FILE:  SEALED                              ║
╠═══════════════════════════════════════════════════════╣
║  CLEARANCE VERIFICATION COMPLETE                      ║
╚═══════════════════════════════════════════════════════╝
`.trim()
    }),

    status: () => ({
        type: 'system',
        content: `
SYSTEM STATUS — ACTIVE MODULES
═══════════════════════════════════════════════════════
  Java 17 / Spring Boot 3.x      [ONLINE]
  C# / .NET 8                    [ONLINE]
  React 18 / Vite                [ONLINE]
  Azure Cloud Services           [ONLINE]
  SQL Server / PostgreSQL        [ONLINE]
  Spring Security / OAuth2       [ONLINE]
  Azure DevOps CI/CD             [ONLINE]
═══════════════════════════════════════════════════════
  ALL SYSTEMS OPERATIONAL
`.trim()
    }),

    whoami: () => ({
        type: 'system',
        content: 'SENIOR SOFTWARE ENGINEER. RECLAIMER DESIGNATION: ALEX RAUENZAHN.'
    }),

    clear: () => ({ type: 'clear' }),

    exit: () => ({ type: 'exit' }),
}

export function Terminal({ onClose }) {
    const [output, setOutput] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [commandHistory, setCommandHistory] = useState([])
    const [historyIndex, setHistoryIndex] = useState(-1)
    const [isBooting, setIsBooting] = useState(true)
    const [isClosing, setIsClosing] = useState(false)
    const inputRef = useRef(null)
    const outputRef = useRef(null)
    const containerRef = useRef(null)

    // Boot sequence
    useEffect(() => {
        let mounted = true
        const bootLines = []

        const runBootSequence = async () => {
            for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
                if (!mounted) return
                await new Promise(resolve => setTimeout(resolve, 400))
                if (!mounted) return
                bootLines.push({ type: 'boot', content: BOOT_SEQUENCE[i] })
                setOutput([...bootLines])
            }
            if (mounted) {
                await new Promise(resolve => setTimeout(resolve, 400))
                setIsBooting(false)
            }
        }

        runBootSequence()
        return () => { mounted = false }
    }, [])

    // Focus input when boot completes
    useEffect(() => {
        if (!isBooting && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isBooting])

    // Scroll to bottom on new output
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
    }, [output])

    // Focus trap
    useEffect(() => {
        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }

        const container = containerRef.current
        container?.addEventListener('keydown', handleTabKey)
        return () => container?.removeEventListener('keydown', handleTabKey)
    }, [])

    const handleClose = useCallback(() => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
        }, 200)
    }, [onClose])

    // Escape key handler
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose()
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [handleClose])

    const executeCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase()

        if (!trimmedCmd) return

        // Add command to output
        const newOutput = [...output, { type: 'command', content: `ΨARCHIVE > ${cmd}` }]

        // Add to history (max 20)
        const newHistory = [cmd, ...commandHistory.filter(h => h !== cmd)].slice(0, 20)
        setCommandHistory(newHistory)
        setHistoryIndex(-1)

        // Execute command
        const commandFn = COMMANDS[trimmedCmd]

        if (commandFn) {
            const result = commandFn()

            if (result.type === 'clear') {
                setOutput([])
                return
            }

            if (result.type === 'exit') {
                handleClose()
                return
            }

            newOutput.push(result)
        } else {
            newOutput.push({
                type: 'error',
                content: "COMMAND NOT RECOGNIZED. TYPE 'help' FOR AVAILABLE COMMANDS."
            })
        }

        setOutput(newOutput)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(inputValue)
            setInputValue('')
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (commandHistory.length > 0) {
                const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
                setHistoryIndex(newIndex)
                setInputValue(commandHistory[newIndex])
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1
                setHistoryIndex(newIndex)
                setInputValue(commandHistory[newIndex])
            } else if (historyIndex === 0) {
                setHistoryIndex(-1)
                setInputValue('')
            }
        }
    }

    const renderLine = (line, index) => {
        if (line.downloadLink) {
            const handleDownloadClick = (e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(line.downloadLink.url, '_blank', 'noopener,noreferrer')
            }
            return (
                <div key={index} className={`terminal-line ${line.type}`}>
                    {line.content}
                    <br />
                    <a
                        href={line.downloadLink.url}
                        className="terminal-link"
                        onClick={handleDownloadClick}
                    >
                        {line.downloadLink.text}
                    </a>
                </div>
            )
        }

        if (line.links) {
            // Replace link text with actual clickable links
            let content = line.content
            return (
                <div key={index} className={`terminal-line ${line.type}`}>
                    {content.split('\n').map((textLine, i) => {
                        const link = line.links.find(l => textLine.includes(l.text))
                        if (link) {
                            const parts = textLine.split(link.text)
                            const handleLinkClick = (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(link.url, '_blank', 'noopener,noreferrer')
                            }
                            return (
                                <div key={i}>
                                    {parts[0]}
                                    <a
                                        href={link.url}
                                        className="terminal-link"
                                        onClick={handleLinkClick}
                                    >
                                        {link.text}
                                    </a>
                                    {parts[1]}
                                </div>
                            )
                        }
                        return <div key={i}>{textLine}</div>
                    })}
                </div>
            )
        }

        return (
            <div key={index} className={`terminal-line ${line.type}`}>
                {line.content}
            </div>
        )
    }

    return (
        <div
            className={`terminal-overlay ${isClosing ? 'closing' : ''}`}
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Forerunner Archive Terminal"
        >
            <div className="terminal-window">
                <div className="terminal-header">
                    <h2 className="terminal-title">FORERUNNER ARCHIVE TERMINAL</h2>
                    <button
                        className="terminal-close"
                        onClick={handleClose}
                        aria-label="Close terminal"
                    >
                        ×
                    </button>
                </div>

                <div className="terminal-body">
                    <div className="terminal-output" ref={outputRef}>
                        {output.map((line, index) => renderLine(line, index))}
                        {isBooting && (
                            <div className="terminal-line boot">
                                <span className="terminal-cursor" />
                            </div>
                        )}
                    </div>

                    {!isBooting && (
                        <div className="terminal-input-area">
                            <span className="terminal-prompt">ΨARCHIVE &gt;</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="terminal-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                spellCheck="false"
                                aria-label="Terminal command input"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Terminal
