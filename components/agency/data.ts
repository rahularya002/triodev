import type {
  FaqItem,
  MetricItem,
  ProcessStep,
  ServiceItem,
  TeamMember,
  TestimonialItem,
  ThemeMode,
  ThemePalette,
  TrustPoint,
  WorkItem,
} from "./types";

export const services: ServiceItem[] = [
  {
    title: "Launch your MVP",
    detail:
      "Turn an idea into a production-ready product in weeks, not months. We help founders validate fast and ship something real users can try.",
    tag: "Startups",
    outcome: "An MVP you can put in front of users and investors.",
  },
  {
    title: "Scale your SaaS",
    detail:
      "Ship new features, improve performance, and support growth without rebuilding from scratch.",
    tag: "SaaS",
    outcome: "A product that grows with your users.",
  },
  {
    title: "AI-powered workflows",
    detail:
      "Integrate AI into your product to automate repetitive work and create smarter user experiences.",
    tag: "AI",
    outcome: "Less manual work, more intelligent products.",
  },
  {
    title: "Modernize your business",
    detail:
      "Replace spreadsheets, manual processes, and disconnected tools with custom software built around how you actually work.",
    tag: "Automation",
    outcome: "Hours of manual work removed every week.",
  },
  {
    title: "Internal tools & dashboards",
    detail:
      "Custom portals, admin panels, and dashboards that give your team clarity and control.",
    tag: "Internal",
    outcome: "One source of truth for your operations.",
  },
  {
    title: "Websites that convert",
    detail:
      "Fast, modern websites engineered to turn visitors into qualified leads, not just look good.",
    tag: "Web",
    outcome: "A site that earns trust and drives action.",
  },
];

export const projects: string[] = [
  "SaaS onboarding ecosystem",
  "AI analytics command center",
  "Fintech portfolio web app",
];

export const metrics: MetricItem[] = [
  { label: "Combined experience", value: "5+ yrs" },
  { label: "Domains shipped", value: "SaaS · AI · E-com" },
  { label: "Engagement", value: "Full-cycle" },
  { label: "Architecture", value: "Built to scale" },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    detail: "We learn your business, users, and goals to define what's actually worth building.",
  },
  {
    title: "Product Strategy",
    detail: "We shape scope, priorities, and a roadmap that gets you to value as fast as possible.",
  },
  {
    title: "Design",
    detail: "Interfaces and flows designed for clarity, conversion, and real-world usage.",
  },
  {
    title: "Development & Testing",
    detail: "Production-grade builds in React and Next.js, tested for reliability before launch.",
  },
  {
    title: "Launch",
    detail: "We ship to production and make sure it performs under real users and real load.",
  },
  {
    title: "Ongoing Support",
    detail: "We stay on as your engineering partner to improve, scale, and maintain what we built.",
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: "Built across domains",
    detail:
      "Products shipped across SaaS, AI, recruitment, and e-commerce — not just marketing websites.",
  },
  {
    title: "Modern, proven stack",
    detail:
      "Next.js, React, Node.js, Supabase, and AI integrations chosen for reliability and speed.",
  },
  {
    title: "Architected to scale",
    detail:
      "We build maintainable systems that grow with your users instead of needing a rewrite later.",
  },
  {
    title: "Full-cycle ownership",
    detail:
      "One team from product strategy and design to development, launch, and ongoing support.",
  },
];

export const workItems: WorkItem[] = [
  {
    title: "ENB Avatars",
    category: "AI Platform",
    summary:
      "A studio for digital presence — design, deploy, and converse with high-fidelity AI avatars powered by a brand-specific knowledge base and sub-200ms interaction.",
    impact: "Real-time AI avatars deployable across web, mobile, and VR",
    stack: ["SaaS Platform", "AI Product", "Real-time"],
    image: "/projects/enb-avatars.png",
    url: "https://avatars.enbquantum.com/",
  },
  {
    title: "VMOVEIT",
    category: "Motion Portfolio",
    summary:
      "A cinematic motion design portfolio for Vishwash Bhardwaj — bold typography, neon energy, and design-driven motion for brands, promos, and social content.",
    impact: "A standout portfolio that turns visitors into booked clients",
    stack: ["Brand Site", "Motion", "Conversion"],
    image: "/projects/vmoveit.png",
    url: "https://vishvas-portfolio-three.vercel.app/",
  },
  {
    title: "Visionary Brothers",
    category: "Creative Studio",
    summary:
      "An AI-powered creative studio reimagining brand storytelling — ad films, short films, digital marketing, and model promotions with cinematic visual narratives.",
    impact: "A premium brand presence for an AI-driven creative studio",
    stack: ["Brand Platform", "Video", "AI Creative"],
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
    question: "What exactly does Triodev do?",
    answer:
      "We're a product engineering studio. We design and build custom software — SaaS platforms, AI products, dashboards, internal tools, and high-converting websites — that help businesses launch and grow.",
  },
  {
    question: "Who do you work best with?",
    answer:
      "Startup founders and growing businesses that need a reliable partner to build or scale a product — from validating an MVP to extending a live SaaS platform.",
  },
  {
    question: "Who is behind the studio?",
    answer:
      "We're a team of 5 spanning product, design, and engineering, so you get strategy, design, and development under one roof instead of stitched-together freelancers.",
  },
  {
    question: "Why choose you over freelancers?",
    answer:
      "Instead of hiring and managing several people separately, you get a complete team that owns the work end to end — strategy, design, development, launch, and ongoing support.",
  },
  {
    question: "How fast can you deliver?",
    answer:
      "Most focused builds and MVPs ship in a few weeks. Larger platforms are delivered in milestones, so you see working software early and often instead of waiting months.",
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
