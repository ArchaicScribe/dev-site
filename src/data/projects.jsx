import DualAuthDiagram from '../components/diagrams/DualAuthDiagram'
import SpringModernizationDiagram from '../components/diagrams/SpringModernizationDiagram'

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
    title: "Kubernetes Service Deployment (Rancher)",
    description:
      "Deployed and operated Dockerized Spring Boot services in Kubernetes via Rancher, backed by Oracle DBMS. Supported CI/CD workflows through GitHub PR-gated pipelines.",
    status: "LIVE",
    tags: ["Docker", "Kubernetes", "Oracle DB", "CI/CD"],
    category: "Infrastructure",
    featured: false,
    githubRepo: "",
    liveUrl: "",
    fullCaseStudy: {
      problem:
        "Services needed to move from manual deployment processes into a reliable, repeatable Kubernetes-based workflow — while maintaining database integrity against a production Oracle DBMS and keeping CI/CD gates strict enough to catch issues before merge.",
      decision:
        "Containerized services with Docker, deployed via Rancher-managed Kubernetes with environment-specific config separation. PR-gated pipelines in GitHub enforced build and validation checks before any merge to main, with Postman/Insomnium collections used for API contract validation.",
      outcome:
        "Achieved consistent, repeatable deployments with full rollback capability. PR gate enforcement eliminated an entire category of environment-specific bugs that had previously reached staging.",
    },
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
