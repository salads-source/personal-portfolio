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
  headline: "Backend, data platform, compliance, and ML systems with production-grade discipline.",
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
  { label: "Task instances served daily", value: "1M+" },
  { label: "Manual review time reduced", value: "40%" },
  { label: "Latency or memory reductions", value: "30%" }
];

export const about = [
  "Computer Science student at the National University of Singapore, building across backend infrastructure, data platforms, compliance workflows, and applied machine learning.",
  "Recent work spans Kafka and ClickHouse log ingestion, Spring Boot microservices, Redis-backed fault tolerance, Kubernetes preview environments, React/Next.js frontends, and low-latency computer vision inference."
];

export const experience = [
  {
    company: "Google",
    role: "Incoming Software Engineer Intern",
    location: "Singapore",
    date: "May 2026 - August 2026",
    stack: ["Software Engineering"],
    bullets: ["Incoming internship focused on software engineering in Google's Singapore office."]
  },
  {
    company: "Shopee",
    role: "Backend Engineer Intern, Data Platform",
    location: "Singapore",
    date: "December 2025 - April 2026",
    stack: ["Spring", "Kafka", "Redis", "Grafana", "ClickHouse", "Kubernetes"],
    bullets: [
      "Designed and implemented a distributed log storage pipeline with Kafka and ClickHouse ReplicatedMergeTree, using partitioning, sharding, and replication to ingest and serve logs for 1M+ task instances daily.",
      "Improved data quality service reliability with Grafana monitoring and thread pool concurrency tuning, reducing memory usage by 30% under load.",
      "Collaborated with SRE to architect Kubernetes namespace based preview environments with namespaced Kafka topics, S3 prefixes, Redis keys, and automated CI/CD teardown."
    ]
  },
  {
    company: "Binance",
    role: "Software Engineer Intern, Global KYC",
    location: "Singapore",
    date: "May 2025 - November 2025",
    stack: ["Spring", "MySQL", "Kafka", "Redis", "TestNG"],
    bullets: [
      "Built a scalable Spring Boot microservice for multi-stage document verification, orchestrating OCR extraction and LLM-based compliance checks with RAG jurisdiction rules.",
      "Generated explainable pass/fail previews and reduced manual compliance review time by 40%.",
      "Engineered a Kafka fallback mechanism using Redis as temporary persistence during broker unavailability and ZooKeeper leader re-election."
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
  {
    company: "Digital Intelligence Service (DIS)",
    role: "Machine Learning Engineer Intern",
    location: "Singapore",
    date: "June 2022 - April 2023",
    stack: ["PyTorch", "Python", "Docker", "ResNet50", "YOLOv5"],
    bullets: [
      "Designed and implemented a real-time computer vision inference pipeline for operational military use.",
      "Built and optimized CNN-based object detection models, achieving 80% target detection accuracy during live field exercises.",
      "Reduced processing latency by 30% through inference pipeline restructuring, batching, and runtime tuning."
    ]
  }
];

export const projects = [
  {
    title: "Distributed Log Storage Pipeline",
    context: "Shopee Data Platform",
    description:
      "Kafka and ClickHouse ingestion system with ReplicatedMergeTree, partitioning, sharding, and replication for high-volume task logs.",
    impact: "Served logs for 1M+ task instances daily.",
    icon: Database
  },
  {
    title: "KYC Document Verification Service",
    context: "Binance Global KYC",
    description:
      "Spring Boot microservice coordinating OCR extraction, LLM compliance checks, and RAG-backed jurisdiction rules with explainable decisions.",
    impact: "Reduced manual compliance review time by 40%.",
    icon: ShieldCheck
  },
  {
    title: "Ephemeral Preview Environments",
    context: "Shopee SRE collaboration",
    description:
      "Per-PR isolated deployments using Kubernetes namespaces and namespaced Kafka, S3, and Redis resources with CI/CD provisioning.",
    impact: "Improved development isolation and cleanup reliability.",
    icon: Cloud
  },
  {
    title: "Real-Time Vision Inference Pipeline",
    context: "Digital Intelligence Service",
    description:
      "Low-latency target detection workflow using CNN-based models, Dockerized deployment, batching, and runtime performance tuning.",
    impact: "Reached 80% detection accuracy and cut processing latency by 30%.",
    icon: BrainCircuit
  }
];

export const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    items: ["Python", "JavaScript", "Java", "Golang", "TypeScript", "HTML/CSS", "SQL", "MongoDB"]
  },
  {
    label: "Frameworks",
    icon: Layers3,
    items: ["React", "Next.js", "Spring Boot", "Express.js", "TensorFlow", "PyTorch"]
  },
  {
    label: "Data & Infra",
    icon: Network,
    items: ["Apache Kafka", "Apache Spark", "Redis", "ClickHouse", "Grafana", "Docker"]
  },
  {
    label: "Cloud & Tools",
    icon: Workflow,
    items: ["GCP", "AWS", "Firebase", "GitHub", "VS Code", "Jest", "TestNG"]
  },
  {
    label: "Systems Focus",
    icon: Gauge,
    items: ["Microservices", "CI/CD", "Observability", "Fault tolerance", "Computer vision", "RAG workflows"]
  }
];

export const education = {
  school: "National University of Singapore",
  degree: "Bachelor of Computer Science",
  date: "August 2023 - May 2027"
};
