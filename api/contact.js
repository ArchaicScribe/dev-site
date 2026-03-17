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

        const htmlBody = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
body{margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.wrap{max-width:600px;margin:40px auto;background:#111111;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden}
.header{background:#161616;padding:24px 32px;border-bottom:1px solid #2a2a2a}
.header h1{margin:0;font-family:'Courier New',monospace;font-size:16px;letter-spacing:0.15em;color:#c8a96e}
.body{padding:32px}
.field{margin-bottom:24px}
.label{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#666;margin-bottom:6px;font-family:'Courier New',monospace}
.value{font-size:15px;color:#e0e0e0}
.value a{color:#c8a96e;text-decoration:none}
.message{background:#0d0d0d;border:1px solid #2a2a2a;border-radius:4px;padding:16px;font-size:14px;line-height:1.7;color:#cccccc;white-space:pre-wrap;word-break:break-word}
.footer{padding:16px 32px;border-top:1px solid #2a2a2a;font-size:11px;color:#444;letter-spacing:0.05em}
</style></head>
<body><div class="wrap">
  <div class="header"><h1>// PORTFOLIO.CONTACT_RECEIVED</h1></div>
  <div class="body">
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message">${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</div>
    </div>
  </div>
  <div class="footer">alexrauenzahn.dev &mdash; reply directly to respond to ${name}</div>
</div></body></html>`

        await resend.emails.send({
            from: 'Portfolio Contact <contact@alexrauenzahn.dev>',
            to: 'alex.rauenzahn@gmail.com',
            replyTo: email,
            subject: `Portfolio contact from ${name}`,
            html: htmlBody,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })

        return res.status(200).json({ success: true })
    } catch (error) {
        console.error('Resend error:', error.message)
        return res.status(500).json({ error: 'Failed to send message. Please try again.' })
    }
}
