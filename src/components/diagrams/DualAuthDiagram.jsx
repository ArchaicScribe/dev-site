import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const C = {
  bgElevated: '#132234',
  bgCard: '#0f1e2e',
  borderSubtle: 'rgba(143, 240, 255, 0.15)',
  borderActive: 'rgba(143, 240, 255, 0.35)',
  accentPrimary: '#8ff0ff',
  accentSecondary: '#b8f5ff',
  textPrimary: '#eef4f8',
  textMuted: '#6a8a9a',
  accentGold: '#c8a96e',
}

function DiagramNode({ x, y, width, height, label, sublabel, subtext, glow = false, endNode = false, isVisible, delay = 0 }) {
  const centerX = x + width / 2
  const centerY = y + height / 2

  const stroke = glow ? C.accentPrimary : endNode ? C.accentSecondary : C.borderActive
  const strokeWidth = glow ? 1.5 : 1

  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={0}
        ry={0}
        fill={C.bgElevated}
        stroke={stroke}
        strokeWidth={strokeWidth}
        filter={glow ? 'url(#nodeGlow)' : undefined}
      />
      <text
        x={centerX}
        y={centerY - (sublabel ? 8 : 0)}
        fontFamily="'Share Tech Mono', monospace"
        fontSize={11}
        fill={C.textPrimary}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={centerX}
          y={centerY + 10}
          fontFamily="'Share Tech Mono', monospace"
          fontSize={9}
          fill={C.textMuted}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {sublabel}
        </text>
      )}
      {subtext && (
        <text
          x={centerX}
          y={centerY + 22}
          fontFamily="'Share Tech Mono', monospace"
          fontSize={8}
          fill={C.textMuted}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {subtext}
        </text>
      )}
    </motion.g>
  )
}

function DiagramPath({ d, animated = true, delay = 0, isVisible }) {
  const pathRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [d])

  const shouldAnimate = animated && !prefersReducedMotion && pathLength > 0

  return (
    <motion.path
      ref={pathRef}
      d={d}
      stroke={C.accentPrimary}
      strokeWidth={1}
      fill="none"
      opacity={0.6}
      markerEnd="url(#chevron)"
      strokeDasharray={shouldAnimate ? pathLength : undefined}
      initial={shouldAnimate ? { strokeDashoffset: pathLength } : {}}
      animate={isVisible && shouldAnimate ? { strokeDashoffset: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeInOut' }}
    />
  )
}

function JunctionMarker({ cx, cy, delay = 0, isVisible }) {
  return (
    <motion.rect
      x={cx - 3}
      y={cy - 3}
      width={6}
      height={6}
      fill={C.accentPrimary}
      rx={0}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ delay, duration: 0.2 }}
    />
  )
}

export default function DualAuthDiagram() {
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: '-100px' })

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 520"
      width="100%"
      height="auto"
      style={{ display: 'block' }}
    >
      <defs>
        <marker
          id="chevron"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 8 5 L 0 10"
            fill="none"
            stroke={C.accentPrimary}
            strokeWidth="1.5"
          />
        </marker>
        <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* PATHS */}
      <g>
        {/* Path 1 — Node1 to Node2 */}
        <DiagramPath d="M 300 64 L 300 100" delay={0} isVisible={isVisible} />
        
        {/* Path 2 — Node2 to junction */}
        <DiagramPath d="M 300 150 L 300 178" delay={0.15} isVisible={isVisible} />
        
        {/* Path 3 — Junction left to Node3A */}
        <DiagramPath d="M 300 178 L 150 178 L 150 210" delay={0.3} isVisible={isVisible} />
        
        {/* Path 4 — Junction right to Node3B */}
        <DiagramPath d="M 300 178 L 450 178 L 450 210" delay={0.3} isVisible={isVisible} />
        
        {/* Path 5 — Node3A to merge */}
        <DiagramPath d="M 150 270 L 150 320 L 300 320" delay={0.55} isVisible={isVisible} />
        
        {/* Path 6 — Node3B to merge */}
        <DiagramPath d="M 450 270 L 450 320 L 300 320" delay={0.55} isVisible={isVisible} />
        
        {/* Path 7 — Merge to Node4 */}
        <DiagramPath d="M 300 320 L 300 350" delay={0.7} isVisible={isVisible} />
        
        {/* Path 8 — Node4 to Node5 */}
        <DiagramPath d="M 300 400 L 300 430" delay={0.85} isVisible={isVisible} />
      </g>

      {/* JUNCTION MARKERS */}
      <JunctionMarker cx={300} cy={178} delay={0.28} isVisible={isVisible} />
      <JunctionMarker cx={300} cy={320} delay={0.53} isVisible={isVisible} />

      {/* NODES */}
      <g>
        {/* NODE 1: CLIENT REQUEST */}
        <DiagramNode
          x={200}
          y={20}
          width={200}
          height={44}
          label="CLIENT REQUEST"
          sublabel="HTTP / HTTPS"
          isVisible={isVisible}
          delay={0}
        />

        {/* NODE 2: SPRING SECURITY (KEY DECISION) */}
        <DiagramNode
          x={150}
          y={100}
          width={300}
          height={50}
          label="SPRING SECURITY"
          sublabel="FILTER CHAIN ENTRY POINT"
          glow={true}
          isVisible={isVisible}
          delay={0.1}
        />

        {/* NODE 3A: OAUTH2/JWT (left) */}
        <DiagramNode
          x={60}
          y={210}
          width={180}
          height={60}
          label="OAUTH2 / JWT"
          sublabel="TOKEN VALIDATION"
          subtext="Bearer · Expiry · Claims"
          isVisible={isVisible}
          delay={0.35}
        />

        {/* NODE 3B: LDAP/LDAPS (right) */}
        <DiagramNode
          x={360}
          y={210}
          width={180}
          height={60}
          label="LDAP / LDAPS"
          sublabel="DIRECTORY AUTH"
          subtext="Bind · Search · Verify"
          isVisible={isVisible}
          delay={0.35}
        />

        {/* NODE 4: SHARED AUTHORIZATION */}
        <DiagramNode
          x={150}
          y={350}
          width={300}
          height={50}
          label="SHARED AUTHORIZATION"
          sublabel="ROLE · SCOPE · PERMISSION CHECKS"
          isVisible={isVisible}
          delay={0.75}
        />

        {/* NODE 5: PROTECTED RESOURCE */}
        <DiagramNode
          x={175}
          y={430}
          width={250}
          height={44}
          label="PROTECTED RESOURCE"
          sublabel="API RESPONSE"
          endNode={true}
          isVisible={isVisible}
          delay={0.95}
        />
      </g>

      {/* LEGEND */}
      <g transform="translate(300, 498)">
        {/* KEY DECISION */}
        <g transform="translate(-140, 0)">
          <rect x={-8} y={-4} width={8} height={8} fill={C.accentPrimary} />
          <text
            x={6}
            y={0}
            fill={C.textMuted}
            fontSize={9}
            fontFamily="'Share Tech Mono', monospace"
            dominantBaseline="middle"
          >
            KEY DECISION
          </text>
        </g>

        {/* DATA FLOW */}
        <g transform="translate(-20, 0)">
          <line
            x1={-14}
            y1={0}
            x2={0}
            y2={0}
            stroke={C.accentPrimary}
            strokeWidth={1}
            opacity={0.6}
          />
          <text
            x={6}
            y={0}
            fill={C.textMuted}
            fontSize={9}
            fontFamily="'Share Tech Mono', monospace"
            dominantBaseline="middle"
          >
            DATA FLOW
          </text>
        </g>

        {/* JUNCTION */}
        <g transform="translate(90, 0)">
          <rect x={-6} y={-3} width={6} height={6} fill={C.accentPrimary} />
          <text
            x={6}
            y={0}
            fill={C.textMuted}
            fontSize={9}
            fontFamily="'Share Tech Mono', monospace"
            dominantBaseline="middle"
          >
            JUNCTION
          </text>
        </g>
      </g>
    </svg>
  )
}
