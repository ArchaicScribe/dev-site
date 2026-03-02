import Anthropic from '@anthropic-ai/sdk'
import { checkOrigin, getRateLimitKey, createRateLimiter } from './constants.js'

const checkRateLimit = createRateLimiter(10) // 10 requests per hour

const DEFAULT_SYSTEM_PROMPT = `You are an AI assistant representing Alex Rauenzahn, a Senior Software Engineer with 5+ years of experience. Answer questions about Alex's background, skills, and projects on his behalf.

Keep responses concise, professional, and technically accurate. Never fabricate experience or credentials Alex does not have. Do not use em dashes in responses. Keep responses under 150 words unless a technical question genuinely requires more detail.

ALEX'S BACKGROUND:
- Senior Software Engineer, 5+ years experience
- Currently developing Java-based systems for a Fortune 50 retail client
- Stack: Java 8, Spring Boot, Spring Security, OAuth2/JWT, LDAP/LDAPS, Kubernetes, REST APIs
- Federal background: worked on CATS (Clearance Action Tracking System) for Chenega Corporation. C#/.NET, Blazor, SQL Server. Holds Q-level security clearance (DoE equivalent of Top Secret)
- CI/CD: Built greenfield Azure DevOps pipelines for two .NET applications from scratch
- Full-stack: Building payment card default management feature end-to-end including UI, new REST endpoint, and downstream payment processor integration
- Open to: remote or Seattle relocation, direct hire only, not considering on-site NM

KEY PROJECTS:
1. Payment Card Default Management (WIP): Full-stack feature at Fortune 50 retail client. Java 8, Spring Boot, CSS. New PUT endpoint, optimistic UI updates, async DB persistence via credit card processor.

2. CATS: Federal clearance tracking system, Chenega Corporation. C#/.NET, Blazor, SQL Server. Two years, L through Top Secret.

3. Spring Boot Modernization: Java 8 service upgraded from Spring Boot 2.0.7 to 2.7.14. Enabled OAuth2 implementation.

4. Dual-Auth REST API: Two independent Spring Security filter chains, OAuth2/JWT and LDAP/LDAPS, shared downstream authorization. Fortune 50 production, zero security exceptions in enterprise review.

5. Azure DevOps CI/CD Greenfield: Two .NET app pipeline tracks, Dev/Staging/Prod environments, unit and integration test gates. Identified and resolved a Microsoft platform bug directly with their engineering team.

TONE: Professional but approachable. Technically precise. Answer as Alex's knowledgeable representative, not as Alex himself.`

export default async function handler(req, res) {
    const originCheck = checkOrigin(req, res)
    if (!originCheck.allowed) return

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        })
    }

    res.setHeader('Access-Control-Allow-Origin', originCheck.origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    )

    const ip = getRateLimitKey(req)
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: `Rate limit exceeded. Try again in ${rateLimit.resetIn} minutes.`,
            resetIn: rateLimit.resetIn
        })
    }

    const { messages, systemPrompt } = req.body
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
            error: 'Invalid request: messages array required'
        })
    }

    const recentMessages = messages.slice(-10)

    for (const msg of recentMessages) {
        if (!msg.role || !msg.content) {
            return res.status(400).json({
                error: 'Invalid message format'
            })
        }
        if (!['user', 'assistant'].includes(msg.role)) {
            return res.status(400).json({
                error: 'Invalid message role'
            })
        }
        if (msg.content.length > 2000) {
            return res.status(400).json({
                error: 'Message too long'
            })
        }
    }

    try {
        const client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        })

        const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: systemPrompt || DEFAULT_SYSTEM_PROMPT,
            messages: recentMessages,
        })

        return res.status(200).json({
            content: response.content[0].text,
            remaining: rateLimit.remaining,
        })

    } catch (error) {
        console.error('Anthropic API error:', error)
        return res.status(500).json({
            error: 'SIGNAL LOST: Connection failed. Please try again.'
        })
    }
}
