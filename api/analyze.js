import Anthropic from '@anthropic-ai/sdk'
import { checkOrigin, getRateLimitKey, createRateLimiter } from './constants.js'

const checkRateLimit = createRateLimiter(5) // 5 analyses per hour

const SYSTEM_PROMPT = `You are an expert resume analyst evaluating job fit for Alex Rauenzahn, a Senior Software Engineer. Analyze the provided job description against Alex's background and provide a structured assessment.

ALEX'S BACKGROUND:
- Senior Software Engineer, 5+ years experience
- Currently: Java-based systems at Fortune 50 retail client
- Stack: Java 8, Spring Boot, Spring Security, OAuth2/JWT, LDAP/LDAPS, Kubernetes, REST APIs
- Federal background: CATS (Clearance Action Tracking System) at Chenega Corporation. C#/.NET, Blazor, SQL Server. Q-level security clearance (DoE equivalent of Top Secret)
- CI/CD: Built greenfield Azure DevOps pipelines for two .NET applications
- Full-stack: Building payment card default management feature end-to-end (UI, REST endpoint, payment processor integration)

KEY PROJECTS:
1. Payment Card Default Management: Full-stack at Fortune 50. Java 8, Spring Boot, CSS. PUT endpoint, optimistic UI updates, async DB persistence.
2. CATS: Federal clearance tracking system. C#/.NET, Blazor, SQL Server. Two years, L through Top Secret clearances.
3. Spring Boot Modernization: Upgraded service from 2.0.7 to 2.7.14. Enabled OAuth2 implementation.
4. Dual-Auth REST API: Two Spring Security filter chains (OAuth2/JWT + LDAP/LDAPS), shared authorization. Zero security exceptions in enterprise review.
5. Azure DevOps CI/CD: Two .NET pipeline tracks, Dev/Staging/Prod, test gates. Resolved Microsoft platform bug with their engineering team.

PREFERENCES: Washington state, Massachusetts, or remote, direct hire only, not considering on-site NM.

Respond ONLY with valid JSON in this exact format:
{
  "fitScore": <number 0-100>,
  "fitSummary": "<2-3 sentence summary>",
  "strongMatches": ["<skill/requirement match 1>", "<skill/requirement match 2>", ...],
  "relevantProjects": ["<project name with brief relevance>", ...],
  "gaps": ["<missing skill/experience 1>", ...],
  "interviewTalkingPoints": ["<point 1>", "<point 2>", ...]
}

Be honest about gaps. Score conservatively. Do not use em dashes.`

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

    const { jobDescription } = req.body
    if (!jobDescription || typeof jobDescription !== 'string') {
        return res.status(400).json({
            error: 'Invalid request: jobDescription string required'
        })
    }

    if (jobDescription.length > 10000) {
        return res.status(400).json({
            error: 'Job description too long (max 10000 characters)'
        })
    }

    if (jobDescription.length < 50) {
        return res.status(400).json({
            error: 'Job description too short (min 50 characters)'
        })
    }

    try {
        const client = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY
        })

        const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: `Analyze this job description for fit:\n\n${jobDescription}`
            }],
        })

        const text = response.content[0].text

        // Parse JSON from response
        let analysis
        try {
            // Handle potential markdown code blocks
            const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text]
            analysis = JSON.parse(jsonMatch[1].trim())
        } catch (parseError) {
            console.error('JSON parse error:', parseError, 'Raw text:', text)
            return res.status(500).json({
                error: 'Failed to parse analysis response'
            })
        }

        // Validate required fields
        const requiredFields = ['fitScore', 'fitSummary', 'strongMatches', 'relevantProjects', 'gaps', 'interviewTalkingPoints']
        for (const field of requiredFields) {
            if (!(field in analysis)) {
                return res.status(500).json({
                    error: `Analysis missing required field: ${field}`
                })
            }
        }

        return res.status(200).json({
            ...analysis,
            remaining: rateLimit.remaining,
        })

    } catch (error) {
        console.error('Anthropic API error:', error)
        return res.status(500).json({
            error: 'SIGNAL LOST: Analysis failed. Please try again.'
        })
    }
}
