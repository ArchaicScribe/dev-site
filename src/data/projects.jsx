import PaymentCardDiagram from '../components/diagrams/PaymentCardDiagram'
import DualAuthDiagram from '../components/diagrams/DualAuthDiagram'
import SpringModernizationDiagram from '../components/diagrams/SpringModernizationDiagram'
import CICDPipelineDiagram from '../components/diagrams/CICDPipelineDiagram'

export const projects = [
  {
    id: 'payment-card-default',
    title: 'Payment Card Default Management',
    status: 'WIP',
    tags: ['Java 8', 'Spring Boot', 'CSS', 'REST API', 'Full-Stack'],
    description: 'Full-stack feature allowing associates to update a customer\'s default payment card, including UI, a new Payment Processing Service endpoint, and downstream credit card processor integration. Optimistic UI updates with async DB persistence.',
    fullCaseStudy: {
      problem: 'Associates had no way to update a customer\'s default payment card through the internal tooling. The system had no endpoint to handle this operation, no UI to surface it, and no downstream integration to persist the change through to the credit card processor.',
      decision: 'Built the complete vertical slice: associate-facing UI with optimistic updates and two distinct modal flows, a new PUT endpoint in the Payment Processing Service with LDAP auth, validation and logging, and downstream integration to the credit card processor with async DB persistence.',
      outcome: 'Feature currently under active development. UI layer and Payment Processing endpoint complete. Downstream integration and async confirmation flow in progress. Default tag renders correctly and DB persistence confirmed in dev environment.',
    },
    diagram: <PaymentCardDiagram />,
  },
  {
    title: "Enterprise Java \u2192 Spring Boot Modernization",
    description: "Refactored a core Java 8 enterprise service into Spring Boot 2.7.14 and Spring Cloud under strict production uptime requirements. Focused on resilience, observability, and long-term maintainability.",
    status: "LIVE",
    tags: ["Java", "Spring Boot", "Spring Cloud", "SLF4J"],
    category: "Languages",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "A core production service written in Java 8 had accumulated years of technical debt: tightly coupled logic, poor observability, and no clear failure boundaries. Any change carried significant uptime risk.",
      decision: "Chose an incremental modernization path into Spring Boot 2.7.14 and Spring Cloud rather than a full rewrite, preserving business logic while introducing structured resilience patterns, proper logging via SLF4J/Logback, and clear service boundaries.",
      outcome: "Delivered a maintainable, observable service under strict uptime SLAs with zero production incidents during migration. Logging improvements cut mean time to diagnose production issues significantly.",
    },
    diagram: <SpringModernizationDiagram />,
  },
  {
    title: "Dual-Auth REST API (OAuth2 + LDAP)",
    description: "Designed and implemented secure REST APIs with dual authentication via OAuth2/JWT and LDAP/LDAPS using Spring Security filter chains. Built to meet enterprise security controls in a production environment.",
    status: "LIVE",
    tags: ["Spring Security", "OAuth2", "JWT", "LDAP"],
    category: "Tools",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "The system needed to support two distinct authentication paths simultaneously: modern token-based OAuth2/JWT for API consumers and legacy LDAP/LDAPS for enterprise directory integration, without duplicating security logic or weakening either path.",
      decision: "Implemented dual Spring Security filter chains, each scoped to its authentication mechanism, with shared authorization rules applied downstream. Kept the chains independently testable and aligned to existing enterprise security controls.",
      outcome: "Delivered a production-grade dual-auth system with no security exceptions raised during enterprise review. The filter chain architecture was later referenced as the internal standard for new services.",
    },
    diagram: <DualAuthDiagram />,
  },
  {
    id: 'cats-clearance-system',
    title: 'CATS \u2014 Clearance Action Tracking System',
    status: 'LIVE',
    tags: ['C#', '.NET', 'Blazor', 'SQL Server', 'Federal'],
    description: 'Developed and maintained a large-scale federal web application tracking candidates through the government security clearance process (spanning L through Top Secret and above) under strict compliance and regulatory requirements. Built with C#/.NET, Blazor, and SQL Server for a federal contracting firm.',
    fullCaseStudy: {
      problem: 'CATS is a mission-critical web application managing the full lifecycle of government security clearance acquisition across multiple clearance levels, from L clearance through Top Secret and above. The system serves multiple federal agencies and must meet strict regulatory and compliance requirements at every layer. Maintaining reliability and correctness in this environment is non-negotiable; errors directly affect personnel and national security workflows.',
      decision: 'Joined a federal contracting firm as a junior software engineer and contributed to CATS over two years, progressing from bug resolution to feature development and broader system ownership. Worked across the full stack: C#/.NET backend, Blazor front-end, HTML/CSS, and SQL Server via SSMS. Every change required adherence to federal compliance standards and security regulations governing the handling of clearance data. Implementation details remain confidential in accordance with federal contractor obligations.',
      outcome: 'Delivered consistent contributions to a large, compliance-grade federal system over two years. Progressed from resolving defects to owning feature development across multiple system areas. Gained Q-level security clearance (the Department of Energy equivalent of Top Secret), reflecting the trust and access required to work on systems of this sensitivity. The system continues to serve federal agencies managing clearance workflows across multiple classification levels. Its architecture reflected strict data segregation and audit requirements mandated by federal security frameworks; constraints that shaped every technical decision made during development.',
    },
  },
  {
    title: "Azure DevOps CI/CD Pipeline \u2014 Greenfield Build",
    description: "Designed and delivered CI/CD pipelines from zero for two .NET applications. Established multi-environment promotion with test gates, approval workflows, and identified a Microsoft platform bug and escalated it directly to their engineering team for resolution.",
    status: "ARCHIVED",
    tags: ["Azure DevOps", "CI/CD", ".NET/C#", "Unit Testing", "Integration Testing"],
    category: "Infrastructure",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem: "Two .NET applications across separate business domains had no CI/CD pipelines in place. All deployments were performed manually, with no test automation or environment promotion logic.",
      decision: "Built two independent pipeline tracks in Azure DevOps (one per application) with a consistent three-environment model: Dev (auto-deploy on merge, unit tests), Staging (integration tests, approval gate), and Production (manual approval). PR gates at the source control level enforced quality before any code reached the pipeline.",
      outcome: "Delivered fully automated deployments with test gates at every stage. During the engagement, a Microsoft Azure DevOps platform bug was identified and escalated directly to their engineering team. The issue was resolved and the pipelines completed without further platform issues. Zero manual deployments remained after handoff.",
    },
    diagram: <CICDPipelineDiagram />,
  },
]
