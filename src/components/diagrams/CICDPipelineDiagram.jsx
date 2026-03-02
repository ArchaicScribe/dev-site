import { useState } from 'react'
import { C, DiagramArrowDefs } from './diagramConstants'

export default function CICDPipelineDiagram() {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <div>
            <svg
                viewBox="0 0 960 420"
                width="100%"
                style={{ display: 'block', minWidth: '700px' }}
            >
                <DiagramArrowDefs />

                {/* Background */}
                <rect width="960" height="420" fill={C.bg} rx="0" />

                {/* Section Label */}
                <text
                    x={16}
                    y={20}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    letterSpacing={2}
                >
                    FIG.1 · AZURE DEVOPS CI/CD · GREENFIELD PIPELINE ARCHITECTURE
                </text>

                {/* BEFORE STATE (Col A) */}
                <g>
                    {/* Manual deploy node */}
                    <rect
                        x={20}
                        y={170}
                        width={120}
                        height={80}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.danger}
                        strokeWidth={1.5}
                    />
                    {/* Top accent bar */}
                    <rect x={20} y={170} width={120} height={3} fill={C.danger} />
                    <text
                        x={80}
                        y={200}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        Manual
                    </text>
                    <text
                        x={80}
                        y={216}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        Deploy
                    </text>
                    <text
                        x={80}
                        y={234}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        No pipelines
                    </text>

                    {/* BEFORE badge */}
                    <rect
                        x={30}
                        y={256}
                        width={100}
                        height={16}
                        fill={C.dangerFaint}
                        stroke={C.dangerDim}
                        strokeWidth={0.75}
                    />
                    <text
                        x={80}
                        y={268}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={8}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        BEFORE
                    </text>
                </g>

                {/* Divider after BEFORE state */}
                <line
                    x1={155}
                    y1={40}
                    x2={155}
                    y2={390}
                    stroke="rgba(143, 240, 255, 0.12)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                />

                {/* Arrows from manual deploy to both tracks */}
                <path
                    d="M 140 210 L 175 210 L 175 130 L 195 130"
                    stroke={C.dangerDim}
                    strokeWidth={1}
                    fill="none"
                    markerEnd="url(#arrowCyan)"
                />
                <path
                    d="M 140 210 L 175 210 L 175 280 L 195 280"
                    stroke={C.dangerDim}
                    strokeWidth={1}
                    fill="none"
                    markerEnd="url(#arrowGold)"
                />

                {/* Track Labels */}
                <text
                    x={390}
                    y={52}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.accent}
                    textAnchor="middle"
                    letterSpacing={1}
                >
                    TRACK A · E-COMMERCE STOREFRONT · .NET/C#
                </text>
                <text
                    x={390}
                    y={400}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.gold}
                    textAnchor="middle"
                    letterSpacing={1}
                >
                    TRACK B · INVENTORY MANAGEMENT · .NET/C#
                </text>

                {/* SOURCE CONTROL NODES (Col B) */}
                <g>
                    {/* Top track */}
                    <rect
                        x={170}
                        y={100}
                        width={100}
                        height={60}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.accent}
                        strokeWidth={1}
                    />
                    <text
                        x={220}
                        y={126}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        Source
                    </text>
                    <text
                        x={220}
                        y={142}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Git · PR Gates
                    </text>

                    {/* Bottom track */}
                    <rect
                        x={170}
                        y={250}
                        width={100}
                        height={60}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.gold}
                        strokeWidth={1}
                    />
                    <text
                        x={220}
                        y={276}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        Source
                    </text>
                    <text
                        x={220}
                        y={292}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Git · PR Gates
                    </text>
                </g>

                {/* DEV ENVIRONMENT NODES (Col C) */}
                <g>
                    {/* Top track */}
                    <rect
                        x={305}
                        y={95}
                        width={170}
                        height={70}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.accent}
                        strokeWidth={1.5}
                    />
                    <text
                        x={390}
                        y={120}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        DEV
                    </text>
                    <line
                        x1={317}
                        y1={128}
                        x2={463}
                        y2={128}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={390}
                        y={143}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Build · Unit Tests
                    </text>
                    <text
                        x={390}
                        y={156}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Auto-deploy on merge
                    </text>

                    {/* Bottom track */}
                    <rect
                        x={305}
                        y={245}
                        width={170}
                        height={70}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.gold}
                        strokeWidth={1.5}
                    />
                    <text
                        x={390}
                        y={270}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        DEV
                    </text>
                    <line
                        x1={317}
                        y1={278}
                        x2={463}
                        y2={278}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={390}
                        y={293}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Build · Unit Tests
                    </text>
                    <text
                        x={390}
                        y={306}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Auto-deploy on merge
                    </text>
                </g>

                {/* STAGING ENVIRONMENT NODES (Col D) */}
                <g>
                    {/* Top track */}
                    <rect
                        x={490}
                        y={95}
                        width={170}
                        height={70}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.accent}
                        strokeWidth={1.5}
                    />
                    <text
                        x={575}
                        y={120}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        STAGING
                    </text>
                    <line
                        x1={502}
                        y1={128}
                        x2={648}
                        y2={128}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={575}
                        y={143}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Integration Tests
                    </text>
                    <text
                        x={575}
                        y={156}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Approval gate required
                    </text>

                    {/* Bottom track */}
                    <rect
                        x={490}
                        y={245}
                        width={170}
                        height={70}
                        rx={0}
                        fill={C.bgCard}
                        stroke={C.gold}
                        strokeWidth={1.5}
                    />
                    <text
                        x={575}
                        y={270}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        STAGING
                    </text>
                    <line
                        x1={502}
                        y1={278}
                        x2={648}
                        y2={278}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={575}
                        y={293}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Integration Tests
                    </text>
                    <text
                        x={575}
                        y={306}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Approval gate required
                    </text>
                </g>

                {/* PRODUCTION NODES (Col E) */}
                <g>
                    {/* Top track */}
                    <rect
                        x={675}
                        y={95}
                        width={150}
                        height={70}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.accent}
                        strokeWidth={2}
                    />
                    <rect x={675} y={95} width={150} height={3} fill={C.accent} />
                    <text
                        x={750}
                        y={123}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        PRODUCTION
                    </text>
                    <line
                        x1={687}
                        y1={131}
                        x2={813}
                        y2={131}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={750}
                        y={146}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Manual approval
                    </text>
                    <text
                        x={750}
                        y={159}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Zero manual deploy
                    </text>

                    {/* Bottom track */}
                    <rect
                        x={675}
                        y={245}
                        width={150}
                        height={70}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.gold}
                        strokeWidth={2}
                    />
                    <rect x={675} y={245} width={150} height={3} fill={C.gold} />
                    <text
                        x={750}
                        y={273}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={11}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        PRODUCTION
                    </text>
                    <line
                        x1={687}
                        y1={281}
                        x2={813}
                        y2={281}
                        stroke={C.border}
                        strokeWidth={0.5}
                    />
                    <text
                        x={750}
                        y={296}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Manual approval
                    </text>
                    <text
                        x={750}
                        y={309}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Zero manual deploy
                    </text>
                </g>

                {/* CONNECTION LINES */}
                <g>
                    {/* Source → DEV */}
                    <path
                        d="M 270 130 L 305 130"
                        stroke={C.accent}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowCyan)"
                    />
                    <path
                        d="M 270 280 L 305 280"
                        stroke={C.gold}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowGold)"
                    />

                    {/* DEV → STAGING */}
                    <path
                        d="M 475 130 L 490 130"
                        stroke={C.accent}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowCyan)"
                    />
                    <path
                        d="M 475 280 L 490 280"
                        stroke={C.gold}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowGold)"
                    />

                    {/* STAGING → PRODUCTION */}
                    <path
                        d="M 660 130 L 675 130"
                        stroke={C.accent}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowCyan)"
                    />
                    <path
                        d="M 660 280 L 675 280"
                        stroke={C.gold}
                        strokeWidth={1.5}
                        fill="none"
                        markerEnd="url(#arrowGold)"
                    />
                </g>

                {/* TEST GATE INDICATORS */}
                <g>
                    {/* DEV→STAGING gates */}
                    <rect
                        x="479"
                        y="127"
                        width="6"
                        height="6"
                        fill={C.accent}
                        transform="rotate(45 482 130)"
                    />
                    <rect
                        x="479"
                        y="277"
                        width="6"
                        height="6"
                        fill={C.gold}
                        transform="rotate(45 482 280)"
                    />

                    {/* STAGING→PROD gates */}
                    <rect
                        x="664"
                        y="127"
                        width="6"
                        height="6"
                        fill={C.accent}
                        transform="rotate(45 667 130)"
                    />
                    <rect
                        x="664"
                        y="277"
                        width="6"
                        height="6"
                        fill={C.gold}
                        transform="rotate(45 667 280)"
                    />
                </g>

                {/* MICROSOFT BUG CALLOUT */}
                <g>
                    <rect
                        x={490}
                        y={58}
                        width={355}
                        height={28}
                        rx={0}
                        fill="rgba(200, 169, 110, 0.06)"
                        stroke={C.goldDim}
                        strokeWidth={0.75}
                        strokeDasharray="3 3"
                    />
                    <text
                        x={667}
                        y={70}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        ⚠ Microsoft platform bug identified · Escalated
                    </text>
                    <text
                        x={667}
                        y={82}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        and resolved directly with Microsoft support
                    </text>
                    <line
                        x1={575}
                        y1={86}
                        x2={575}
                        y2={95}
                        stroke={C.goldDim}
                        strokeWidth={0.75}
                        strokeDasharray="2 2"
                    />
                </g>

                {/* LEGEND */}
                <g>
                    <line x1={20} y1={385} x2={45} y2={385} stroke={C.accent} strokeWidth={1.5} />
                    <text
                        x={50}
                        y={389}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                    >
                        E-Commerce Track
                    </text>

                    <line x1={180} y1={385} x2={205} y2={385} stroke={C.gold} strokeWidth={1.5} />
                    <text
                        x={210}
                        y={389}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                    >
                        Inventory Track
                    </text>

                    <rect
                        x="318"
                        y="381"
                        width="6"
                        height="6"
                        fill={C.accent}
                        transform="rotate(45 321 384)"
                    />
                    <text
                        x={330}
                        y={389}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                    >
                        Test Gate
                    </text>

                    <line x1={420} y1={385} x2={445} y2={385} stroke={C.danger} strokeWidth={1.5} />
                    <text
                        x={450}
                        y={389}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                    >
                        Before state
                    </text>

                    <line
                        x1={560}
                        y1={385}
                        x2={585}
                        y2={385}
                        stroke={C.gold}
                        strokeWidth={1}
                        strokeDasharray="3 3"
                    />
                    <text
                        x={590}
                        y={389}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={9}
                        fill={C.textMuted}
                    >
                        MS Bug scope
                    </text>
                </g>
            </svg>

            {/* Toggle Button */}
            <button
                onClick={() => setShowDetail(prev => !prev)}
                style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '0.82rem',
                    color: showDetail ? '#8ff0ff' : '#6a8a9a',
                    background: 'none',
                    border: 'none',
                    borderTop: '1px solid rgba(143, 240, 255, 0.1)',
                    width: '100%',
                    padding: '0.75rem 0',
                    cursor: 'pointer',
                    letterSpacing: '0.12em',
                    textAlign: 'left',
                    transition: 'color 200ms',
                }}
            >
                {showDetail
                    ? '// hide technical detail ▴'
                    : '// show technical detail ▸'}
            </button>

            {/* Technical Detail Panel */}
            {showDetail && (
                <div style={{
                    borderTop: '1px solid rgba(143, 240, 255, 0.08)',
                    paddingTop: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                }}>
                    {/* SECTION 1 — ENGAGEMENT CONTEXT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            ENGAGEMENT CONTEXT
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr',
                            gap: '0.4rem 1rem',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.82rem',
                        }}>
                            <div style={{ color: '#6a8a9a' }}>Scope</div>
                            <div style={{ color: '#eef4f8' }}>Greenfield — zero existing pipelines</div>
                            <div style={{ color: '#6a8a9a' }}>Applications</div>
                            <div style={{ color: '#eef4f8' }}>Two: customer e-commerce storefront + internal inventory management system</div>
                            <div style={{ color: '#6a8a9a' }}>Stack</div>
                            <div style={{ color: '#eef4f8' }}>.NET / C# · Both applications</div>
                            <div style={{ color: '#6a8a9a' }}>Duration</div>
                            <div style={{ color: '#eef4f8' }}>Six months</div>
                            <div style={{ color: '#6a8a9a' }}>Collaboration</div>
                            <div style={{ color: '#eef4f8' }}>Paired with one internal team member</div>
                            <div style={{ color: '#6a8a9a' }}>Outcome</div>
                            <div style={{ color: '#eef4f8' }}>Fully automated — client satisfied, zero manual deployments remaining</div>
                        </div>
                    </div>

                    {/* SECTION 2 — PIPELINE ARCHITECTURE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            PIPELINE ARCHITECTURE
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '2px', backgroundColor: '#8ff0ff', flexShrink: 0 }}></div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '180px 1fr',
                                gap: '0.4rem 1rem',
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.82rem',
                                flex: 1,
                            }}>
                                <div style={{ color: '#6a8a9a' }}>Structure</div>
                                <div style={{ color: '#eef4f8' }}>Two independent pipeline tracks — one per application</div>
                                <div style={{ color: '#6a8a9a' }}>Environments</div>
                                <div style={{ color: '#eef4f8' }}>Dev → Staging → Production (both tracks)</div>
                                <div style={{ color: '#6a8a9a' }}>Trigger — Dev</div>
                                <div style={{ color: '#eef4f8' }}>Automatic on merge to main branch</div>
                                <div style={{ color: '#6a8a9a' }}>Trigger — Stage</div>
                                <div style={{ color: '#eef4f8' }}>Approval gate required</div>
                                <div style={{ color: '#6a8a9a' }}>Trigger — Prod</div>
                                <div style={{ color: '#eef4f8' }}>Manual approval — explicit promotion only</div>
                                <div style={{ color: '#6a8a9a' }}>PR Gates</div>
                                <div style={{ color: '#eef4f8' }}>Pull request checks enforced at source control level</div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3 — TEST STRATEGY */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            TEST STRATEGY
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr',
                            gap: '0.4rem 1rem',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.82rem',
                        }}>
                            <div style={{ color: '#6a8a9a' }}>Unit Tests</div>
                            <div style={{ color: '#eef4f8' }}>Executed in DEV stage — gate blocks promotion on failure</div>
                            <div style={{ color: '#6a8a9a' }}>Integration Tests</div>
                            <div style={{ color: '#eef4f8' }}>Executed in STAGING stage — full environment validation before production promotion</div>
                            <div style={{ color: '#6a8a9a' }}>Coverage Scope</div>
                            <div style={{ color: '#eef4f8' }}>Both applications tested independently per track</div>
                            <div style={{ color: '#6a8a9a' }}>Failure Behavior</div>
                            <div style={{ color: '#eef4f8' }}>Pipeline halts at failed stage — no promotion until resolved</div>
                        </div>
                    </div>

                    {/* SECTION 4 — MICROSOFT BUG ESCALATION */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#c8a96e',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            MICROSOFT PLATFORM BUG · ESCALATION
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '2px', backgroundColor: '#c8a96e', flexShrink: 0 }}></div>
                            <div style={{
                                fontFamily: "'Exo 2', sans-serif",
                                fontSize: '0.95rem',
                                fontWeight: 300,
                                color: '#b0c8d8',
                                lineHeight: '1.8',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                            }}>
                                <p style={{ margin: 0 }}>
                                    During the engagement a significant Microsoft Azure DevOps platform bug was identified that was blocking pipeline execution. The bug was not reproducible in isolation and was confirmed to be a platform-level issue rather than a configuration error.
                                </p>
                                <p style={{ margin: 0 }}>
                                    The issue was escalated directly to Microsoft support. Working with their engineering team, the root cause was identified and a resolution was delivered. This unblocked the pipeline and the engagement continued without further platform issues.
                                </p>
                                <p style={{ margin: 0, color: '#c8a96e' }}>
                                    Identifying a vendor platform bug and navigating enterprise support to resolution is a distinct skill — this was a real production blocker, not a configuration mistake.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5 — BEFORE vs AFTER */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            BEFORE / AFTER
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Row 1 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px 1fr',
                                gap: '0.5rem',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid rgba(143, 240, 255, 0.06)',
                            }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.danger,
                                    padding: '0.4rem',
                                    background: C.dangerFaint,
                                    border: `1px solid ${C.dangerDim}`,
                                }}>Manual deployment process</div>
                                <div style={{ color: C.textMuted, textAlign: 'center' }}>→</div>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.accent,
                                    padding: '0.4rem',
                                    background: C.accentFaint,
                                    border: `1px solid ${C.accentDim}`,
                                }}>Fully automated pipeline</div>
                            </div>
                            {/* Row 2 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px 1fr',
                                gap: '0.5rem',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid rgba(143, 240, 255, 0.06)',
                            }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.danger,
                                    padding: '0.4rem',
                                    background: C.dangerFaint,
                                    border: `1px solid ${C.dangerDim}`,
                                }}>No test automation</div>
                                <div style={{ color: C.textMuted, textAlign: 'center' }}>→</div>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.accent,
                                    padding: '0.4rem',
                                    background: C.accentFaint,
                                    border: `1px solid ${C.accentDim}`,
                                }}>Unit + integration test gates</div>
                            </div>
                            {/* Row 3 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px 1fr',
                                gap: '0.5rem',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid rgba(143, 240, 255, 0.06)',
                            }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.danger,
                                    padding: '0.4rem',
                                    background: C.dangerFaint,
                                    border: `1px solid ${C.dangerDim}`,
                                }}>No environment promotion logic</div>
                                <div style={{ color: C.textMuted, textAlign: 'center' }}>→</div>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.accent,
                                    padding: '0.4rem',
                                    background: C.accentFaint,
                                    border: `1px solid ${C.accentDim}`,
                                }}>Dev → Staging → Prod with approval gates</div>
                            </div>
                            {/* Row 4 */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px 1fr',
                                gap: '0.5rem',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                            }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.danger,
                                    padding: '0.4rem',
                                    background: C.dangerFaint,
                                    border: `1px solid ${C.dangerDim}`,
                                }}>No PR enforcement</div>
                                <div style={{ color: C.textMuted, textAlign: 'center' }}>→</div>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    color: C.accent,
                                    padding: '0.4rem',
                                    background: C.accentFaint,
                                    border: `1px solid ${C.accentDim}`,
                                }}>PR gates at source control level</div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 6 — DESIGN RATIONALE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            DESIGN RATIONALE
                        </div>
                        <div style={{
                            fontFamily: "'Exo 2', sans-serif",
                            fontSize: '0.95rem',
                            fontWeight: 300,
                            color: '#b0c8d8',
                            lineHeight: '1.8',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                        }}>
                            <p style={{ margin: 0 }}>
                                Two independent pipeline tracks were built rather than a single shared pipeline to ensure that a failure in one application's build or test suite could not block deployment of the other. Each application has its own deployment cadence and its own test suite — coupling them in a single pipeline would have introduced unnecessary coordination overhead.
                            </p>
                            <p style={{ margin: 0 }}>
                                The three-environment promotion model was chosen to provide a clear validation checkpoint between development work and production. The staging environment runs the full integration test suite against a production-equivalent configuration, ensuring that environment-specific issues are caught before they reach customers.
                            </p>
                            <p style={{ margin: 0 }}>
                                Manual approval at the production gate was a deliberate choice. Fully automated production deployments were not appropriate for this client's risk tolerance at the time of delivery — the approval gate provides a human checkpoint while still eliminating all manual deployment work.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
