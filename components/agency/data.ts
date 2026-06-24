import type {
  FaqItem,
  MetricItem,
  ProcessStep,
  ServiceItem,
  TeamMember,
  TestimonialItem,
  ThemeMode,
  ThemePalette,
  WorkItem,
} from "./types";

export const services: ServiceItem[] = [
  {
    title: "Digital Identity",
    detail: "Visual systems crafted for ambitious product teams and scaling products.",
    tag: "Brand",
    outcome: "Clearer positioning across product and marketing touchpoints.",
  },
  {
    title: "Web App Design",
    detail: "Interaction-first product experiences built for clarity and conversion.",
    tag: "UX/UI",
    outcome: "Lower friction across activation and daily workflows.",
  },
  {
    title: "Engineering",
    detail: "Scalable builds in React and Next.js with strict quality and performance standards.",
    tag: "Build",
    outcome: "Maintainable codebase and faster release cadence.",
  },
  {
    title: "Motion Systems",
    detail: "Microinteractions and transitions that guide user attention and intent.",
    tag: "GSAP",
    outcome: "Higher perceived quality and stronger interaction confidence.",
  },
  {
    title: "Conversion Optimization",
    detail: "Landing and product flows improved through analytics-backed iterations.",
    tag: "Growth",
    outcome: "Improved qualified leads and trial-to-paid conversion rates.",
  },
  {
    title: "Design Ops",
    detail: "Reusable component libraries and tokens for faster team shipping.",
    tag: "System",
    outcome: "Unified UI quality across squads and releases.",
  },
];

export const projects: string[] = [
  "SaaS onboarding ecosystem",
  "AI analytics command center",
  "Fintech portfolio web app",
];

export const metrics: MetricItem[] = [
  { label: "Avg. launch cycle", value: "4 weeks" },
  { label: "Team velocity", value: "2x faster" },
  { label: "Core web vitals", value: "95+" },
  { label: "Design QA", value: "pixel tight" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    detail: "We map user intent, product constraints, and brand tone into one clear direction.",
  },
  {
    title: "Prototype",
    detail: "Interactive flows and motion logic are validated before final UI and engineering.",
  },
  {
    title: "Ship",
    detail: "Production-ready Next.js builds with performance and maintainability as defaults.",
  },
];

export const workItems: WorkItem[] = [
  {
    title: "ENB Avatars",
    category: "AI Platform",
    summary:
      "A studio for digital presence — design, deploy, and converse with high-fidelity AI avatars powered by a brand-specific knowledge base and sub-200ms interaction.",
    impact: "Zero-latency human-like avatar experiences at scale",
    stack: ["Next.js", "AI Avatars", "Real-time"],
    image: "/projects/enb-avatars.png",
    url: "https://avatars.enbquantum.com/",
  },
  {
    title: "VMOVEIT",
    category: "Motion Portfolio",
    summary:
      "A cinematic motion design portfolio for Vishwash Bhardwaj — bold typography, neon energy, and design-driven motion for brands, promos, and social content.",
    impact: "Immersive portfolio experience with scroll-driven motion",
    stack: ["Motion Design", "GSAP", "Portfolio"],
    image: "/projects/vmoveit.png",
    url: "https://vishvas-portfolio-three.vercel.app/",
  },
  {
    title: "Visionary Brothers",
    category: "Creative Studio",
    summary:
      "An AI-powered creative studio reimagining brand storytelling — ad films, short films, digital marketing, and model promotions with cinematic visual narratives.",
    impact: "Premium storytelling for brands and product campaigns",
    stack: ["Next.js", "Video", "AI Creative"],
    image: "/projects/visionary-brothers.png",
    url: "https://vito-x-models.vercel.app/",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      "Triodev translated our rough product idea into a polished platform that users actually enjoy.",
    name: "Naman Verma",
    role: "Founder, Pulse Labs",
    company: "Pulse Labs",
  },
  {
    quote:
      "From design strategy to deployment, their team felt like an extension of our internal squad.",
    name: "Aarohi Mehta",
    role: "Product Lead, Nexa Finance",
    company: "Nexa Finance",
  },
  {
    quote:
      "The microinteractions and clarity of the interface dramatically improved user confidence.",
    name: "Rishi Kapoor",
    role: "Head of Growth, Astra",
    company: "Astra Commerce",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Raghav S.",
    role: "Creative Director",
    initials: "RS",
    specialty: "Brand systems and product narrative",
    image: "/team/raghav.svg",
  },
  {
    name: "Ira N.",
    role: "Senior Product Designer",
    initials: "IN",
    specialty: "Complex UX flows and design systems",
    image: "/team/ira.svg",
  },
  {
    name: "Dev K.",
    role: "Frontend Engineer",
    initials: "DK",
    specialty: "React architecture and performance",
    image: "/team/dev.svg",
  },
  {
    name: "Maya P.",
    role: "Motion Designer",
    initials: "MP",
    specialty: "Microinteraction choreography",
    image: "/team/maya.svg",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What exactly does our agency do?",
    answer:
      "We design and build websites, brands, and digital experiences that help businesses look professional and grow online.",
  },
  {
    question: "What types of businesses do we work with?",
    answer:
      "We work with startups, creators, local businesses, and growing brands that want a strong online presence.",
  },
  {
    question: "Who all are behind the agency?",
    answer:
      "We're a team of 5 people spanning design, development, and engineering, covering creativity, functionality, and technical excellence.",
  },
  {
    question: "Why choose us over freelancers?",
    answer:
      "Instead of hiring multiple people separately, you get a complete team working together from strategy and design to development and launch.",
  },
  {
    question: "How fast do you complete a project?",
    answer:
      "Most of our projects are completed within 4 weeks, without compromising on quality.",
  },
];

export const palettes: Record<ThemeMode, ThemePalette> = {
  light: {
    background: "#f6f4ed",
    surface: "#ffffff",
    foreground: "#182117",
    muted: "#5f6d5d",
    primary: "#5f7c51",
  },
  dark: {
    background: "#111612",
    surface: "#1a221b",
    foreground: "#eef3ea",
    muted: "#b3c2b0",
    primary: "#7f9a71",
  },
};
