# alexrauenzahn.dev

Personal portfolio site for Alex Rauenzahn, Senior Software Engineer. Built with React + Vite, deployed on Vercel.

**Live:** [alexrauenzahn.dev](https://alexrauenzahn.dev)

## Features

- **AI Resume Analyzer** — paste a job description and get a fit score, gap analysis, and interview talking points powered by Claude
- **AI Chat Widget** — context-aware assistant that can answer questions about experience and projects
- **Contact Form** — serverless email delivery via Resend
- **Vercel Analytics** — visitor and page view tracking
- **Dual Theme** — default dark and gold color schemes
- **Terminal Easter Egg** — hidden terminal accessible via the nav
- **OG Image** — LinkedIn/Slack link preview support
- **JSON-LD** — structured data for search engines
- **Accessibility** — WCAG AA, keyboard navigation, reduced motion support

## Tech Stack

- React 18 + Vite 7
- Framer Motion
- Vercel (hosting + serverless functions)
- Anthropic Claude API (claude-haiku)
- Resend (transactional email)
- Vercel Analytics

## Getting Started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your keys:

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/analyze` | Resume fit analysis against a job description |
| `POST /api/chat` | Chat completions with portfolio context |
| `POST /api/contact` | Contact form email delivery via Resend |

## Branch Workflow

```
feature/* → dev → staging → main (production)
```

All PRs merge into `dev`. Staging is used for pre-production review. Main triggers Vercel production deployment.

## Project Structure

```
src/
├── components/       # React components
├── context/          # ThemeContext, ModalContext
├── data/             # Project data, config flags
├── hooks/            # useTypewriter, useReducedMotion, useMousePosition
├── styles/           # CSS variables, global styles
├── App.jsx
└── main.jsx
api/
├── analyze.js        # Resume analyzer endpoint
├── chat.js           # Chat endpoint
├── contact.js        # Contact form endpoint
└── constants.js      # Shared CORS, rate limiting, prompts
public/
└── Alex_Rauenzahn_March_2026.pdf
```

## Deployment

Connected to Vercel via GitHub. Push to `main` to deploy.

Environment variables are set in the Vercel dashboard under **Settings → Environment Variables**.
