import DualAuthDiagram from '../components/diagrams/DualAuthDiagram'
import SpringModernizationDiagram from '../components/diagrams/SpringModernizationDiagram'
import CICDPipelineDiagram from '../components/diagrams/CICDPipelineDiagram'

export const projects = [
  {
    title: "Federal C#/.NET Backend Modernization (DoE)",
    description:
      "Maintained and extended mission-critical C#/.NET and SQL Server applications in a security-sensitive federal environment. Delivered backend features and stored procedures under strict compliance and reliability standards.",
    status: "LIVE",
    tags: ["C#", ".NET", "SQL Server", "REST APIs"],
    category: "Languages",
    featured: true,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "Legacy C#/.NET applications serving a federal Department of Energy environment had grown brittle over time — stored procedures were untested, backend features lacked consistent error handling, and releases carried high regression risk.",
      decision:
        "Prioritized hardening over rewriting: introduced structured backend features with consistent exception handling, rewrote critical stored procedures with explicit transaction boundaries, and participated in code reviews to enforce reliability standards before every release.",
      outcome:
        "Improved release confidence and compliance posture in a zero-tolerance security environment. Established consistent code review practices that reduced regression incidents across the team.",
    },
  },
  {
    title: "Enterprise Java → Spring Boot Modernization",
    description:
      "Refactored a core Java 8 enterprise service into Spring Boot 2.7.14 and Spring Cloud under strict production uptime requirements. Focused on resilience, observability, and long-term maintainability.",
    status: "LIVE",
    tags: ["Java", "Spring Boot", "Spring Cloud", "SLF4J"],
    category: "Languages",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "A core production service written in Java 8 had accumulated years of technical debt — tightly coupled logic, poor observability, and no clear failure boundaries. Any change carried significant uptime risk.",
      decision:
        "Chose an incremental modernization path into Spring Boot 2.7.14 and Spring Cloud rather than a full rewrite, preserving business logic while introducing structured resilience patterns, proper logging via SLF4J/Logback, and clear service boundaries.",
      outcome:
        "Delivered a maintainable, observable service under strict uptime SLAs with zero production incidents during migration. Logging improvements cut mean time to diagnose production issues significantly.",
    },
    diagram: <SpringModernizationDiagram />,
  },
  {
    title: "Dual-Auth REST API (OAuth2 + LDAP)",
    description:
      "Designed and implemented secure REST APIs with dual authentication via OAuth2/JWT and LDAP/LDAPS using Spring Security filter chains. Built to meet enterprise security controls in a production environment.",
    status: "LIVE",
    tags: ["Spring Security", "OAuth2", "JWT", "LDAP"],
    category: "Tools",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "The system needed to support two distinct authentication paths simultaneously — modern token-based OAuth2/JWT for API consumers and legacy LDAP/LDAPS for enterprise directory integration — without duplicating security logic or weakening either path.",
      decision:
        "Implemented dual Spring Security filter chains, each scoped to its authentication mechanism, with shared authorization rules applied downstream. Kept the chains independently testable and aligned to existing enterprise security controls.",
      outcome:
        "Delivered a production-grade dual-auth system with no security exceptions raised during enterprise review. The filter chain architecture was later referenced as the internal standard for new services.",
    },
    diagram: <DualAuthDiagram />,
  },
  {
    title: "Azure DevOps CI/CD Pipeline — Greenfield Build",
    description:
      "Designed and delivered CI/CD pipelines from zero for two .NET applications. Established multi-environment promotion with test gates, approval workflows, and identified a Microsoft platform bug escalated directly to their engineering team.",
    status: "ARCHIVED",
    tags: ["Azure DevOps", "CI/CD", ".NET/C#", "Unit Testing", "Integration Testing"],
    category: "Infrastructure",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "Two .NET applications — a customer-facing e-commerce storefront and an internal inventory management system — had no CI/CD pipelines in place. All deployments were performed manually, with no test automation or environment promotion logic.",
      decision:
        "Built two independent pipeline tracks in Azure DevOps — one per application — with a consistent three-environment model: Dev (auto-deploy on merge, unit tests), Staging (integration tests, approval gate), and Production (manual approval). PR gates at the source control level enforced quality before any code reached the pipeline.",
      outcome:
        "Delivered fully automated deployments with test gates at every stage. During the engagement, a Microsoft Azure DevOps platform bug was identified and escalated directly to their engineering team — the issue was resolved and the pipelines completed without further platform issues. Zero manual deployments remained after handoff.",
    },
    diagram: <CICDPipelineDiagram />,
  },
  {
    title: "Azure DevOps Test Automation Pipeline",
    description:
      "Led integration of JUnit 5 and Mockito test suites into Azure DevOps CI/CD pipelines. Reduced manual QA overhead and strengthened release confidence across the team.",
    status: "LIVE",
    tags: ["Azure DevOps", "JUnit 5", "Mockito", "CI/CD"],
    category: "Infrastructure",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "Releases depended heavily on manual QA cycles that were slow, inconsistent, and unable to scale with the team's output. Test coverage existed but was not integrated into the delivery pipeline.",
      decision:
        "Led the effort to wire existing JUnit 5 and Mockito test suites directly into Azure DevOps YAML pipelines as a required gate, with test results surfaced in the pipeline dashboard. Prioritized zero-friction adoption so the team wouldn't route around it.",
      outcome:
        "Manual QA cycles reduced substantially. Pipeline-enforced test gates caught regressions before they reached staging, and the team gained visibility into coverage trends over time.",
    },
  },
  {
    title: "Internal React/TypeScript Developer Tooling",
    description:
      "Rebuilt brittle internal tooling as a modern React/TypeScript frontend. Improved team workflows and replaced a legacy interface that had become a daily friction point.",
    status: "LIVE",
    tags: ["React", "TypeScript"],
    category: "Tools",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "An internal tool used daily by the engineering team had grown unmaintainable — slow to load, hard to modify, and actively slowing down developer workflows every day.",
      decision:
        "Rebuilt from scratch in React and TypeScript with a focus on fast load time, clear component boundaries, and zero external UI library dependencies to keep the bundle lean and maintainable long-term.",
      outcome:
        "Delivered a tool the team actually wanted to use. Eliminated the daily friction point and reduced the time developers spent working around the old interface.",
    },
  },
]
