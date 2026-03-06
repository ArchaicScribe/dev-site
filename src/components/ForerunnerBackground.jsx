import { useMemo } from 'react'

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateStars(count, seed) {
  const stars = []
  for (let i = 0; i < count; i++) {
    const s = seed + i * 137.508
    stars.push({
      x: seededRandom(s) * 1440,
      y: seededRandom(s + 1) * 900,
      size: 1 + seededRandom(s + 2) * 2,
      opacity: 0.3 + seededRandom(s + 3) * 0.5,
      isTeal: seededRandom(s + 4) > 0.7,
    })
  }
  return stars
}

export function ForerunnerBackground({ theme = 'default' }) {
  const isGold = theme === 'gold'
  const stars = useMemo(() => generateStars(80, 42), [])

  const traceColor1 = isGold ? '#c9a84c' : '#d4743a'
  const traceColor2 = isGold ? '#b89840' : '#c8622a'
  const traceColor3 = isGold ? '#d4b050' : '#e08040'
  const tealColor = isGold ? '#7eb8c9' : '#8ff0ff'
  const tealColorLight = isGold ? '#a0d0e0' : '#c8eeff'
  const monoColor1 = isGold ? '#0a0804' : '#04060e'
  const monoColor2 = isGold ? '#0d0b06' : '#070a14'
  const monoColor3 = isGold ? '#080604' : '#050810'
  const panelLine = isGold ? 'rgba(201, 168, 76, 0.06)' : 'rgba(143, 240, 255, 0.06)'
  const panelLineDim = isGold ? 'rgba(201, 168, 76, 0.04)' : 'rgba(143, 240, 255, 0.04)'
  const panelLineFaint = isGold ? 'rgba(201, 168, 76, 0.05)' : 'rgba(143, 240, 255, 0.05)'

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <svg key={theme} width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bgAtmos" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isGold ? '#0a0804' : '#060810'} stopOpacity="1" />
            <stop offset="40%" stopColor={isGold ? '#0c0906' : '#080c18'} stopOpacity="1" />
            <stop offset="100%" stopColor={isGold ? '#080604' : '#050810'} stopOpacity="1" />
          </linearGradient>
          <radialGradient id="hazeLeft" cx="15%" cy="30%" r="45%">
            <stop offset="0%" stopColor={isGold ? '#201808' : '#1a0f2e'} stopOpacity="0.5" />
            <stop offset="50%" stopColor={isGold ? '#120e06' : '#0d0818'} stopOpacity="0.2" />
            <stop offset="100%" stopColor={isGold ? '#0a0804' : '#060810'} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hazeRight" cx="85%" cy="15%" r="35%">
            <stop offset="0%" stopColor={isGold ? '#1a1408' : '#12082a'} stopOpacity="0.4" />
            <stop offset="60%" stopColor={isGold ? '#100c06' : '#0a0618'} stopOpacity="0.15" />
            <stop offset="100%" stopColor={isGold ? '#0a0804' : '#060810'} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="conduitGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={tealColor} stopOpacity="0" />
            <stop offset="20%" stopColor={tealColor} stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="75%" stopColor={tealColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={tealColor} stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="conduitDim" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={tealColor} stopOpacity="0" />
            <stop offset="30%" stopColor={tealColor} stopOpacity="0.2" />
            <stop offset="60%" stopColor={tealColorLight} stopOpacity="0.35" />
            <stop offset="100%" stopColor={tealColor} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orangeTrace" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={traceColor2} stopOpacity="0" />
            <stop offset="30%" stopColor={traceColor1} stopOpacity="0.5" />
            <stop offset="60%" stopColor={traceColor3} stopOpacity="0.7" />
            <stop offset="100%" stopColor={traceColor2} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orangeTrace2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={traceColor2} stopOpacity="0" />
            <stop offset="25%" stopColor={traceColor1} stopOpacity="0.4" />
            <stop offset="55%" stopColor={traceColor3} stopOpacity="0.6" />
            <stop offset="100%" stopColor={traceColor2} stopOpacity="0" />
          </linearGradient>
          <filter id="nodeBloom" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="conduitBloom" x="-30%" y="-5%" width="160%" height="110%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="atmosBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
          <filter id="orangeBloom" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="40%" stopColor={isGold ? '#05060a' : '#060810'} stopOpacity="0" />
            <stop offset="100%" stopColor={isGold ? '#05060a' : '#060810'} stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#bgAtmos)" />
        <rect width="1440" height="900" fill="url(#hazeLeft)" />
        <rect width="1440" height="900" fill="url(#hazeRight)" />
        {isGold && stars.map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.size / 2} fill={star.isTeal ? tealColor : '#ffffff'} opacity={star.opacity * 0.6} />
        ))}
        <ellipse cx="720" cy="920" rx="800" ry="180" fill={isGold ? '#0a1820' : '#0a2040'} opacity="0.12" filter="url(#atmosBloom)" />
        <polygon points="0,900 0,200 120,180 180,100 220,80 260,120 280,900" fill={monoColor1} opacity="0.7" />
        <polygon points="140,900 140,240 180,100 220,80 250,130 260,900" fill={monoColor2} opacity="0.5" />
        <polygon points="1440,900 1440,240 1320,200 1260,90 1200,70 1160,110 1140,900" fill={monoColor1} opacity="0.65" />
        <polygon points="1300,900 1300,260 1260,90 1200,70 1175,120 1160,900" fill={monoColor2} opacity="0.45" />
        <polygon points="580,900 580,400 620,320 720,280 820,320 860,400 860,900" fill={monoColor3} opacity="0.6" />
        <line x1="120" y1="180" x2="140" y2="900" stroke={panelLine} strokeWidth="1" />
        <line x1="180" y1="100" x2="200" y2="900" stroke={panelLineDim} strokeWidth="0.75" />
        <line x1="260" y1="120" x2="270" y2="900" stroke={panelLineFaint} strokeWidth="0.75" />
        <line x1="1320" y1="200" x2="1300" y2="900" stroke={panelLine} strokeWidth="1" />
        <line x1="1260" y1="90" x2="1240" y2="900" stroke={panelLineDim} strokeWidth="0.75" />
        <line x1="1160" y1="110" x2="1170" y2="900" stroke={panelLineFaint} strokeWidth="0.75" />
        <line x1="620" y1="320" x2="620" y2="900" stroke={panelLineDim} strokeWidth="0.5" />
        <line x1="820" y1="320" x2="820" y2="900" stroke={panelLineDim} strokeWidth="0.5" />
        <line x1="195" y1="900" x2="195" y2="60" stroke="url(#conduitGlow)" strokeWidth="6" filter="url(#conduitBloom)" opacity="0.5" />
        <line x1="195" y1="900" x2="195" y2="60" stroke="url(#conduitGlow)" strokeWidth="1.5" opacity="0.8" />
        <line x1="148" y1="900" x2="148" y2="160" stroke="url(#conduitDim)" strokeWidth="4" filter="url(#conduitBloom)" opacity="0.35" />
        <line x1="148" y1="900" x2="148" y2="160" stroke="url(#conduitDim)" strokeWidth="1" opacity="0.5" />
        <line x1="255" y1="900" x2="255" y2="100" stroke="url(#conduitDim)" strokeWidth="3" filter="url(#conduitBloom)" opacity="0.2" />
        <line x1="255" y1="900" x2="255" y2="100" stroke={tealColor} strokeWidth="0.75" opacity="0.3" />
        <line x1="1245" y1="900" x2="1245" y2="70" stroke="url(#conduitGlow)" strokeWidth="6" filter="url(#conduitBloom)" opacity="0.45" />
        <line x1="1245" y1="900" x2="1245" y2="70" stroke="url(#conduitGlow)" strokeWidth="1.5" opacity="0.75" />
        <line x1="1295" y1="900" x2="1295" y2="180" stroke="url(#conduitDim)" strokeWidth="4" filter="url(#conduitBloom)" opacity="0.3" />
        <line x1="1295" y1="900" x2="1295" y2="180" stroke="url(#conduitDim)" strokeWidth="1" opacity="0.45" />
        <line x1="720" y1="900" x2="720" y2="260" stroke="url(#conduitGlow)" strokeWidth="8" filter="url(#conduitBloom)" opacity="0.35" />
        <line x1="720" y1="900" x2="720" y2="260" stroke="url(#conduitGlow)" strokeWidth="2" opacity="0.55" />
        <line x1="680" y1="900" x2="680" y2="340" stroke="url(#conduitDim)" strokeWidth="3" filter="url(#conduitBloom)" opacity="0.2" />
        <line x1="680" y1="900" x2="680" y2="340" stroke={tealColor} strokeWidth="0.75" opacity="0.3" />
        <line x1="760" y1="900" x2="760" y2="340" stroke="url(#conduitDim)" strokeWidth="3" filter="url(#conduitBloom)" opacity="0.2" />
        <line x1="760" y1="900" x2="760" y2="340" stroke={tealColor} strokeWidth="0.75" opacity="0.3" />
        <ellipse cx="195" cy="200" rx="4" ry="4" fill={tealColorLight} opacity="0.8" filter="url(#nodeBloom)" />
        <ellipse cx="195" cy="200" rx="1.5" ry="1.5" fill="#ffffff" opacity="0.9" />
        <ellipse cx="195" cy="420" rx="3" ry="3" fill={tealColor} opacity="0.6" filter="url(#nodeBloom)" />
        <ellipse cx="195" cy="420" rx="1" ry="1" fill={tealColorLight} opacity="0.8" />
        <ellipse cx="148" cy="300" rx="3" ry="3" fill={tealColor} opacity="0.5" filter="url(#nodeBloom)" />
        <ellipse cx="1245" cy="180" rx="4" ry="4" fill={tealColorLight} opacity="0.75" filter="url(#nodeBloom)" />
        <ellipse cx="1245" cy="180" rx="1.5" ry="1.5" fill="#ffffff" opacity="0.9" />
        <ellipse cx="1245" cy="400" rx="3" ry="3" fill={tealColor} opacity="0.55" filter="url(#nodeBloom)" />
        <ellipse cx="1245" cy="400" rx="1" ry="1" fill={tealColorLight} opacity="0.8" />
        <ellipse cx="1295" cy="280" rx="3" ry="3" fill={tealColor} opacity="0.45" filter="url(#nodeBloom)" />
        <ellipse cx="720" cy="290" rx="5" ry="5" fill={tealColorLight} opacity="0.6" filter="url(#nodeBloom)" />
        <ellipse cx="720" cy="290" rx="2" ry="2" fill="#ffffff" opacity="0.85" />
        <ellipse cx="720" cy="480" rx="3" ry="3" fill={tealColor} opacity="0.4" filter="url(#nodeBloom)" />
        <line x1="60" y1="320" x2="140" y2="295" stroke="url(#orangeTrace)" strokeWidth="1" opacity="0.4" filter="url(#orangeBloom)" />
        <line x1="90" y1="380" x2="130" y2="360" stroke="url(#orangeTrace)" strokeWidth="0.75" opacity="0.3" />
        <line x1="30" y1="450" x2="110" y2="430" stroke="url(#orangeTrace)" strokeWidth="0.75" opacity="0.25" />
        <line x1="80" y1="520" x2="160" y2="505" stroke="url(#orangeTrace)" strokeWidth="0.5" opacity="0.2" />
        <line x1="50" y1="600" x2="115" y2="580" stroke="url(#orangeTrace)" strokeWidth="0.5" opacity="0.18" />
        <line x1="1380" y1="290" x2="1300" y2="270" stroke="url(#orangeTrace2)" strokeWidth="1" opacity="0.35" filter="url(#orangeBloom)" />
        <line x1="1360" y1="360" x2="1290" y2="345" stroke="url(#orangeTrace2)" strokeWidth="0.75" opacity="0.28" />
        <line x1="1410" y1="440" x2="1330" y2="420" stroke="url(#orangeTrace2)" strokeWidth="0.75" opacity="0.22" />
        <line x1="1370" y1="510" x2="1300" y2="495" stroke="url(#orangeTrace2)" strokeWidth="0.5" opacity="0.18" />
        <line x1="1390" y1="580" x2="1320" y2="565" stroke="url(#orangeTrace2)" strokeWidth="0.5" opacity="0.15" />
        <line x1="380" y1="180" x2="440" y2="165" stroke="url(#orangeTrace)" strokeWidth="0.5" opacity="0.15" />
        <line x1="920" y1="200" x2="980" y2="185" stroke="url(#orangeTrace2)" strokeWidth="0.5" opacity="0.12" />
        <line x1="520" y1="280" x2="560" y2="268" stroke="url(#orangeTrace)" strokeWidth="0.5" opacity="0.12" />
        <line x1="880" y1="260" x2="930" y2="248" stroke="url(#orangeTrace2)" strokeWidth="0.5" opacity="0.1" />
        <ellipse cx="720" cy="450" rx="18" ry="18" fill="none" stroke={tealColor} strokeWidth="1" opacity="0.2" filter="url(#nodeBloom)" />
        <ellipse cx="720" cy="450" rx="10" ry="10" fill="none" stroke={tealColorLight} strokeWidth="0.75" opacity="0.3" />
        <ellipse cx="720" cy="450" rx="3" ry="3" fill={tealColor} opacity="0.4" filter="url(#nodeBloom)" />
        <ellipse cx="195" cy="350" rx="12" ry="12" fill="none" stroke={tealColor} strokeWidth="0.75" opacity="0.18" filter="url(#nodeBloom)" />
        <ellipse cx="195" cy="350" rx="2.5" ry="2.5" fill={tealColor} opacity="0.35" />
        <ellipse cx="1245" cy="340" rx="12" ry="12" fill="none" stroke={tealColor} strokeWidth="0.75" opacity="0.16" filter="url(#nodeBloom)" />
        <ellipse cx="1245" cy="340" rx="2.5" ry="2.5" fill={tealColor} opacity="0.3" />
        <path d="M 680 900 L 715 700 L 720 500" stroke={tealColor} strokeWidth="3" fill="none" opacity="0.12" filter="url(#conduitBloom)" />
        <path d="M 700 900 L 718 700 L 720 500" stroke={tealColorLight} strokeWidth="1" fill="none" opacity="0.18" />
        <path d="M 600 920 L 700 800 L 720 600" stroke="#4a9eb5" strokeWidth="40" fill="none" opacity="0.04" filter="url(#atmosBloom)" />
        <rect width="1440" height="900" fill="url(#vignette)" />
      </svg>
    </div>
  )
}

export default ForerunnerBackground
