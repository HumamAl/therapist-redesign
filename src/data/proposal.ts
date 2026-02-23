import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline: "Building healthcare websites that build trust",
  bio: "I specialize in Next.js applications for healthcare providers — HIPAA-aware, mobile-first, and designed to convert visitors into clients. My approach is straightforward: understand your practice, build something that reflects your values, and ship it fast.",
  approach: [
    {
      title: "Understand Your Practice",
      description:
        "Deep dive into your services, your clients, and the feeling you want the site to convey",
    },
    {
      title: "Build a Working Prototype",
      description:
        "A live preview within days — not weeks — so you can see and feel the direction early",
    },
    {
      title: "Ship Production-Ready",
      description:
        "Clean code, HIPAA-compliant forms, fast-loading pages, and accessibility baked in",
    },
    {
      title: "Iterate Together",
      description:
        "Short feedback cycles — you see progress every few days, and nothing ships without your approval",
    },
  ],
  skillCategories: [
    {
      name: "Frontend & Design",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Responsive Design",
        "Accessibility (WCAG 2.1)",
      ],
    },
    {
      name: "Healthcare Web",
      skills: [
        "HIPAA Compliance",
        "Secure Forms",
        "Therapist Websites",
        "Telehealth Integration",
        "Privacy Policies",
      ],
    },
    {
      name: "Performance & SEO",
      skills: [
        "Core Web Vitals",
        "Image Optimization",
        "Schema Markup",
        "Local SEO",
        "Page Speed",
      ],
    },
  ],
  stats: [
    { value: "24+", label: "Projects Shipped" },
    { value: "15+", label: "Industries Served" },
    { value: "<48hr", label: "Demo Turnaround" },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "southfield-healthcare",
    title: "Southfield Healthcare",
    description:
      "Healthcare operations platform with patient management, appointment scheduling, provider dashboards, and clinical analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    outcome:
      "Replaced 3 separate spreadsheet workflows with a unified scheduling and patient management interface",
    relevance: "Multi-provider clinic management — similar healthcare domain",
    liveUrl: "https://southfield-healthcare.vercel.app",
  },
  {
    id: "tinnitus-therapy",
    title: "Tinnitus Therapy SaaS",
    description:
      "Multi-clinic therapy management platform with patient intake, treatment protocols, progress tracking, and clinic analytics.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
    outcome:
      "Supports multi-clinic patient intake, treatment protocols, and progress tracking across session cohorts",
    relevance: "Therapy-specific platform with patient management workflows",
    liveUrl: "https://tinnitus-therapy.vercel.app",
  },
  {
    id: "medrecord-ai",
    title: "MedRecord AI",
    description:
      "AI-powered medical record summarization tool that extracts clinical data, diagnoses, medications, and treatment timelines.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    outcome:
      "Reduces chart review time from hours to minutes with AI-powered summarization",
    relevance: "Healthcare data handling with privacy-first architecture",
    liveUrl: "https://medrecord-ai-delta.vercel.app",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake system with public intake form, CRM dashboard, lead scoring, pipeline management, and automation rules.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    outcome:
      "Handles 200+ leads/day with automated scoring and pipeline routing",
    relevance: "Intake form design and inquiry management — applicable to client onboarding",
  },
];
