import { motion } from 'framer-motion'
import { fadeUpVariants, viewportConfig, transition } from '../constants/animationVariants'
import DualAuthDiagram from './diagrams/DualAuthDiagram'

function CaseStudyRow({ label, children, goldAccent = false }) {
  const accentColor = goldAccent ? '#c8a96e' : '#4fc3dc'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      marginBottom: '2.5rem',
      alignItems: 'flex-start',
    }}>
      {/* Left column - label */}
      <div style={{
        width: '110px',
        flexShrink: 0,
        position: 'relative',
        paddingLeft: '1rem',
      }}>
        {/* Vertical accent line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: '100%',
          background: accentColor,
          opacity: 0.6,
        }} />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: accentColor,
          fontSize: '0.68rem',
          letterSpacing: '0.12em',
          lineHeight: 1.4,
          marginTop: '2px',
          display: 'block',
        }}>
          {label}
        </span>
      </div>

      {/* Right column - content */}
      <div style={{
        flex: 1,
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 300,
        color: '#eef4f8',
        fontSize: '0.95rem',
        lineHeight: 1.75,
      }}>
        {children}
      </div>
    </div>
  )
}

function ComparisonTable() {
  const rows = [
    {
      approach: 'Single unified filter chain',
      rejected: 'Would tightly couple OAuth2 and LDAP logic, making each harder to test, modify, or extend independently',
    },
    {
      approach: 'Separate authentication microservices',
      rejected: 'Introduced unnecessary network latency and operational overhead for a problem solvable within a single service boundary',
    },
    {
      approach: 'Custom authentication provider only',
      rejected: "Spring Security's built-in filter chain infrastructure offered better maintainability and alignment with existing team conventions",
    },
  ]

  return (
    <div style={{
      border: '1px solid rgba(79, 195, 220, 0.12)',
      width: '100%',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(79, 195, 220, 0.06)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '0.6rem 1rem',
        borderBottom: '1px solid rgba(79, 195, 220, 0.12)',
      }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: '#6a8a9a',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
        }}>APPROACH</span>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          color: '#6a8a9a',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
        }}>REJECTED BECAUSE</span>
      </div>

      {/* Data rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            padding: '0.75rem 1rem',
            gap: '1.5rem',
            borderBottom: index < rows.length - 1 ? '1px solid rgba(79, 195, 220, 0.06)' : 'none',
            background: index % 2 === 1 ? 'rgba(79, 195, 220, 0.02)' : 'transparent',
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 300,
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#a8d8e8' }}>{row.approach}</span>
          <span style={{ color: '#eef4f8' }}>{row.rejected}</span>
        </div>
      ))}
    </div>
  )
}

function TradeoffPoint({ children, gold = false }) {
  const color = gold ? '#c8a96e' : '#4fc3dc'
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '0.6rem',
      marginBottom: '0.6rem',
      alignItems: 'flex-start',
    }}>
      <span style={{
        color,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '1rem',
        lineHeight: 1.4,
        flexShrink: 0,
      }}>›</span>
      <span style={{
        fontFamily: "'Exo 2', sans-serif",
        fontWeight: 300,
        color: '#eef4f8',
        fontSize: '0.875rem',
        lineHeight: 1.6,
      }}>{children}</span>
    </div>
  )
}

function MetadataChip({ label, value }) {
  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.72rem',
      lineHeight: 1.6,
    }}>
      <span style={{ color: '#6a8a9a' }}>{label} </span>
      <span style={{ color: '#a8d8e8' }}>{value}</span>
    </span>
  )
}

export default function SystemsDesign() {
  return (
    <section
      id="systems-design"
      style={{
        background: '#070d14',
        padding: '6rem 2rem',
        width: '100%',
      }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          {/* Eyebrow */}
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            color: '#6a8a9a',
            fontSize: '0.78rem',
            letterSpacing: '0.14em',
            display: 'block',
            marginBottom: '0.75rem',
          }}>
            {'// DEEP DIVE'}
          </span>

          {/* Accent rule */}
          <div style={{
            width: '40px',
            height: '2px',
            background: '#4fc3dc',
            marginBottom: '1rem',
          }} />

          {/* Heading */}
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 600,
            color: '#eef4f8',
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
            margin: 0,
            marginBottom: '0.75rem',
          }}>
            SYSTEMS DESIGN
          </h2>

          {/* Subheading */}
          <p style={{
            fontFamily: "'Exo 2', sans-serif",
            fontWeight: 300,
            color: '#b0c8d8',
            fontSize: '1rem',
            margin: 0,
            marginBottom: '3rem',
          }}>
            Architectural decisions, tradeoffs, and production outcomes from real enterprise systems.
          </p>
        </div>

        {/* Case Study Card */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={transition}
          style={{
            background: '#0f1e2e',
            border: '1px solid rgba(79, 195, 220, 0.12)',
            borderLeft: '4px solid #4fc3dc',
            borderRadius: 0,
            padding: '2.5rem',
            width: '100%',
          }}
        >
          {/* Card Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 600,
              color: '#eef4f8',
              fontSize: '1.3rem',
              letterSpacing: '0.06em',
              margin: 0,
            }}>
              DUAL-AUTH REST API
            </h3>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(79, 195, 220, 0.08)',
              border: '1px solid rgba(79, 195, 220, 0.35)',
              borderRadius: 0,
              padding: '0.3rem 0.85rem',
              fontFamily: "'Share Tech Mono', monospace",
              color: '#4fc3dc',
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
            }}>
              Fortune 50 Enterprise · Spring Security · Production
            </span>
          </div>

          {/* ROW 1 — PROBLEM */}
          <CaseStudyRow label="PROBLEM">
            <p style={{ margin: 0 }}>
              A Fortune 50 enterprise client required a single API surface
              capable of authenticating two fundamentally different user
              populations simultaneously. Modern application consumers
              authenticated via OAuth2/JWT bearer tokens. Internal enterprise
              users authenticated through legacy LDAP/LDAPS directory services.
              The constraint: both paths had to coexist without coupling their
              logic, weakening either mechanism, or requiring changes to the
              client's existing directory infrastructure.
            </p>
          </CaseStudyRow>

          {/* ROW 2 — CONSIDERED */}
          <CaseStudyRow label="CONSIDERED">
            <ComparisonTable />
          </CaseStudyRow>

          {/* ROW 3 — DECISION */}
          <CaseStudyRow label="DECISION">
            <p style={{ margin: 0, marginBottom: '2rem' }}>
              Implemented two independent Spring Security filter chains
              within a single service — each scoped exclusively to its
              authentication mechanism with no shared state between them.
              Both chains converged at a common downstream authorization
              layer where role, scope, and permission checks were applied
              uniformly regardless of how the caller authenticated. This
              preserved the integrity of each auth path while eliminating
              duplicated authorization logic.
            </p>

            {/* Diagram wrapper */}
            <div style={{
              background: '#070d14',
              border: '1px solid rgba(79, 195, 220, 0.12)',
              padding: '2rem 1rem 1.5rem',
              marginTop: '0.5rem',
            }}>
              <DualAuthDiagram />

              {/* Caption */}
              <div style={{
                textAlign: 'center',
                marginTop: '1rem',
                fontFamily: "'Share Tech Mono', monospace",
                color: '#6a8a9a',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
              }}>
                FIG. 1 — DUAL FILTER CHAIN ARCHITECTURE · SPRING SECURITY
              </div>
            </div>
          </CaseStudyRow>

          {/* ROW 4 — TRADEOFFS */}
          <CaseStudyRow label="TRADEOFFS" goldAccent={true}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {/* Left panel - What this gave us */}
              <div style={{
                background: 'rgba(79, 195, 220, 0.04)',
                border: '1px solid rgba(79, 195, 220, 0.15)',
                padding: '1.25rem',
                borderRadius: 0,
              }}>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: '#4fc3dc',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                }}>
                  WHAT THIS GAVE US
                </div>
                <TradeoffPoint>Independent testability of each authentication path</TradeoffPoint>
                <TradeoffPoint>Zero coupling between OAuth2 and LDAP logic</TradeoffPoint>
                <TradeoffPoint>Single authorization layer — no duplicated rules</TradeoffPoint>
                <TradeoffPoint>Clean extension points for future auth mechanisms</TradeoffPoint>
              </div>

              {/* Right panel - What I'd revisit */}
              <div style={{
                background: 'rgba(200, 169, 110, 0.04)',
                border: '1px solid rgba(200, 169, 110, 0.2)',
                padding: '1.25rem',
                borderRadius: 0,
              }}>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  color: '#c8a96e',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                }}>
                  WHAT I'D REVISIT
                </div>
                <TradeoffPoint gold>
                  At significantly higher scale, externalizing auth to a dedicated identity service would reduce per-service complexity
                </TradeoffPoint>
                <TradeoffPoint gold>
                  LDAP connection pooling required careful tuning under load — defaults were insufficient for enterprise directory size
                </TradeoffPoint>
                <TradeoffPoint gold>
                  A third auth mechanism would require a third chain — a strategy pattern would scale better beyond two paths
                </TradeoffPoint>
              </div>
            </div>
          </CaseStudyRow>

          {/* ROW 5 — OUTCOME */}
          <CaseStudyRow label="OUTCOME">
            <p style={{ margin: 0 }}>
              Delivered to production with zero security exceptions raised
              during enterprise review. The dual filter chain architecture
              was subsequently adopted as the internal standard for new API
              services at the engagement. The separation of concerns proved
              its value immediately — when LDAP connection parameters
              required adjustment post-deployment, the change was isolated
              entirely to the LDAP chain with no risk to the OAuth2 path.
            </p>
          </CaseStudyRow>

          {/* Separator */}
          <div style={{
            height: '1px',
            background: 'rgba(79, 195, 220, 0.08)',
            margin: '0.5rem 0 1.25rem',
          }} />

          {/* Metadata row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <MetadataChip label="ENVIRONMENT" value="Production" />
            <MetadataChip label="STACK" value="Spring Boot 2.7 · Spring Security · OAuth2 · LDAP/LDAPS" />
            <MetadataChip label="OUTCOME" value="Zero security exceptions · Adopted as internal standard" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
