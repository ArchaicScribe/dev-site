import { Resend } from 'resend'
import { checkOrigin, getRateLimitKey, createRateLimiter } from './constants.js'

const checkRateLimit = createRateLimiter(5) // 5 submissions per hour per IP

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req, res) {
    const originCheck = checkOrigin(req, res)
    if (!originCheck.allowed) return

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    res.setHeader('Access-Control-Allow-Origin', originCheck.origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    const ip = getRateLimitKey(req)
    const rateLimit = checkRateLimit(ip)

    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: `Rate limit exceeded. Try again in ${rateLimit.resetIn} minutes.`,
            resetIn: rateLimit.resetIn
        })
    }

    const { name, email, message } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    if (
        typeof name !== 'string' ||
        typeof email !== 'string' ||
        typeof message !== 'string'
    ) {
        return res.status(400).json({ error: 'Invalid request format' })
    }

    if (name.length > 200 || email.length > 200 || message.length > 5000) {
        return res.status(400).json({ error: 'Input exceeds maximum length' })
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' })
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
            // TODO: switch back to contact@alexrauenzahn.dev once domain verification clears
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'alex.rauenzahn@gmail.com',
            replyTo: email,
            subject: `Portfolio contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        console.error('Resend error:', error.message)
        return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }
}
