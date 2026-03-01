import { useState } from 'react'

const C = {
    bg: '#070d14',
    bgCard: '#0b1520',
    bgNode: '#0f1e2e',
    border: 'rgba(143, 240, 255, 0.2)',
    borderBright: 'rgba(143, 240, 255, 0.5)',
    accent: '#8ff0ff',
    accentDim: 'rgba(143, 240, 255, 0.4)',
    accentFaint: 'rgba(143, 240, 255, 0.12)',
    gold: '#c8a96e',
    goldDim: 'rgba(200, 169, 110, 0.4)',
    goldFaint: 'rgba(200, 169, 110, 0.1)',
    danger: '#e07070',
    dangerFaint: 'rgba(224, 112, 112, 0.1)',
    dangerDim: 'rgba(224, 112, 112, 0.35)',
    textPrimary: '#eef4f8',
    textMuted: '#6a8a9a',
    textLabel: '#8ff0ff',
    white: '#ffffff',
}

export default function SpringModernizationDiagram({ onNavigate }) {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <div>
            <svg
                viewBox="0 0 820 320"
                width="100%"
                style={{ display: 'block', minWidth: '600px' }}
            >
                <defs>
                    <marker
                        id="arrowCyan"
                        markerWidth="8"
                        markerHeight="8"
                        refX="6"
                        refY="3"
                        orient="auto"
                    >
                        <path
                            d="M 0 0 L 6 3 L 0 6"
                            stroke={C.accent}
                            strokeWidth={1}
                            fill="none"
                        />
                    </marker>
                </defs>

                {/* Section Label */}
                <text
                    x={16}
                    y={20}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={9}
                    fill={C.textMuted}
                    letterSpacing={2}
                >
                    FIG.1 · SPRING BOOT MODERNIZATION · BEFORE / AFTER
                </text>

                {/* BEFORE COLUMN */}
                <g>
                    {/* Column header */}
                    <rect
                        x={60}
                        y={30}
                        width={300}
                        height={24}
                        fill={C.dangerFaint}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />
                    <text
                        x={210}
                        y={47}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={9}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        BEFORE · Spring Boot 2.0.7
                    </text>

                    {/* Node 1 — Runtime */}
                    <rect
                        x={80}
                        y={70}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />
                    <text
                        x={210}
                        y={91}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        Java 8 Runtime
                    </text>
                    <text
                        x={210}
                        y={108}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        Spring Boot 2.0.7 · Legacy dependency tree
                    </text>

                    {/* Connector 1-2 */}
                    <line
                        x1={210}
                        y1={122}
                        x2={210}
                        y2={138}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />

                    {/* Node 2 — Security */}
                    <rect
                        x={80}
                        y={138}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />
                    <text
                        x={210}
                        y={159}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        LDAP Auth Only
                    </text>
                    <text
                        x={210}
                        y={176}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        LdapAuthenticationProvider · No token support
                    </text>

                    {/* Connector 2-3 */}
                    <line
                        x1={210}
                        y1={190}
                        x2={210}
                        y2={206}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />

                    {/* Node 3 — Limitation */}
                    <rect
                        x={80}
                        y={206}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.dangerDim}
                        strokeWidth={1}
                    />
                    <text
                        x={210}
                        y={227}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.danger}
                        textAnchor="middle"
                    >
                        OAuth2 Not Possible
                    </text>
                    <text
                        x={210}
                        y={244}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        2.0.7 oauth2ResourceServer() DSL insufficient
                    </text>
                </g>

                {/* DIVIDER */}
                <line
                    x1={420}
                    y1={30}
                    x2={420}
                    y2={280}
                    stroke="rgba(143, 240, 255, 0.15)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                />

                {/* Arrow across divider */}
                <text
                    x={420}
                    y={148}
                    fontFamily="'Share Tech Mono', monospace"
                    fontSize={7}
                    fill={C.accent}
                    textAnchor="middle"
                >
                    UPGRADE
                </text>
                <path
                    d="M 395 155 L 445 155"
                    stroke={C.accent}
                    strokeWidth={1.5}
                    fill="none"
                    markerEnd="url(#arrowCyan)"
                />

                {/* AFTER COLUMN */}
                <g>
                    {/* Column header */}
                    <rect
                        x={460}
                        y={30}
                        width={300}
                        height={24}
                        fill={C.accentFaint}
                        stroke={C.accentDim}
                        strokeWidth={1}
                    />
                    <text
                        x={610}
                        y={47}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={9}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        AFTER · Spring Boot 2.7.14
                    </text>

                    {/* Node 1 — Runtime */}
                    <rect
                        x={475}
                        y={70}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.accent}
                        strokeWidth={1}
                    />
                    <text
                        x={605}
                        y={91}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        Java 8 Runtime · Maintained
                    </text>
                    <text
                        x={605}
                        y={108}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        2.7.14 · Last Java 8 compatible release
                    </text>

                    {/* Connector 1-2 */}
                    <line
                        x1={605}
                        y1={122}
                        x2={605}
                        y2={138}
                        stroke={C.accentDim}
                        strokeWidth={1}
                    />

                    {/* Node 2 — Security */}
                    <rect
                        x={475}
                        y={138}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.accent}
                        strokeWidth={1}
                    />
                    {/* Top accent bar */}
                    <rect
                        x={475}
                        y={138}
                        width={260}
                        height={3}
                        fill={C.accent}
                    />
                    <text
                        x={605}
                        y={162}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.accent}
                        textAnchor="middle"
                    >
                        Dual Authentication
                    </text>
                    <text
                        x={605}
                        y={179}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.textMuted}
                        textAnchor="middle"
                    >
                        OAuth2/JWT + LDAP · Spring Security filter chains
                    </text>

                    {/* Connector 2-3 */}
                    <line
                        x1={605}
                        y1={190}
                        x2={605}
                        y2={206}
                        stroke={C.accentDim}
                        strokeWidth={1}
                    />

                    {/* Node 3 — Outcome */}
                    <rect
                        x={475}
                        y={206}
                        width={260}
                        height={52}
                        rx={0}
                        fill={C.bgNode}
                        stroke={C.gold}
                        strokeWidth={1}
                    />
                    <text
                        x={605}
                        y={227}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize={10}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        Dual-Auth API · Enabled
                    </text>
                    <text
                        x={605}
                        y={244}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={7.5}
                        fill={C.gold}
                        textAnchor="middle"
                    >
                        → See Dual-Auth REST API case study
                    </text>
                </g>

                {/* LEGEND */}
                <g>
                    <line x1={60} y1={300} x2={85} y2={300} stroke={C.danger} strokeWidth={1.5} />
                    <text
                        x={90}
                        y={304}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={8}
                        fill={C.textMuted}
                    >
                        Legacy state
                    </text>

                    <line x1={200} y1={300} x2={225} y2={300} stroke={C.accent} strokeWidth={1.5} />
                    <text
                        x={230}
                        y={304}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={8}
                        fill={C.textMuted}
                    >
                        Modernized state
                    </text>

                    <line x1={360} y1={300} x2={385} y2={300} stroke={C.gold} strokeWidth={1.5} />
                    <text
                        x={390}
                        y={304}
                        fontFamily="'Share Tech Mono', monospace"
                        fontSize={8}
                        fill={C.textMuted}
                    >
                        Enabled outcome
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
                    {/* SECTION 1 — UPGRADE CONTEXT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            UPGRADE CONTEXT
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr',
                            gap: '0.4rem 1rem',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.82rem',
                        }}>
                            <div style={{ color: '#6a8a9a' }}>Service Size</div>
                            <div style={{ color: '#eef4f8' }}>~1,000 lines · Single service</div>
                            <div style={{ color: '#6a8a9a' }}>Original Stack</div>
                            <div style={{ color: '#eef4f8' }}>Java 8 · Spring Boot 2.0.7 · LDAP only</div>
                            <div style={{ color: '#6a8a9a' }}>Driver</div>
                            <div style={{ color: '#eef4f8' }}>OAuth2 implementation required modern DSL not available in 2.0.7</div>
                            <div style={{ color: '#6a8a9a' }}>Java Constraint</div>
                            <div style={{ color: '#eef4f8' }}>Java 17 not approved — 2.7.14 selected as Java 8 compatibility ceiling</div>
                            <div style={{ color: '#6a8a9a' }}>Deployment Target</div>
                            <div style={{ color: '#eef4f8' }}>Kubernetes via Rancher · unchanged</div>
                        </div>
                    </div>

                    {/* SECTION 2 — VERSION SELECTION RATIONALE */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            VERSION SELECTION RATIONALE
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
                                Spring Boot 2.7.14 was selected as the upgrade target because it represented the final release in the 2.x line with full Java 8 compatibility. Spring Boot 3.x requires Java 17 as a minimum runtime — which was not approved for this service at the time. Targeting 2.7.14 provided access to the modern oauth2ResourceServer() DSL while remaining within the approved runtime constraint.
                            </p>
                            <p style={{ margin: 0 }}>
                                This was a deliberate ceiling decision rather than a temporary compromise — the service was scoped for a future Java 17 migration, making 2.7.14 the correct intermediate target rather than an arbitrary choice.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 3 — WHAT CHANGED */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            WHAT CHANGED IN THE UPGRADE
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '180px 1fr',
                            gap: '0.4rem 1rem',
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.82rem',
                        }}>
                            <div style={{ color: '#6a8a9a' }}>Spring Boot</div>
                            <div style={{ color: '#eef4f8' }}>2.0.7 → 2.7.14</div>
                            <div style={{ color: '#6a8a9a' }}>Spring Security</div>
                            <div style={{ color: '#eef4f8' }}>5.0 → 5.7 · Significant API changes</div>
                            <div style={{ color: '#6a8a9a' }}>OAuth2 Support</div>
                            <div style={{ color: '#eef4f8' }}>Added · oauth2ResourceServer() DSL</div>
                            <div style={{ color: '#6a8a9a' }}>LDAP Auth</div>
                            <div style={{ color: '#eef4f8' }}>Retained · LdapAuthenticationProvider</div>
                            <div style={{ color: '#6a8a9a' }}>Security Config</div>
                            <div style={{ color: '#eef4f8' }}>WebSecurityConfigurerAdapter deprecated → Component-based SecurityFilterChain</div>
                            <div style={{ color: '#6a8a9a' }}>Dependencies</div>
                            <div style={{ color: '#eef4f8' }}>Full dependency tree reconciliation required for 2.0 → 2.7 jump</div>
                        </div>
                    </div>

                    {/* SECTION 4 — MIGRATION RISKS MANAGED */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            MIGRATION RISKS MANAGED
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.6rem',
                        }}>
                            {/* BREAKING - WebSecurityConfigurerAdapter */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    padding: '2px 8px',
                                    border: '1px solid rgba(224,112,112,0.3)',
                                    color: '#e07070',
                                    background: 'rgba(224,112,112,0.1)',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}>BREAKING</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Exo 2', sans-serif",
                                        fontSize: '0.92rem',
                                        color: '#eef4f8',
                                        marginBottom: '0.2rem',
                                    }}>WebSecurityConfigurerAdapter removal</div>
                                    <div style={{
                                        fontFamily: "'Share Tech Mono', monospace",
                                        fontSize: '0.8rem',
                                        color: '#6a8a9a',
                                        lineHeight: '1.6',
                                    }}>Spring Security 5.7 deprecated the adapter pattern entirely — security config had to be rewritten as component-based SecurityFilterChain beans</div>
                                </div>
                            </div>
                            {/* BREAKING - Dependency conflicts */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    padding: '2px 8px',
                                    border: '1px solid rgba(224,112,112,0.3)',
                                    color: '#e07070',
                                    background: 'rgba(224,112,112,0.1)',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}>BREAKING</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Exo 2', sans-serif",
                                        fontSize: '0.92rem',
                                        color: '#eef4f8',
                                        marginBottom: '0.2rem',
                                    }}>Dependency conflicts across 2.0 → 2.7 jump</div>
                                    <div style={{
                                        fontFamily: "'Share Tech Mono', monospace",
                                        fontSize: '0.8rem',
                                        color: '#6a8a9a',
                                        lineHeight: '1.6',
                                    }}>Multi-version jump required full dependency tree reconciliation — transitive conflicts resolved before OAuth2 implementation began</div>
                                </div>
                            </div>
                            {/* MANAGED - LDAP compatibility */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    padding: '2px 8px',
                                    border: '1px solid rgba(143,240,255,0.3)',
                                    color: '#8ff0ff',
                                    background: 'rgba(143,240,255,0.08)',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}>MANAGED</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Exo 2', sans-serif",
                                        fontSize: '0.92rem',
                                        color: '#eef4f8',
                                        marginBottom: '0.2rem',
                                    }}>LDAP configuration compatibility</div>
                                    <div style={{
                                        fontFamily: "'Share Tech Mono', monospace",
                                        fontSize: '0.8rem',
                                        color: '#6a8a9a',
                                        lineHeight: '1.6',
                                    }}>Existing LdapAuthenticationProvider configuration validated against 5.7 API — retained without breaking changes</div>
                                </div>
                            </div>
                            {/* MANAGED - Runtime stability */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.78rem',
                                    padding: '2px 8px',
                                    border: '1px solid rgba(143,240,255,0.3)',
                                    color: '#8ff0ff',
                                    background: 'rgba(143,240,255,0.08)',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0,
                                    marginTop: '2px',
                                }}>MANAGED</div>
                                <div>
                                    <div style={{
                                        fontFamily: "'Exo 2', sans-serif",
                                        fontSize: '0.92rem',
                                        color: '#eef4f8',
                                        marginBottom: '0.2rem',
                                    }}>Runtime stability</div>
                                    <div style={{
                                        fontFamily: "'Share Tech Mono', monospace",
                                        fontSize: '0.8rem',
                                        color: '#6a8a9a',
                                        lineHeight: '1.6',
                                    }}>Java 8 runtime maintained throughout — no JDK changes introduced alongside the framework upgrade</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5 — OUTCOME & ENABLEMENT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '0.8rem',
                            color: '#8ff0ff',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}>
                            OUTCOME &amp; ENABLEMENT
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
                                The upgrade delivered a modernized security foundation on an approved runtime. Spring Security 5.7 component-based configuration replaced the deprecated adapter pattern, resulting in a cleaner and more maintainable security layer.
                            </p>
                            <p style={{ margin: 0 }}>
                                Critically, the upgrade directly enabled the subsequent dual-authentication implementation — the oauth2ResourceServer() DSL available in Spring Boot 2.7.x was the specific capability required to add OAuth2/JWT support alongside the existing LDAP authentication path.
                            </p>
                            <button
                                onClick={() => onNavigate && onNavigate('Dual-Auth REST API (OAuth2 + LDAP)')}
                                style={{
                                    fontFamily: "'Share Tech Mono', monospace",
                                    fontSize: '0.8rem',
                                    color: '#c8a96e',
                                    background: 'rgba(200, 169, 110, 0.06)',
                                    border: '1px solid rgba(200, 169, 110, 0.3)',
                                    padding: '0.6rem 1rem',
                                    cursor: 'pointer',
                                    letterSpacing: '0.08em',
                                    textAlign: 'left',
                                    width: '100%',
                                    marginTop: '0.5rem',
                                    transition: 'background 200ms, border-color 200ms',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(200, 169, 110, 0.12)'
                                    e.currentTarget.style.borderColor = 'rgba(200, 169, 110, 0.6)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(200, 169, 110, 0.06)'
                                    e.currentTarget.style.borderColor = 'rgba(200, 169, 110, 0.3)'
                                }}
                            >
                                → This upgrade is the direct prerequisite of the Dual-Auth REST API case study · Click to view ▸
                            </button>
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
                                The decision to treat this as a two-phase delivery — upgrade first, then implement OAuth2 — was deliberate. Combining both changes into a single effort would have made it significantly harder to isolate the source of any failures during testing or deployment.
                            </p>
                            <p style={{ margin: 0 }}>
                                Sequencing the Spring Boot upgrade as a discrete deliverable meant the LDAP authentication path could be validated as stable on the new framework before any new authentication mechanism was introduced. This reduced risk and made the subsequent OAuth2 implementation a controlled, isolated change.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
