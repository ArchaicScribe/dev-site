export default function ForerunnerBackground() {
    const wrapperStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
    }

    return (
        <div style={wrapperStyle}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Deep navy base gradient */}
                    <linearGradient id="bgBase" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#050d18" stopOpacity="1" />
                        <stop offset="100%" stopColor="#060b12" stopOpacity="1" />
                    </linearGradient>

                    {/* Panel surface fills */}
                    <linearGradient id="panelFill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d2035" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#060d1a" stopOpacity="0.1" />
                    </linearGradient>

                    <linearGradient id="panelFillRight" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0a1a2e" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#060b14" stopOpacity="0.08" />
                    </linearGradient>

                    {/* Seam glow gradients */}
                    <linearGradient id="seamGlowH" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8ff0ff" stopOpacity="0" />
                        <stop offset="20%" stopColor="#8ff0ff" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#c8eeff" stopOpacity="0.8" />
                        <stop offset="80%" stopColor="#8ff0ff" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#8ff0ff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="seamGlowDL" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8ff0ff" stopOpacity="0" />
                        <stop offset="30%" stopColor="#8ff0ff" stopOpacity="0.45" />
                        <stop offset="60%" stopColor="#c8eeff" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#8ff0ff" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="seamGlowDR" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#8ff0ff" stopOpacity="0" />
                        <stop offset="30%" stopColor="#8ff0ff" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#c8eeff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#8ff0ff" stopOpacity="0" />
                    </linearGradient>

                    {/* Ambient light gradients */}
                    <radialGradient id="ambientTop" cx="42%" cy="0%" r="60%">
                        <stop offset="0%" stopColor="#1a4a6b" stopOpacity="0.2" />
                        <stop offset="60%" stopColor="#0a2040" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#050d18" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="ambientBottom" cx="58%" cy="100%" r="55%">
                        <stop offset="0%" stopColor="#0d3050" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#050d18" stopOpacity="0" />
                    </radialGradient>

                    {/* Filters */}
                    <filter id="seamBloom" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="panelAmbient" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>

                    <filter id="wideGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
                    </filter>

                    {/* Vignette */}
                    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                        <stop offset="45%" stopColor="#050d18" stopOpacity="0" />
                        <stop offset="100%" stopColor="#050d18" stopOpacity="0.92" />
                    </radialGradient>
                </defs>

                {/* 1. BASE */}
                <rect width="1440" height="900" fill="url(#bgBase)" />

                {/* 2. AMBIENT LIGHT FIELDS */}
                <rect width="1440" height="900" fill="url(#ambientTop)" />
                <rect width="1440" height="900" fill="url(#ambientBottom)" />

                {/* 3. LARGE FORERUNNER PANEL SHAPES */}
                {/* Left main panel */}
                <polygon
                    points="0,0 520,0 380,340 180,520 0,420"
                    fill="url(#panelFill)"
                    opacity="0.5"
                />
                {/* Left lower panel */}
                <polygon
                    points="0,480 220,560 340,900 0,900"
                    fill="url(#panelFill)"
                    opacity="0.3"
                />
                {/* Right main panel */}
                <polygon
                    points="1440,0 980,0 1080,280 1320,460 1440,360"
                    fill="url(#panelFillRight)"
                    opacity="0.45"
                />
                {/* Right lower panel */}
                <polygon
                    points="1440,420 1260,540 1100,900 1440,900"
                    fill="url(#panelFillRight)"
                    opacity="0.25"
                />
                {/* Center upper panel */}
                <polygon
                    points="580,0 860,0 780,180 660,180"
                    fill="url(#panelFill)"
                    opacity="0.2"
                />

                {/* 4. PANEL SEAM LINES WITH GLOW */}
                {/* Left panel top edge seam */}
                <line x1="0" y1="0" x2="520" y2="0"
                    stroke="url(#seamGlowH)" strokeWidth="3" opacity="0.3" />
                <line x1="0" y1="0" x2="520" y2="0"
                    stroke="#c8eeff" strokeWidth="0.75" opacity="0.5" />

                {/* Left panel right edge seam (diagonal) */}
                <line x1="520" y1="0" x2="380" y2="340"
                    stroke="url(#seamGlowDL)" strokeWidth="4" opacity="0.35"
                    filter="url(#seamBloom)" />
                <line x1="520" y1="0" x2="380" y2="340"
                    stroke="#c8eeff" strokeWidth="1" opacity="0.55" />

                {/* Left panel lower edge seam */}
                <line x1="380" y1="340" x2="180" y2="520"
                    stroke="url(#seamGlowDL)" strokeWidth="3" opacity="0.25"
                    filter="url(#seamBloom)" />
                <line x1="380" y1="340" x2="180" y2="520"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.4" />

                {/* Left lower panel top edge */}
                <line x1="0" y1="480" x2="220" y2="560"
                    stroke="url(#seamGlowH)" strokeWidth="3" opacity="0.2"
                    filter="url(#seamBloom)" />
                <line x1="0" y1="480" x2="220" y2="560"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.35" />
                <line x1="220" y1="560" x2="340" y2="900"
                    stroke="#8ff0ff" strokeWidth="0.5" opacity="0.2" />

                {/* Right panel left edge seam (diagonal) */}
                <line x1="980" y1="0" x2="1080" y2="280"
                    stroke="url(#seamGlowDR)" strokeWidth="4" opacity="0.3"
                    filter="url(#seamBloom)" />
                <line x1="980" y1="0" x2="1080" y2="280"
                    stroke="#c8eeff" strokeWidth="1" opacity="0.5" />

                {/* Right panel lower edge */}
                <line x1="1080" y1="280" x2="1320" y2="460"
                    stroke="url(#seamGlowDR)" strokeWidth="3" opacity="0.25"
                    filter="url(#seamBloom)" />
                <line x1="1080" y1="280" x2="1320" y2="460"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.4" />

                {/* Right lower panel top edge */}
                <line x1="1440" y1="420" x2="1260" y2="540"
                    stroke="url(#seamGlowDR)" strokeWidth="3" opacity="0.2"
                    filter="url(#seamBloom)" />
                <line x1="1440" y1="420" x2="1260" y2="540"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.3" />
                <line x1="1260" y1="540" x2="1100" y2="900"
                    stroke="#8ff0ff" strokeWidth="0.5" opacity="0.18" />

                {/* Center upper panel edges */}
                <line x1="580" y1="0" x2="660" y2="180"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.25" />
                <line x1="860" y1="0" x2="780" y2="180"
                    stroke="#8ff0ff" strokeWidth="0.75" opacity="0.25" />
                <line x1="660" y1="180" x2="780" y2="180"
                    stroke="url(#seamGlowH)" strokeWidth="2" opacity="0.3"
                    filter="url(#seamBloom)" />
                <line x1="660" y1="180" x2="780" y2="180"
                    stroke="#c8eeff" strokeWidth="0.75" opacity="0.5" />

                {/* 5. FORERUNNER DETAIL LINES */}
                {/* Left panel interior detail */}
                <line x1="80" y1="60" x2="400" y2="60"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.12" />
                <line x1="60" y1="120" x2="360" y2="120"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.1" />
                <line x1="440" y1="80" x2="370" y2="260"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.1" />

                {/* Right panel interior detail */}
                <line x1="1020" y1="40" x2="1360" y2="40"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.1" />
                <line x1="1040" y1="100" x2="1380" y2="100"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.08" />
                <line x1="1000" y1="60" x2="1060" y2="220"
                    stroke="#8ff0ff" strokeWidth="0.4" opacity="0.1" />

                {/* 6. PANEL CORNER NODES */}
                {/* At (520, 0) — left panel top corner */}
                <rect x="516" y="-4" width="8" height="8"
                    fill="#c8eeff" opacity="0.6"
                    transform="rotate(45 520 0)"
                    filter="url(#seamBloom)" />

                {/* At (380, 340) — left panel inner corner */}
                <rect x="376" y="336" width="8" height="8"
                    fill="#8ff0ff" opacity="0.5"
                    transform="rotate(45 380 340)"
                    filter="url(#seamBloom)" />

                {/* At (180, 520) — left panel lower corner */}
                <rect x="176" y="516" width="7" height="7"
                    fill="#8ff0ff" opacity="0.4"
                    transform="rotate(45 180 520)"
                    filter="url(#seamBloom)" />

                {/* At (980, 0) — right panel top corner */}
                <rect x="976" y="-4" width="8" height="8"
                    fill="#c8eeff" opacity="0.55"
                    transform="rotate(45 980 0)"
                    filter="url(#seamBloom)" />

                {/* At (1080, 280) — right panel inner corner */}
                <rect x="1076" y="276" width="8" height="8"
                    fill="#8ff0ff" opacity="0.5"
                    transform="rotate(45 1080 280)"
                    filter="url(#seamBloom)" />

                {/* At (660, 180) — center panel left corner */}
                <rect x="656" y="176" width="6" height="6"
                    fill="#8ff0ff" opacity="0.45"
                    transform="rotate(45 660 180)"
                    filter="url(#seamBloom)" />

                {/* At (780, 180) — center panel right corner */}
                <rect x="776" y="176" width="6" height="6"
                    fill="#8ff0ff" opacity="0.45"
                    transform="rotate(45 780 180)"
                    filter="url(#seamBloom)" />

                {/* 7. WIDE AMBIENT SEAM GLOW */}
                {/* Left main seam ambient */}
                <line x1="520" y1="0" x2="180" y2="520"
                    stroke="#8ff0ff" strokeWidth="40" opacity="0.025"
                    filter="url(#wideGlow)" />

                {/* Right main seam ambient */}
                <line x1="980" y1="0" x2="1320" y2="460"
                    stroke="#8ff0ff" strokeWidth="40" opacity="0.02"
                    filter="url(#wideGlow)" />

                {/* 8. VIGNETTE */}
                <rect width="1440" height="900" fill="url(#vignette)" />
            </svg>
        </div>
    )
}
