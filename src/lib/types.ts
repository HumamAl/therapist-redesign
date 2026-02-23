import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
  stats: { value: string; label: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// App-specific types
export type InquiryStatus = "new" | "contacted" | "scheduled" | "completed" | "archived";
export type SessionStatus = "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
export type ContentStatus = "published" | "draft" | "review";
export type ServiceCategory = "individual" | "couples" | "family" | "group" | "specialized";
export type InquirySource = "website" | "referral" | "psychology-today" | "google" | "insurance-directory";

export interface TherapyService {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: ServiceCategory;
  isActive: boolean;
  icon: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  status: InquiryStatus;
  date: string;
  source: InquirySource;
  message: string;
  hipaaConsent: boolean;
  insuranceProvider?: string;
}

export interface Session {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  notes?: string;
  isVirtual: boolean;
}

export interface WebsiteContent {
  id: string;
  title: string;
  type: "page" | "blog" | "resource" | "faq";
  status: ContentStatus;
  lastModified: string;
  wordCount: number;
  slug: string;
}

export interface SiteAnalytics {
  month: string;
  visitors: number;
  inquiries: number;
  bookingRate: number;
  topSource: string;
}

export interface Testimonial {
  id: string;
  initials: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}
