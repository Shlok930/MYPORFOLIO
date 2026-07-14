export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  challenges: string;
  role: string;
  architecture: string; // SVG path or diagram name
  github: string;
  live: string;
  image: string; // fallback / visual representation
  metric: string; // Product design result-oriented metric
}

export interface SkillCategory {
  title: string;
  skills: { name: string; percentage: number; icon: string }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
}

export const personalInfo = {
  name: "Shlok Pandey",
  title: "Full Stack Developer & AI Enthusiast",
  location: "Bhopal, Madhya Pradesh, India",
  email: "shlokpandey.dev@gmail.com",
  github: "https://github.com/Shlok930",
  linkedin: "https://linkedin.com/in/shlokpandey",
  twitter: "https://twitter.com/shlok_pandey",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Oriental Institute of Science and Technology, Bhopal",
    semester: "4th Semester",
    duration: "2024 - 2028"
  },
  mission: "To build scalable software products that solve real-world problems using AI, Full Stack Development, and Cloud technologies.",
  vision: "Become one of India's best Software Engineers while building impactful startups.",
  traits: ["Curious", "Innovative", "Creative", "Fast Learner", "Problem Solver", "Team Player", "Competitive", "Minimalist"]
};

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", percentage: 90, icon: "FaReact" },
      { name: "Next.js", percentage: 88, icon: "TbBrandNextjs" },
      { name: "TypeScript", percentage: 85, icon: "SiTypescript" },
      { name: "Tailwind CSS", percentage: 95, icon: "SiTailwindcss" },
      { name: "GSAP / Framer Motion", percentage: 82, icon: "FiWind" },
      { name: "Three.js / React Three Fiber", percentage: 75, icon: "SiThreedotjs" }
    ]
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js & Express.js", percentage: 88, icon: "FaNodeJs" },
      { name: "FastAPI", percentage: 80, icon: "SiFastapi" },
      { name: "Python", percentage: 85, icon: "FaPython" },
      { name: "PostgreSQL", percentage: 82, icon: "BiLogoPostgresql" },
      { name: "MongoDB", percentage: 85, icon: "SiMongodb" },
      { name: "Firebase", percentage: 80, icon: "SiFirebase" }
    ]
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", percentage: 92, icon: "FaGithub" },
      { name: "Docker", percentage: 78, icon: "FaDocker" },
      { name: "Postman", percentage: 85, icon: "SiPostman" },
      { name: "Vercel / Render / Railway", percentage: 88, icon: "SiVercel" },
      { name: "AWS Basics", percentage: 70, icon: "FaAws" }
    ]
  },
  {
    title: "Artificial Intelligence",
    skills: [
      { name: "OpenAI & Gemini API", percentage: 85, icon: "GiBrain" },
      { name: "Prompt Engineering", percentage: 90, icon: "MdOutlineSettingsSuggest" },
      { name: "LangChain (Learning)", percentage: 65, icon: "SiChainlink" }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "trustshield",
    title: "TrustShield",
    subtitle: "AI-powered Ethereum Wallet Security Platform",
    description: "Real-time wallet risk assessment, smart contract verification, and automated transaction monitoring platform targeting Ethereum and EVM-compatible chains.",
    longDescription: "TrustShield addresses the critical issue of decentralized security. It monitors active wallet approvals, scans smart contracts for signature and rug-pull vulnerabilities, and detects suspicious token creation. By querying Etherscan APIs and combining heuristic rules with a local ML classifier, it determines a safety score for interactions.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Etherscan API", "Ethers.js"],
    features: [
      "Wallet Risk Analysis with interactive safety score meter.",
      "Smart Contract Signature & Approval Checker to revoke dangerous approvals.",
      "Real-time EVM Transaction Monitoring for suspicious smart contract executions.",
      "Automated malicious Token Detection (Honeypot detector)."
    ],
    challenges: "Handling rate limits on Etherscan and optimizing RPC provider lookups to load active approvals quickly under 2 seconds. Solved by writing an optimized batch-fetching wrapper and caching static contract signatures.",
    role: "Lead Full-Stack Developer — Architected the backend helper APIs and built the dashboard using dynamic interactive grid panels.",
    architecture: "Client (Next.js) -> Middleware Caching Router -> Web3 RPC Nodes / Etherscan API",
    github: "https://github.com/Shlok930/trustshield",
    live: "https://trustshield-demo.vercel.app",
    image: "/projects/trustshield.png",
    metric: "98% Threat Coverage"
  },
  {
    id: "health-chatbot",
    title: "AI Public Health Chatbot",
    subtitle: "Voice-enabled Disease Prediction & Public Health Advisor",
    description: "An intuitive conversational AI agent providing symptom assessment, health education, and WHO guidelines with speech support and multilingual interaction.",
    longDescription: "This healthcare companion helps users evaluate symptoms, provides WHO health advice, and recommends over-the-counter medicine indicators (strictly with medical disclaimers). It supports Hindi, English, and local dialects, powered by custom prompt maps and text-to-speech engines.",
    tags: ["Next.js", "Python", "FastAPI", "Gemini API", "Web Speech API", "Tailwind CSS"],
    features: [
      "AI-driven Symptom-to-Disease matching based on WHO clinical metrics.",
      "Multilingual translation (English, Hindi, etc.) for accessibility in rural areas.",
      "Voice commands and Text-to-Speech output utilizing Web Speech synthesis.",
      "Immediate nearby clinic search and public wellness advice."
    ],
    challenges: "Preventing AI hallucinations in medical suggestions. Resolved by implementing rigid system guidelines (Prompt Engineering) and enforcing a strict mapping layout that links user queries to official WHO documentation and adds immediate safety disclaimers.",
    role: "Full Stack Engineer — Designed the prompt layout, integrated Speech-to-Text APIs, and developed the FastAPI backend server.",
    architecture: "Next.js Client -> FastAPI REST Server -> Gemini API / WHO Knowledge Graph",
    github: "https://github.com/Shlok930/health-chatbot",
    live: "https://health-advisor-demo.vercel.app",
    image: "/projects/health-chatbot.png",
    metric: "WHO Guidelines"
  },
  {
    id: "rake-optimizer",
    title: "AI Rake Optimizer Platform",
    subtitle: "Logistics Optimization Engine for Smart India Hackathon",
    description: "A logistics planning system for rail network rake routing, optimizing transit times and resource allocation using advanced search heuristics and analytics dashboards.",
    longDescription: "Built as part of the Smart India Hackathon, the platform solves complex routing and loading assignments for freight rakes. It analyzes capacity constraints, computes optimized route graphs, and visually displays them to operators.",
    tags: ["React", "FastAPI", "Python", "NetworkX", "Chart.js", "PostgreSQL"],
    features: [
      "Dynamic Route Optimization engine using NetworkX to select shortest paths under capacity bottlenecks.",
      "Interactive Analytics Dashboard with real-time tracking of rake utilization.",
      "Predictive demand-supply matching engine using linear programming solvers.",
      "CSV-based batch upload for train cargo schedules and logs."
    ],
    challenges: "Solving NP-hard routing layouts in real-time. We implemented a hybrid approach combining Dijkstra's algorithm for initial pathing and genetic heuristics for multi-rake conflict resolution.",
    role: "Backend Lead — Developed the optimization engine, DB structure, and API routes in FastAPI; assisted on React dashboard layouts.",
    architecture: "React SPA -> FastAPI Server (Python) -> NumPy/NetworkX -> PostgreSQL",
    github: "https://github.com/Shlok930/rake-optimizer",
    live: "https://rake-opt-demo.vercel.app",
    image: "/projects/rake.png",
    metric: "NP-Hard Solver"
  },
  {
    id: "api-healer",
    title: "Autonomous API Healing Platform",
    subtitle: "Self-Healing Simulated Middleware for Node.js",
    description: "A simulated middleware proxy that detects API runtime failures and automatically attempts parameter healing, query adjustments, or alternative endpoint routing.",
    longDescription: "This experimental tool intercepts Node/Express API responses. If an error (e.g. 500 or 400 bad schema) occurs, it utilizes an AI agent flow to read the error log, adjust parameters or schema requests, and automatically retries the request to ensure zero-downtime integration.",
    tags: ["Node.js", "Express.js", "LangChain", "OpenAI API", "Docker", "Socket.io"],
    features: [
      "Automatic interception of Express response error payloads.",
      "LLM-driven schema and parameter reconstruction for broken client requests.",
      "Real-time event stream logging using Socket.io to a visual health dashboard.",
      "Simulation sandbox showing before/after healing logs."
    ],
    challenges: "Ensuring latency overhead is minimal. We added a caching layer for healed schemas, so repeating errors are bypassed instantly with the pre-learned fix, keeping latency under 15ms for cached fixes.",
    role: "Creator & Solo Developer — Built the entire Express middleware package, simulation framework, and real-time dashboard UI.",
    architecture: "Express App -> Proxy Interceptor -> Healing Engine (LangChain/LLM) -> Socket.io Client",
    github: "https://github.com/Shlok930/api-healing-platform",
    live: "https://api-healer-demo.vercel.app",
    image: "/projects/api-healer.png",
    metric: "15ms Retry Latency"
  }
];

export const timelineData: TimelineItem[] = [
  {
    year: "2026 - Present",
    title: "Full Stack & AI Development Focus",
    organization: "Personal Projects & Hackathons",
    description: "Building autonomous systems, wallet checkers, and participating in hackathons to refine Next.js, FastAPI, and AI integration skills."
  },
  {
    year: "2025",
    title: "Smart India Hackathon Participant",
    organization: "Logistics Optimization Project",
    description: "Led the development of the AI Rake Optimizer Platform using FastAPI and React to solve real-time rail freight logistics problems."
  },
  {
    year: "2024 - Present",
    title: "B.Tech Computer Science & Engineering",
    organization: "Oriental Institute of Science and Technology, Bhopal",
    description: "Currently in the 4th Semester. Studying Core Data Structures, Algorithms, Databases, and Software Engineering practices."
  },
  {
    year: "2023",
    title: "Self-Taught Programming Foundation",
    organization: "Online Platforms & Open Source",
    description: "Began journey with Python, JavaScript, CSS layouts, and Git version control before starting university."
  }
];

export const testimonials = [
  {
    name: "Hackathon Evaluator",
    role: "Smart India Hackathon",
    text: "Shlok's team tackled a highly complex logistics bottleneck with an optimized graph engine and a beautifully designed dashboard. Their presentation stood out."
  },
  {
    name: "Open Source Contributor",
    role: "GitHub Community",
    text: "The Autonomous API Healing platform is an ingenious utility. It simplifies API fallback logic using AI in a very practical, plug-and-play middleware package."
  }
];

export const visitorCounterInitial = 1337; // Initial baseline visitors
