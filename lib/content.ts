import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Gauge,
  Layers3,
  Network,
  ShieldCheck,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Ron Quah",
  initials: "RQ",
  role: "Software Engineer",
  headline: "Agent platforms, data infrastructure, and reliable software systems.",
  location: "Singapore",
  email: "e1156664@u.nus.edu",
  phone: "+65 9100 7628",
  linkedin: "http://www.linkedin.com/in/ron-quah-950922262",
  github: "https://github.com/salads-source",
  cvPath: "/Ron_Quah_Tech_Resume.pdf"
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

export const heroStats = [
  { label: "Engineer effort reduced", value: "60%" },
  { label: "Task instances supported daily", value: "1M+" },
  { label: "Manual review time reduced", value: "40%" }
];

export const about = [
  "Computer Science student at the National University of Singapore, building agent platforms, backend infrastructure, data products, and production web systems.",
  "Recent work spans multi-agent orchestration, Kafka and ClickHouse log ingestion, Spring Boot services, Redis-backed fault tolerance, Spark and Presto data-quality tooling, and React/Next.js applications."
];

export const experience = [
  {
    company: "Google",
    role: "Software Engineer Intern",
    location: "Singapore",
    date: "May 2026 - August 2026",
    stack: ["Python", "RPC", "Agent Development Kit"],
    bullets: [
      "Architected and implemented a multi-agent orchestration platform using Agent Development Kit to automate documentation maintenance across large-scale codebases, reducing engineer effort by 60% through agent-generated pull requests requiring human review.",
      "Extended Agent Development Kit with custom agent tool wrappers over internal services, making reusable secure agent tooling available to 80+ engineering teams.",
      "Designed an agent evaluation framework using autoraters, golden datasets, deterministic trajectory matching, and LLM-as-a-judge evaluation to validate safe tool execution and semantic correctness."
    ]
  },
  {
    company: "Shopee",
    role: "Backend Engineer Intern, Data Platform",
    location: "Singapore",
    date: "December 2025 - April 2026",
    stack: ["Spring", "Kafka", "Redis", "Grafana", "ClickHouse", "Kubernetes"],
    bullets: [
      "Designed and implemented a distributed log storage pipeline using Kafka and ClickHouse, mapping Kafka partitions to ClickHouse shards, configuring ReplicatedMergeTree replicas, and defining partition and sort keys for efficient time-range queries supporting 1M+ task instances daily.",
      "Improved data quality service reliability by instrumenting Grafana JVM and workload monitoring and tuning thread pools, queue capacity, and concurrency limits, reducing memory usage by 30%.",
      "Built a centralised self-service dashboard for configuring Spark and Presto data-quality compute resources with ownership-based access control and workload settings for CPU, memory, and concurrency."
    ]
  },
  {
    company: "Binance",
    role: "Software Engineer Intern, Global KYC",
    location: "Singapore",
    date: "May 2025 - November 2025",
    stack: ["Spring", "MySQL", "Kafka", "Redis", "TestNG"],
    bullets: [
      "Designed and implemented a scalable Spring Boot microservice for a multi-stage document verification pipeline, orchestrating OCR extraction and LLM-based compliance checks with RAG-driven jurisdiction rules to generate explainable pass/fail previews and reduce manual review time by 40%.",
      "Engineered a fault-tolerant Kafka fallback mechanism using Redis as temporary persistence during broker unavailability and ZooKeeper leader re-election, enabling reliable recovery and reprocessing after cluster stabilisation."
    ]
  },
  {
    company: "Reform DAO",
    role: "Junior Developer",
    location: "Remote",
    date: "November 2024 - May 2025",
    stack: ["React", "Express.js", "Tailwind", "JavaScript", "TanStack Query", "TanStack Table"],
    bullets: [
      "Built full-stack airdrop features connecting React interfaces with Express.js APIs for peak usage of up to 3,000 users.",
      "Architected data-driven dashboards with TanStack Query caching and TanStack Table presentation for responsive frontend data handling."
    ]
  },
  {
    company: "Classpoint",
    role: "Frontend Developer Intern",
    location: "Singapore",
    date: "July 2024 - September 2024",
    stack: ["React", "Next.js", "Tailwind", "JavaScript"],
    bullets: [
      "Architected responsive React and Next.js interfaces with reusable component hierarchies and Tailwind-based design systems.",
      "Delivered 10+ production pages in partnership with product and backend teams.",
      "Reduced initial bundle pressure through dynamic imports, lazy loading, and code splitting."
    ]
  },
];

export const projects = [
  {
    title: "Distributed Log Storage Pipeline",
    context: "Shopee Data Platform",
    description:
      "Kafka and ClickHouse ingestion system with ReplicatedMergeTree, partitioning, sharding, and replication for high-volume task logs.",
    impact: "Supported log ingestion for 1M+ task instances daily.",
    icon: Database,
    visual: "log-pipeline"
  },
  {
    title: "Agent Documentation Orchestration",
    context: "Google Software Engineering",
    description:
      "Multi-agent platform using Agent Development Kit, internal service wrappers, pull-request workflows, and evaluation datasets to automate documentation maintenance.",
    impact: "Reduced engineer effort by 60% and served 80+ engineering teams.",
    icon: BrainCircuit,
    visual: "agent-orchestration"
  },
  {
    title: "KYC Document Verification Service",
    context: "Binance Global KYC",
    description:
      "Spring Boot microservice coordinating OCR extraction, LLM compliance checks, Redis-backed Kafka recovery, and RAG-driven jurisdiction rules.",
    impact: "Reduced manual compliance review time by 40%.",
    icon: ShieldCheck,
    visual: "kyc-pipeline"
  },
  {
    title: "Data Quality Control Dashboard",
    context: "Shopee Data Platform",
    description:
      "Self-service dashboard for Spark and Presto compute settings with ownership-based access control, workload governance, and resource configuration.",
    impact: "Made CPU, memory, and concurrency controls visible to authorised owners.",
    icon: Cloud,
    visual: "data-quality"
  }
] as const;

export const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    items: ["Python", "JavaScript", "Java", "Golang", "TypeScript", "HTML/CSS", "SQL (PostgreSQL, MySQL)", "MongoDB", "ClickHouse"]
  },
  {
    label: "Frameworks",
    icon: Layers3,
    items: ["React", "Next.js", "Spring Boot", "Express.js", "TensorFlow", "PyTorch", "Spark"]
  },
  {
    label: "Data & Infra",
    icon: Network,
    items: ["Apache Kafka", "Apache Spark", "Redis", "Firebase", "ClickHouse", "Grafana", "GCP", "AWS"]
  },
  {
    label: "Developer Tools",
    icon: Workflow,
    items: ["VS Code", "Docker", "GitHub", "Jest"]
  },
  {
    label: "Systems & Platforms",
    icon: Gauge,
    items: ["RPC", "Agent Development Kit", "Microservices", "Observability", "Fault tolerance", "RAG workflows"]
  }
];

export const education = {
  school: "National University of Singapore",
  degree: "Bachelor of Computer Science",
  date: "August 2023 - May 2027"
};
