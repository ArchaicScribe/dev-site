#!/bin/bash
cd ~/portfolio-site

# CSS Variables
cat > src/styles/variables.css << 'EOF'
:root {
  --bg-primary: #050a0e;
  --bg-secondary: #0a1628;
  --bg-card: #0d1f2d;
  --accent-green: #00ff9f;
  --accent-cyan: #00d4ff;
  --accent-purple: #7b2fff;
  --text-primary: #e2e8f0;
  --text-muted: #4a6741;
  --text-dim: #64748b;
  --border-glow: rgba(0, 255, 159, 0.15);
  --shadow-glow: 0 0 20px rgba(0, 255, 159, 0.3);
  --shadow-glow-sm: 0 0 10px rgba(0, 255, 159, 0.2);
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'IBM Plex Mono', monospace;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  --spacing-2xl: 8rem;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
  --z-base: 1;
  --z-fixed: 300;
}
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-fast: 0ms;
    --transition-base: 0ms;
    --transition-slow: 0ms;
  }
}
EOF

# Global CSS
cat > src/styles/global.css << 'EOF'
@import './variables.css';
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
.grid-background {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: -1;
  background-image: 
    linear-gradient(rgba(0, 255, 159, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 159, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
.mouse-gradient {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.4;
}
h1, h2, h3 {
  font-family: var(--font-mono);
  font-weight: 600;
  line-height: 1.2;
}
h1 { font-size: clamp(2.5rem, 8vw, 5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); color: var(--text-muted); margin-bottom: var(--spacing-lg); }
a {
  color: var(--accent-cyan);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover { color: var(--accent-green); text-shadow: 0 0 10px var(--accent-green); }
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}
button { font-family: var(--font-mono); cursor: pointer; border: none; background: none; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.btn-primary {
  background-color: var(--accent-green);
  color: var(--bg-primary);
  border: 2px solid var(--accent-green);
}
.btn-primary:hover {
  background-color: transparent;
  color: var(--accent-green);
  box-shadow: var(--shadow-glow);
}
.btn-ghost {
  background-color: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-glow);
}
.btn-ghost:hover {
  border-color: var(--accent-green);
  color: var(--accent-green);
}
section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--accent-green);
  font-family: var(--font-mono);
}
.loading-spinner::after { content: '▊'; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--accent-green);
  color: var(--bg-primary);
  font-family: var(--font-mono);
  z-index: 500;
  border-radius: var(--radius-sm);
}
.skip-link:focus { top: var(--spacing-md); }
::selection { background-color: var(--accent-green); color: var(--bg-primary); }
EOF

echo "Setup script created successfully - CSS done"
