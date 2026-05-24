import type {
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
    title: "Nexa Finance Dashboard",
    category: "Fintech",
    summary: "A modular analytics dashboard with role-aware experience layers.",
    impact: "+38% weekly active usage after redesign",
    stack: ["Next.js", "TypeScript", "GSAP"],
  },
  {
    title: "Pulse SaaS Onboarding",
    category: "SaaS",
    summary: "An adaptive onboarding journey that improved activation and retention.",
    impact: "+24% activation in first 14 days",
    stack: ["React", "Analytics", "A/B Testing"],
  },
  {
    title: "Astra Commerce Studio",
    category: "Commerce",
    summary: "A headless storefront with visual merchandising and fast checkout flows.",
    impact: "+19% checkout completion rate",
    stack: ["Next.js", "Headless CMS", "Edge Caching"],
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
  },
  {
    name: "Ira N.",
    role: "Senior Product Designer",
    initials: "IN",
    specialty: "Complex UX flows and design systems",
  },
  {
    name: "Dev K.",
    role: "Frontend Engineer",
    initials: "DK",
    specialty: "React architecture and performance",
  },
  {
    name: "Maya P.",
    role: "Motion Designer",
    initials: "MP",
    specialty: "Microinteraction choreography",
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
