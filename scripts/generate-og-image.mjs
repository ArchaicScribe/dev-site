import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = join(__dirname, '../public/og-image.png')

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#0f2744" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#070d14" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#070d14"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Corner brackets -->
  <path d="M60,60 L60,110 M60,60 L110,60" stroke="#1e3a5f" stroke-width="2" fill="none"/>
  <path d="M1140,60 L1140,110 M1140,60 L1090,60" stroke="#1e3a5f" stroke-width="2" fill="none"/>
  <path d="M60,570 L60,520 M60,570 L110,570" stroke="#1e3a5f" stroke-width="2" fill="none"/>
  <path d="M1140,570 L1140,520 M1140,570 L1090,570" stroke="#1e3a5f" stroke-width="2" fill="none"/>

  <!-- Left accent bar -->
  <rect x="60" y="155" width="3" height="70" fill="#8ff0ff"/>

  <!-- Availability badge -->
  <circle cx="77" cy="175" r="5" fill="#4ade80"/>
  <text x="92" y="180" font-family="Courier New, monospace" font-size="13" fill="#4ade80" letter-spacing="3">AVAILABLE · TARGETING SEATTLE · BOSTON · REMOTE</text>

  <!-- Name -->
  <text x="63" y="295" font-family="Arial Black, Arial, sans-serif" font-size="76" font-weight="900" fill="#daeaf5" letter-spacing="2">ALEX RAUENZAHN</text>

  <!-- Title -->
  <text x="66" y="344" font-family="Courier New, monospace" font-size="22" fill="#8ff0ff" letter-spacing="6">SENIOR SOFTWARE ENGINEER</text>

  <!-- Separator -->
  <line x1="63" y1="372" x2="700" y2="372" stroke="#1e3a5f" stroke-width="1"/>

  <!-- Tech stack -->
  <text x="66" y="408" font-family="Courier New, monospace" font-size="17" fill="#3a6a8a" letter-spacing="1">Java  ·  Spring Boot  ·  C#/.NET  ·  Kubernetes  ·  REST APIs  ·  OAuth2</text>

  <!-- Decorative dot grid (right side) -->
  <circle cx="860" cy="270" r="2" fill="#1e3a5f"/>
  <circle cx="900" cy="270" r="2" fill="#1e3a5f"/>
  <circle cx="940" cy="270" r="2" fill="#8ff0ff" opacity="0.25"/>
  <circle cx="980" cy="270" r="2" fill="#1e3a5f"/>
  <circle cx="1020" cy="270" r="2" fill="#1e3a5f"/>
  <circle cx="1060" cy="270" r="2" fill="#8ff0ff" opacity="0.15"/>
  <circle cx="860" cy="310" r="2" fill="#1e3a5f"/>
  <circle cx="900" cy="310" r="2" fill="#8ff0ff" opacity="0.2"/>
  <circle cx="940" cy="310" r="2" fill="#1e3a5f"/>
  <circle cx="980" cy="310" r="2" fill="#1e3a5f"/>
  <circle cx="1020" cy="310" r="2" fill="#8ff0ff" opacity="0.25"/>
  <circle cx="1060" cy="310" r="2" fill="#1e3a5f"/>
  <circle cx="860" cy="350" r="2" fill="#8ff0ff" opacity="0.15"/>
  <circle cx="900" cy="350" r="2" fill="#1e3a5f"/>
  <circle cx="940" cy="350" r="2" fill="#1e3a5f"/>
  <circle cx="980" cy="350" r="2" fill="#8ff0ff" opacity="0.2"/>
  <circle cx="1020" cy="350" r="2" fill="#1e3a5f"/>
  <circle cx="1060" cy="350" r="2" fill="#1e3a5f"/>

  <!-- URL -->
  <text x="1137" y="570" font-family="Courier New, monospace" font-size="15" fill="#2a4a6a" letter-spacing="2" text-anchor="end">alexrauenzahn.dev</text>
</svg>`

await sharp(Buffer.from(svg))
    .png()
    .toFile(outPath)

console.log('OG image generated:', outPath)
