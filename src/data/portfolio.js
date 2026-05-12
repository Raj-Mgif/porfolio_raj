import bettermindImg from '../assets/bettermind.jpg';
import langchatImg from '../assets/langchat.jpg';
import resumePdf from '../assets/Resume.pdf';
import finalPaperPdf from '../assets/Final Paper.pdf';

export const personal = {
  name: "Raj Kumar Mishra",
  role: "Backend & Systems Developer",
  email: "mishrarajkumar950@gmail.com",
  github: "https://github.com/Raj-Mgif",
  linkedin: "https://linkedin.com/in/rajmishra",
  resume: resumePdf,
  tagline: "Building scalable backend systems and modern full-stack applications while continuously evolving into a cloud and DevOps-oriented software engineer.",
  bio: [
    "I am a Computer Science Engineering student specializing in AI & Machine Learning, and a backend-focused Full Stack Developer passionate about building scalable, secure web applications.",
    "My core stack revolves around Node.js, Express.js, MongoDB, React.js, and Next.js. I have deep hands-on expertise in REST API design, JWT authentication systems, database architecture, and MVC patterns.",
    "Bridging the gap between my academic focus on machine learning and modern software engineering, I'm actively learning AWS, Docker, Kubernetes, and CI/CD pipelines to evolve into a complete cloud-native engineer."
  ]
};

export const stats = [
  { value: 15, suffix: "+", label: "Projects Built" },
  { value: 1, suffix: "", label: "Research Article", link: finalPaperPdf },
  { value: 2024, suffix: "", label: "SIH Finalist" },
  { value: 4, suffix: "th Yr", label: "B.Tech CS" }
];

export const projects = [
  {
    id: "01",
    title: "LangChat",
    category: "Real-Time Chat Platform",
    description: "Built a complete real-time chat platform from scratch — backend architecture, authentication, and frontend integration.",
    stack: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT"],
    highlights: [
      "Designed 12–15 REST API endpoints from ground up",
      "Secure JWT auth with Access & Refresh Tokens in httpOnly cookies",
      "Scalable MongoDB schemas with referencing patterns",
      "Rendering optimized for 1000+ real-time concurrent messages"
    ],
    metrics: { label: "REST Endpoints", value: "12–15" },
    github: "https://github.com/Raj-Mgif/Lang_LearnerChat",
    live: "https://learner-chat.onrender.com/",
    image: langchatImg
  },
  {
    id: "02",
    title: "BetterMind",
    category: "AI Resume Analyzer",
    description: "AI-powered resume analysis tool with aggressive performance optimization — cut LCP by 1.2 seconds and raised Lighthouse to 92.",
    stack: ["Node.js", "React.js", "TypeScript", "MongoDB"],
    highlights: [
      "Scalable backend APIs for AI resume processing",
      "Lighthouse performance score: 65 → 92",
      "Largest Contentful Paint reduced by 1.2 seconds",
      "Modular TypeScript backend architecture"
    ],
    metrics: { label: "Lighthouse Score", value: "92" },
    github: "https://github.com/Raj-Mgif/AI_Resume",
    live: "https://ai-resume-23zq.onrender.com/",
    image: bettermindImg
  }
];

export const skills = {
  "Backend": ["Node.js", "Express.js", "REST APIs", "MVC Architecture", "Python", "Middleware", "Error Handling"],
  "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"],
  "Databases": ["MongoDB", "MySQL", "Schema Design", "Aggregation", "Indexing"],
  "Auth & Security": ["JWT", "bcrypt", "httpOnly Cookies", "Role-Based Access Control", "Protected Routes"],
  "Performance": ["Code Splitting", "Lazy Loading", "Memoization", "Query Optimization", "Lighthouse"],
  "Cloud & DevOps ★": ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "GitHub Actions", "Linux"],
  "Tools": ["Git", "GitHub", "Postman", "Chrome DevTools", "Lighthouse"]
};

export const achievement = {
  year: "2024",
  name: "Smart India Hackathon Software Edition",
  result: "Finalist - PS 1717",
  role: "Team Lead",
  teamSize: 5,
  duration: "36-Hour Sprint",
  description: "Led a 5-member team to design and build a real-time multilingual voice translation system under hackathon pressure — tackling Problem Statement 1717 with full-stack integration."
};

export const learning = [
  "AWS EC2 / S3 / RDS / IAM / VPC",
  "Docker + Docker Compose",
  "Kubernetes",
  "CI/CD Pipelines",
  "Terraform",
  "PostgreSQL + Prisma",
  "OpenAPI Documentation",
  "Advanced TypeScript",
  "AI-integrated Applications",
  "System Design",
  "Linux & Networking"
];
