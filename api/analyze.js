import Anthropic from '@anthropic-ai/sdk'
import { checkOrigin, getRateLimitKey, createRateLimiter } from './constants.js'

const checkRateLimit = createRateLimiter(5) // 5 analyses per hour

const SYSTEM_PROMPT = `You are an expert resume analyst evaluating job fit for Alex Rauenzahn, a Solutions Architect. Analyze the provided job description against Alex's background and provide a structured assessment.

ALEX'S BACKGROUND:
- Solutions Architect, 6+ years experience in enterprise modernization and cloud-native system design
- Currently: Leading greenfield architecture projects for Fortune 50 clients, from stakeholder discovery through delivery. Presenting architecture decisions to business leadership, diagramming in Draw.io, and building end to end.
- Architecture focus: decomposing monoliths, API surface design, auth system architecture, microservices, cloud migration, stakeholder advisory
- Azure: Hands-on production experience. Pursuing AZ-104 and AZ-305 (Azure Solutions Architect Expert path)
- AWS: In progress — SAA-C03 planned
- Languages: Java, C#/.NET (deep experience in both), TypeScript, SQL
- Stack: Spring Boot, Spring Security, OAuth2/JWT, LDAP/LDAPS, Kubernetes (Rancher), Docker, Azure DevOps
- Federal background: CATS system at Chenega Corporation (DoE). C#/.NET, Blazor, SQL Server. Formerly Q-cleared.
- CI/CD: Designed greenfield Azure DevOps pipelines for two .NET applications from scratch

KEY PROJECTS:
1. Enterprise Modernization: Architected migration of Java 8 legacy service to Spring Boot 2.7/Spring Cloud at Fortune 50. Owned design, implementation, and delivery under strict uptime SLAs.
2. Dual-Auth REST API: Designed dual-authentication system using two Spring Security filter chains (OAuth2/JWT + LDAP/LDAPS) with shared authorization. Zero security exceptions in enterprise review.
3. Legacy Code Modernization Agent: Designing a multi-agent AI system (C#, Semantic Kernel, Claude API) that analyzes codebases for anti-patterns, security vulnerabilities, design pattern gaps, and clean code violations.
4. CATS: Federal clearance tracking system. C#/.NET, Blazor, SQL Server. Two years, L through Top Secret clearances.
5. Azure DevOps CI/CD: Designed two .NET pipeline tracks (Dev/Staging/Prod) with test gates. Resolved platform bug directly with Microsoft engineering.

AI/ML: Building with Claude API and Semantic Kernel for multi-agent systems. Resume Analyzer on portfolio site is a live AI-powered feature.

PREFERENCES: Washington state or remote. Direct hire only. Not considering contracts, government roles, or staffing agencies.

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
            console.error('JSON parse error:', parseError.message)
            return res.status(500).json({
                error: 'Failed to parse analysis response'
            })
        }

        // Validate required fields
        const requiredFields = ['fitScore', 'fitSummary', 'strongMatches', 'relevantProjects', 'gaps', 'interviewTalkingPoints']
        for (const field of requiredFields) {
            if (!(field in analysis)) {
                return res.status(500).json({
                    error: 'Analysis response was invalid. Please try again.'
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
