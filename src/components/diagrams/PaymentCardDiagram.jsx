import { useState, useRef } from 'react'
import { C, DiagramArrowDefs } from './diagramConstants'

export default function PaymentCardDiagram() {
    const [showDetail, setShowDetail] = useState(false)
    const detailsRef = useRef(null)

    return (
        <div>
            <svg
                viewBox="0 0 960 360"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block', width: '100%' }}
            >
                <DiagramArrowDefs />

                {/* BACKGROUND */}
                <rect width="960" height="360" fill={C.bg} />

                {/* SECTION LABEL */}
                <text
                    x={16}
                    y={20}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={11}
                    fill={C.textMuted}
                    letterSpacing={2}
                >
                    FIG.1 · PAYMENT CARD DEFAULT FEATURE · FULL-STACK VERTICAL SLICE
                </text>

                {/* OPTIMISTIC UPDATE CALLOUT */}
                <rect
                    x={20} y={38} width={160} height={28} rx={0}
                    fill={C.accentFaint}
                    stroke={C.accentDim}
                    strokeWidth={0.75}
                    strokeDasharray="3 3"
                />
                <text
                    x={100} y={52}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    Optimistic Update
                </text>
                <text
                    x={100} y={64}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    UI updates immediately
                </text>
                {/* Connector line down to UI node */}
                <line
                    x1={100} y1={66} x2={100} y2={100}
                    stroke={C.accentDim}
                    strokeWidth={0.75}
                    strokeDasharray="2 2"
                />

                {/* ASSOCIATE UI NODE (Col A) */}
                <rect
                    x={20} y={100} width={160} height={80} rx={0}
                    fill={C.bgNode}
                    stroke={C.accent}
                    strokeWidth={1.5}
                />
                {/* Top accent bar */}
                <rect x={20} y={100} width={160} height={3} fill={C.accent} />
                <text
                    x={100} y={130}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    Associate UI
                </text>
                {/* Separator */}
                <line
                    x1={32} y1={138} x2={168} y2={138}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={100} y={153}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Java 8 · Spring Boot
                </text>
                <text
                    x={100} y={166}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    CSS · Optimistic UI
                </text>

                {/* DEFAULT TAG VISUAL INDICATOR */}
                <text
                    x={64} y={170}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={7.5}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    visual tag
                </text>
                <rect
                    x={38} y={172} width={52} height={14} rx={0}
                    fill={C.successFaint}
                    stroke={C.successDim}
                    strokeWidth={0.75}
                />
                <text
                    x={64} y={183}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={8}
                    fill={C.success}
                    textAnchor="middle"
                >
                    DEFAULT
                </text>

                {/* MODAL BRANCH NODES (Col B) */}
                {/* Top modal — change default */}
                <rect
                    x={185} y={48} width={150} height={58} rx={0}
                    fill={C.bgCard}
                    stroke={C.gold}
                    strokeWidth={1}
                />
                <text
                    x={260} y={70}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.gold}
                    textAnchor="middle"
                >
                    Change Default
                </text>
                <line
                    x1={197} y1={78} x2={323} y2={78}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={260} y={93}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Confirmation modal
                </text>

                {/* Bottom modal — no card on file */}
                <rect
                    x={185} y={168} width={150} height={58} rx={0}
                    fill={C.bgCard}
                    stroke={C.danger}
                    strokeWidth={1}
                />
                <text
                    x={260} y={190}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.danger}
                    textAnchor="middle"
                >
                    No Card on File
                </text>
                <line
                    x1={197} y1={198} x2={323} y2={198}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={260} y={213}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Error modal · Validation
                </text>

                {/* PAYMENT WRAPPER SERVICE NODE (Col C) */}
                <rect
                    x={370} y={95} width={220} height={90} rx={0}
                    fill={C.bgCard}
                    stroke={C.accent}
                    strokeWidth={2}
                />
                {/* Top accent bar */}
                <rect x={370} y={95} width={220} height={3} fill={C.accent} />
                <text
                    x={480} y={123}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    Payment Wrapper
                </text>
                <text
                    x={480} y={138}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    Service
                </text>
                <line
                    x1={382} y1={146} x2={578} y2={146}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={480} y={161}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    PUT /default-card · New endpoint
                </text>
                <text
                    x={480} y={174}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    LDAP auth · Validation · Logging
                </text>

                {/* KEY DECISION badge below node */}
                <rect
                    x={405} y={190} width={150} height={16}
                    fill={C.accentFaint}
                    stroke={C.accentDim}
                    strokeWidth={0.75}
                />
                <text
                    x={480} y={202}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={8.5}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    ◆ ENDPOINT AUTHORED HERE
                </text>

                {/* CC PROCESSOR NODE (Col D) */}
                <rect
                    x={615} y={100} width={170} height={80} rx={0}
                    fill={C.bgNode}
                    stroke={C.gold}
                    strokeWidth={1.5}
                />
                <text
                    x={700} y={128}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.gold}
                    textAnchor="middle"
                >
                    Credit Card
                </text>
                <text
                    x={700} y={143}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.gold}
                    textAnchor="middle"
                >
                    Processor
                </text>
                <line
                    x1={627} y1={151} x2={773} y2={151}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={700} y={166}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Internal payment service
                </text>

                {/* PERSISTENCE OUTCOME NODE (Col E) */}
                <rect
                    x={800} y={100} width={140} height={80} rx={0}
                    fill={C.bgNode}
                    stroke={C.success}
                    strokeWidth={1.5}
                />
                {/* Top accent bar */}
                <rect x={800} y={100} width={140} height={3} fill={C.success} />
                <text
                    x={870} y={128}
                    fontFamily="'Orbitron', sans-serif"
                    fontSize={12}
                    fill={C.success}
                    textAnchor="middle"
                >
                    DB Persisted
                </text>
                <line
                    x1={812} y1={136} x2={928} y2={136}
                    stroke={C.border}
                    strokeWidth={0.5}
                />
                <text
                    x={870} y={151}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Default flag saved
                </text>
                <text
                    x={870} y={164}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={10}
                    fill={C.textMuted}
                    textAnchor="middle"
                >
                    Persists on next visit
                </text>

                {/* CONNECTION LINES */}
                {/* UI → Change Default modal (up and right) */}
                <path
                    d="M 180 130 L 185 130 L 185 77 L 185 77"
                    stroke={C.gold}
                    strokeWidth={1}
                    fill="none"
                    markerEnd="url(#arrowGold)"
                />

                {/* UI → No Card modal (down and right) */}
                <path
                    d="M 180 150 L 185 150 L 185 197 L 185 197"
                    stroke={C.danger}
                    strokeWidth={1}
                    fill="none"
                    markerEnd="url(#arrowDanger)"
                />

                {/* UI → Payment Wrapper (main flow, direct) */}
                <path
                    d="M 180 140 L 370 140"
                    stroke={C.accent}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#arrowCyan)"
                />

                {/* Junction square at (180, 140) */}
                <rect x={177} y={137} width={6} height={6} fill={C.accent} />

                {/* Payment Wrapper → CC Processor */}
                <path
                    d="M 590 140 L 615 140"
                    stroke={C.gold}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#arrowGold)"
                />

                {/* CC Processor → Persistence */}
                <path
                    d="M 785 140 L 800 140"
                    stroke={C.success}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#arrowSuccess)"
                />

                {/* RETURN FLOW (bottom, async confirmation) */}
                {/* Label above return path */}
                <text
                    x={580} y={268}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.textMuted}
                    textAnchor="middle"
                    letterSpacing={1}
                >
                    async confirmation · DB sync
                </text>

                {/* Return path from Persistence back left */}
                <path
                    d="M 870 180 L 870 250 L 480 250 L 480 220"
                    stroke={C.successDim}
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    fill="none"
                    markerEnd="url(#arrowSuccess)"
                />

                {/* LEGEND */}
                <g transform="translate(16, 320)">
                    {/* Cyan line + "Associate Layer" */}
                    <g transform="translate(0, 0)">
                        <line x1={0} y1={0} x2={20} y2={0} stroke={C.accent} strokeWidth={1.5} />
                        <text
                            x={26}
                            y={0}
                            fill={C.textMuted}
                            fontSize={10}
                            fontFamily="'Share Tech Mono', monospace"
                            dominantBaseline="middle"
                        >
                            Associate Layer
                        </text>
                    </g>

                    {/* Gold line + "Payment Layer" */}
                    <g transform="translate(150, 0)">
                        <line x1={0} y1={0} x2={20} y2={0} stroke={C.gold} strokeWidth={1.5} />
                        <text
                            x={26}
                            y={0}
                            fill={C.textMuted}
                            fontSize={10}
                            fontFamily="'Share Tech Mono', monospace"
                            dominantBaseline="middle"
                        >
                            Payment Layer
                        </text>
                    </g>

                    {/* Success line + "Persistence / Async Return" */}
                    <g transform="translate(300, 0)">
                        <line x1={0} y1={0} x2={20} y2={0} stroke={C.success} strokeWidth={1.5} />
                        <text
                            x={26}
                            y={0}
                            fill={C.textMuted}
                            fontSize={10}
                            fontFamily="'Share Tech Mono', monospace"
                            dominantBaseline="middle"
                        >
                            Persistence / Async Return
                        </text>
                    </g>

                    {/* Danger line + "Error / Validation Path" */}
                    <g transform="translate(510, 0)">
                        <line x1={0} y1={0} x2={20} y2={0} stroke={C.danger} strokeWidth={1.5} />
                        <text
                            x={26}
                            y={0}
                            fill={C.textMuted}
                            fontSize={10}
                            fontFamily="'Share Tech Mono', monospace"
                            dominantBaseline="middle"
                        >
                            Error / Validation Path
                        </text>
                    </g>

                    {/* Dashed line + "Async / Optimistic" */}
                    <g transform="translate(710, 0)">
                        <line x1={0} y1={0} x2={20} y2={0} stroke={C.textMuted} strokeWidth={1} strokeDasharray="4 3" />
                        <text
                            x={26}
                            y={0}
                            fill={C.textMuted}
                            fontSize={10}
                            fontFamily="'Share Tech Mono', monospace"
                            dominantBaseline="middle"
                        >
                            Async / Optimistic
                        </text>
                    </g>
                </g>
            </svg>

            {/* Toggle Button */}
            <button
                onClick={() => {
                    setShowDetail(prev => {
                        if (!prev) {
                            // Expanding - scroll to details after render
                            setTimeout(() => {
                                detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }, 100)
                        }
                        return !prev
                    })
                }}
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
                <div
                    ref={detailsRef}
                    className="tech-details-panel"
                    style={{
                        borderTop: '1px solid rgba(143, 240, 255, 0.08)',
                        paddingTop: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    {/* SECTION 1 — FEATURE CONTEXT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            FEATURE CONTEXT
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr',
                            gap: '0.4rem 1rem',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.82rem',
                        }}>
                            <div style={{ color: '#6a8a9a' }}>Feature</div>
                            <div style={{ color: '#eef4f8' }}>Associate-facing default payment card management</div>
                            <div style={{ color: '#6a8a9a' }}>User</div>
                            <div style={{ color: '#eef4f8' }}>Internal associate — not customer-facing</div>
                            <div style={{ color: '#6a8a9a' }}>Stack</div>
                            <div style={{ color: '#eef4f8' }}>Java 8 · Spring Boot · CSS · Monolithic repo</div>
                            <div style={{ color: '#6a8a9a' }}>Status</div>
                            <div style={{ color: '#eef4f8' }}>WIP — active development</div>
                            <div style={{ color: '#6a8a9a' }}>Auth</div>
                            <div style={{ color: '#eef4f8' }}>Fortune 50 internal LDAP — pre-existing, not modified</div>
                            <div style={{ color: '#6a8a9a' }}>Scope</div>
                            <div style={{ color: '#eef4f8' }}>Full vertical slice — UI, endpoint, downstream integration</div>
                        </div>
                    </div>

                    {/* SECTION 2 — UI LAYER */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            UI LAYER
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
                                <div style={{ color: '#6a8a9a' }}>Framework</div>
                                <div style={{ color: '#eef4f8' }}>Java 8 · Spring Boot · CSS</div>
                                <div style={{ color: '#6a8a9a' }}>Update Pattern</div>
                                <div style={{ color: '#eef4f8' }}>Optimistic — UI updates immediately on associate action</div>
                                <div style={{ color: '#6a8a9a' }}>Default Tag</div>
                                <div style={{ color: '#eef4f8' }}>Visual indicator rendered when card is set as default — DB-aware, persists on reload</div>
                                <div style={{ color: '#6a8a9a' }}>Modal — Change</div>
                                <div style={{ color: '#eef4f8' }}>Confirmation modal when associate selects a different card than current default</div>
                                <div style={{ color: '#6a8a9a' }}>Modal — No Card</div>
                                <div style={{ color: '#eef4f8' }}>Distinct error modal when customer has no card on file</div>
                                <div style={{ color: '#6a8a9a' }}>Validation</div>
                                <div style={{ color: '#eef4f8' }}>Client-side validation before PUT fires — prevents invalid state reaching the API</div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3 — PAYMENT WRAPPER SERVICE ENDPOINT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            PAYMENT WRAPPER SERVICE · NEW ENDPOINT
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
                                <div style={{ color: '#6a8a9a' }}>Method</div>
                                <div style={{ color: '#eef4f8' }}>PUT /default-card</div>
                                <div style={{ color: '#6a8a9a' }}>Authored</div>
                                <div style={{ color: '#eef4f8' }}>New endpoint — designed and implemented for this feature</div>
                                <div style={{ color: '#6a8a9a' }}>Responsibility</div>
                                <div style={{ color: '#eef4f8' }}>Receives default card update request · Validates · Calls downstream CC processor · Returns confirmation</div>
                                <div style={{ color: '#6a8a9a' }}>Auth</div>
                                <div style={{ color: '#eef4f8' }}>Fortune 50 internal LDAP · Pre-existing filter chain — endpoint sits behind it without modification</div>
                                <div style={{ color: '#6a8a9a' }}>Logging</div>
                                <div style={{ color: '#eef4f8' }}>Request and response logged for audit trail and production debugging</div>
                                <div style={{ color: '#6a8a9a' }}>Error Handling</div>
                                <div style={{ color: '#eef4f8' }}>Downstream failures caught and surfaced — async failure does not leave UI in permanently incorrect state</div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4 — DOWNSTREAM INTEGRATION */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#c8a96e',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            DOWNSTREAM · CREDIT CARD PROCESSOR INTEGRATION
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '2px', backgroundColor: '#c8a96e', flexShrink: 0 }}></div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '180px 1fr',
                                gap: '0.4rem 1rem',
                                fontFamily: "'Share Tech Mono', monospace",
                                fontSize: '0.82rem',
                                flex: 1,
                            }}>
                                <div style={{ color: '#6a8a9a' }}>Service</div>
                                <div style={{ color: '#eef4f8' }}>Internal credit card processing service</div>
                                <div style={{ color: '#6a8a9a' }}>Call Type</div>
                                <div style={{ color: '#eef4f8' }}>Synchronous from Payment Wrapper → async confirmation back to UI</div>
                                <div style={{ color: '#6a8a9a' }}>Responsibility</div>
                                <div style={{ color: '#eef4f8' }}>Authoritative source for card default state — Payment Wrapper delegates persistence decision here</div>
                                <div style={{ color: '#6a8a9a' }}>Return Flow</div>
                                <div style={{ color: '#eef4f8' }}>Confirmation triggers DB persistence of default flag</div>
                                <div style={{ color: '#6a8a9a' }}>Persistence</div>
                                <div style={{ color: '#eef4f8' }}>Default flag saved to DB after CC processor confirms — survives page reload and future customer visits</div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5 — OPTIMISTIC UI TRADEOFFS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            OPTIMISTIC UPDATE · TRADEOFFS
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem',
                        }}>
                            {/* WHAT THIS GIVES US (cyan) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.75rem',
                                    color: '#8ff0ff',
                                    letterSpacing: '0.1em',
                                    borderBottom: '1px solid rgba(143, 240, 255, 0.2)',
                                    paddingBottom: '0.25rem',
                                }}>
                                    WHAT THIS GIVES US
                                </div>
                                <ul style={{
                                    margin: 0,
                                    paddingLeft: '1.2rem',
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.8rem',
                                    color: '#b0c8d8',
                                    lineHeight: '1.7',
                                    listStyleType: 'disc',
                                }}>
                                    <li>Immediate visual feedback for the associate — no waiting on payment processor round trip</li>
                                    <li>Perceived performance improvement — UI feels responsive regardless of downstream latency</li>
                                    <li>Standard pattern for internal tooling where eventual consistency is acceptable</li>
                                </ul>
                            </div>

                            {/* WHAT TO WATCH (gold) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.75rem',
                                    color: '#c8a96e',
                                    letterSpacing: '0.1em',
                                    borderBottom: '1px solid rgba(200, 169, 110, 0.2)',
                                    paddingBottom: '0.25rem',
                                }}>
                                    WHAT TO WATCH
                                </div>
                                <ul style={{
                                    margin: 0,
                                    paddingLeft: '1.2rem',
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.8rem',
                                    color: '#b0c8d8',
                                    lineHeight: '1.7',
                                    listStyleType: 'disc',
                                }}>
                                    <li>If async confirmation fails, UI and DB can briefly diverge — error handling must surface this clearly</li>
                                    <li>Logging is critical — async failures without logging are silent and difficult to debug in production</li>
                                    <li>Associate could act on stale UI state in a failure scenario — modal validation is the safety net here</li>
                                </ul>
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
                                The optimistic update pattern was chosen deliberately for an internal associate tool where the payment processor round trip introduces latency that would degrade the associate experience. Associates are performing this action while a customer is present — perceived responsiveness directly affects customer service quality.
                            </p>
                            <p style={{ margin: 0 }}>
                                The two distinct modal flows — one for changing an existing default, one for the no-card-on-file state — exist because these are fundamentally different situations that require different associate responses. Collapsing them into a single generic error state would obscure the distinction and increase associate error rates.
                            </p>
                            <p style={{ margin: 0 }}>
                                A new endpoint was authored in the Payment Wrapper Service rather than calling the credit card processor directly from the UI layer. This maintains the architectural boundary between the front-end and payment infrastructure, ensures auth and logging are applied consistently, and keeps the downstream integration testable in isolation.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
