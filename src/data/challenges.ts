import type { Challenge } from "@/lib/types";

export const executiveSummary = {
  commonApproach:
    "Most developers treat a therapist website like any other business site — dropping in a generic template with a stock photo and a contact form, then calling it done.",
  differentApproach:
    "I design from your clients' perspective — a warm, HIPAA-compliant experience that builds trust before they ever book a session, with every form and data flow secured end-to-end.",
  accentWord: "HIPAA-compliant",
};

export const challenges: Challenge[] = [
  {
    id: "hipaa-compliance",
    title: "HIPAA-Compliant Data Collection",
    description:
      "Every contact form, intake questionnaire, and client communication must meet HIPAA standards — encrypted in transit, stored securely, and never exposed through standard email or unencrypted channels.",
    visualizationType: "before-after",
    outcome:
      "All client data encrypted end-to-end with HIPAA-compliant form handling and secure hosting",
  },
  {
    id: "warm-aesthetic",
    title: "Warm & Professional, Not Clinical",
    description:
      "The site needs to feel approachable and grounded — reflecting your values-driven practice — while still conveying professionalism and clinical credibility.",
    visualizationType: "before-after",
    outcome:
      "A design that feels like your practice: warm, inviting, and professional — not sterile or corporate",
  },
  {
    id: "mobile-responsive",
    title: "Mobile-First Responsive Design",
    description:
      "Over 60% of therapy website visitors browse on mobile. The site must look and perform flawlessly on phones, with touch-friendly navigation and fast load times.",
    visualizationType: "metrics",
    outcome:
      "Sub-2-second load times on mobile with 95+ Lighthouse performance score",
  },
  {
    id: "accessible-content",
    title: "Accessible & Inclusive Content Structure",
    description:
      "Accessibility isn't optional — screen readers, keyboard navigation, color contrast, and semantic HTML ensure every potential client can navigate the site regardless of ability.",
    visualizationType: "flow",
    outcome:
      "WCAG 2.1 AA compliance across all pages with proper heading hierarchy and ARIA landmarks",
  },
];
