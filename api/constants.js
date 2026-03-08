export const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://alexrauenzahn.dev',
    'https://www.alexrauenzahn.dev'
]

export const RATE_LIMIT_WINDOW = 3600000 // 1 hour in milliseconds

export function getRateLimitKey(req) {
    return req.headers['x-forwarded-for']
        || req.headers['x-real-ip']
        || 'unknown'
}

export function checkOrigin(req, res) {
    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || ''
    const isAllowedOrigin = ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))

    if (!isAllowedOrigin) {
        res.status(403).json({
            error: 'Forbidden: Origin not allowed'
        })
        return { allowed: false, origin }
    }

    return { allowed: true, origin }
}

export function createRateLimiter(maxRequests) {
    const store = new Map()

    return function checkRateLimit(ip) {
        const now = Date.now()
        const record = store.get(ip)

        if (!record) {
            store.set(ip, {
                count: 1,
                windowStart: now
            })
            return {
                allowed: true,
                remaining: maxRequests - 1
            }
        }

        if (now - record.windowStart > RATE_LIMIT_WINDOW) {
            store.set(ip, {
                count: 1,
                windowStart: now
            })
            return {
                allowed: true,
                remaining: maxRequests - 1
            }
        }

        if (record.count >= maxRequests) {
            const resetIn = Math.ceil(
                (RATE_LIMIT_WINDOW - (now - record.windowStart))
                / 60000
            )
            return { allowed: false, resetIn }
        }

        record.count++
        store.set(ip, record)
        return {
            allowed: true,
            remaining: maxRequests - record.count
        }
    }
}
