import PaymentCardDiagram from '../components/diagrams/PaymentCardDiagram'
import DualAuthDiagram from '../components/diagrams/DualAuthDiagram'
import SpringModernizationDiagram from '../components/diagrams/SpringModernizationDiagram'
import CICDPipelineDiagram from '../components/diagrams/CICDPipelineDiagram'

export const projects = [
  {
    id: 'multi-agent-modernization',
    title: 'Multi-Agent Legacy Code Modernization System',
    status: 'WIP',
    tags: ['C#', 'Semantic Kernel', 'Claude API', 'Roslyn', 'AI Agents'],
    description: 'Designing a multi-agent AI system that helps enterprise teams analyze legacy codebases for anti-patterns, security vulnerabilities, and modernization opportunities. Built with C# and Semantic Kernel, using specialized agents for anti-pattern detection, security auditing, design pattern advisory, and clean code review.',
    fullCaseStudy: {
      problem: 'Legacy code modernization is slow, inconsistent, and expensive. Manual code reviews miss patterns that span large codebases, and individual reviewers bring biases toward the patterns they know. A single AI agent lacks the specialization to cover anti-patterns, security, design patterns, and clean code simultaneously.',
      decision: 'Chose a multi-agent architecture over a single monolithic AI analyzer. Each agent specializes in one domain (anti-patterns, security, design patterns, clean code) and reports to an orchestrator that synthesizes recommendations. Selected C# with Semantic Kernel over Python/LangChain for type safety and enterprise ecosystem alignment. Using Roslyn for C# AST parsing and JavaParser for Java, giving agents structural code understanding rather than raw text analysis.',
      outcome: 'Architecture defined and in active development. Agent specialization model validated through prototype testing. Blog post documenting the architectural reasoning forthcoming.',
    },
  },
  {
    id: 'payment-card-default',
    title: 'Payment Card Default Management',
    status: 'WIP',
    tags: ['Java 8', 'Spring Boot', 'REST API', 'Enterprise Tooling', 'Vertical Slice'],
    description: 'Architected a vertical-slice feature for Fortune 50 enterprise tooling, enabling internal operations associates to update customer default payment cards. Designed the end-to-end architecture: UI with optimistic updates, authenticated REST endpoint, and async downstream processor integration.',
    fullCaseStudy: {
      problem: 'Operations associates at a Fortune 50 client had no way to update a customer\'s default payment card through internal tooling. The gap forced manual workarounds that introduced errors and slowed resolution times. The system had no endpoint, no UI, and no downstream integration to handle this operation.',
      decision: 'Evaluated two approaches: extending an existing batch-oriented service, or designing a dedicated vertical slice with its own endpoint and UI. The batch approach was lower effort but introduced latency the operations team could not tolerate - associates needed real-time confirmation. Chose a vertical slice architecture with optimistic UI updates (immediate visual feedback while async persistence completes downstream), two distinct modal flows for different card scenarios, and a new REST endpoint with authentication and validation. The trade-off was more upfront development in exchange for a responsive, self-contained feature that could ship and be tested independently.',
      outcome: 'Feature in active development. UI layer and service endpoint complete. Downstream processor integration and async confirmation flow in progress. Default tag renders correctly and DB persistence confirmed in dev environment.',
    },
    diagram: <PaymentCardDiagram />,
  },
  {
    title: "Enterprise Java to Spring Boot Modernization",
    description: "Led architectural modernization of a core Java 8 enterprise service into Spring Boot 2.7.14 and Spring Cloud under strict production uptime requirements. Focused on resilience patterns, observability, and long-term maintainability.",
    status: "LIVE",
    tags: ["Java", "Spring Boot", "Spring Cloud", "Migration Architecture"],
    category: "Languages",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "A core production service written in Java 8 had accumulated years of technical debt: tightly coupled logic, poor observability, and no clear failure boundaries. Any change carried significant uptime risk.",
      decision: "Evaluated two paths: a full ground-up rewrite in Spring Boot 3.x, or an incremental migration to Spring Boot 2.7.14 preserving existing business logic. The rewrite offered a cleaner codebase but carried 4-6 months of parallel development risk and required revalidating every business rule. Chose incremental modernization to maintain zero-downtime SLAs while introducing structured resilience patterns, SLF4J/Logback observability, and clear service boundaries progressively. The trade-off was accepting some legacy patterns in exchange for continuous production stability.",
      outcome: "Delivered a maintainable, observable service under strict uptime SLAs with zero production incidents during migration. Logging improvements cut mean time to diagnose production issues significantly.",
    },
    diagram: <SpringModernizationDiagram />,
  },
  {
    title: "Dual-Auth REST API (OAuth2 + LDAP)",
    description: "Designed secure REST APIs with dual authentication via OAuth2/JWT and LDAP/LDAPS using parallel Spring Security filter chains. Architected to meet enterprise security controls with shared authorization and zero security exceptions in review.",
    status: "LIVE",
    tags: ["Spring Security", "OAuth2", "JWT", "LDAP"],
    category: "Tools",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "The system needed to support two distinct authentication paths simultaneously: modern token-based OAuth2/JWT for API consumers and legacy LDAP/LDAPS for enterprise directory integration, without duplicating security logic or weakening either path.",
      decision: "Evaluated three approaches: (1) a single unified auth chain handling both mechanisms, (2) separate API surfaces per auth type, or (3) parallel Spring Security filter chains with shared downstream authorization. Option 1 risked coupling failure modes between auth types. Option 2 doubled the API surface and maintenance cost. Chose parallel filter chains because each auth path could fail, scale, and be tested independently while sharing authorization rules. This kept the security model auditable and aligned to existing enterprise security controls without duplication.",
      outcome: "Delivered a production-grade dual-auth system with no security exceptions raised during enterprise review. The filter chain architecture was later referenced as the internal standard for new services.",
    },
    diagram: <DualAuthDiagram />,
  },
  {
    title: "Azure DevOps CI/CD Pipeline - Greenfield Build",
    description: "Designed and delivered CI/CD pipelines from zero for two .NET applications. Led test automation integration across all pipeline stages, established multi-environment promotion with automated test gates and approval workflows, and identified a Microsoft platform bug escalated directly to their engineering team.",
    status: "ARCHIVED",
    tags: ["Azure DevOps", "CI/CD", ".NET/C#", "Unit Testing", "Integration Testing"],
    category: "Infrastructure",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "Two .NET applications across separate business domains had no CI/CD pipelines in place. All deployments were performed manually, with no test automation or environment promotion logic.",
      decision: "Designed two independent pipeline tracks in Azure DevOps with a consistent three-environment model: Dev (auto-deploy on merge, unit tests), Staging (integration tests, approval gate), and Production (manual approval). Evaluated whether to share a single pipeline template across both apps or build independently. Chose independent pipelines because the two applications had different test profiles and deployment cadences - a shared template would have forced artificial coupling. Led the integration of automated test suites at every stage, with PR gates enforcing quality before code reached the pipeline.",
      outcome: "Delivered fully automated deployments with test gates at every stage, eliminating all manual releases after handoff. The test automation integration gave the team confidence to ship faster without sacrificing quality. During the engagement, a Microsoft Azure DevOps platform bug was identified, reproduced, and escalated directly to their engineering team - resolved without delaying delivery.",
    },
    diagram: <CICDPipelineDiagram />,
  },
]
