import { profile, portfolioProjects } from "@/data/proposal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function ProposalPage() {
  return (
    <div className="animate-tab-fade min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {/* ── Section 1: Dark Hero ── */}
        <section
          className="relative overflow-hidden rounded-2xl px-6 py-12 sm:px-10 sm:py-16"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.18 0.04 180), oklch(0.10 0.02 180))",
          }}
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="animate-badge-pop inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              <Sparkles className="size-3" />
              Built this demo for your project
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-3xl sm:text-4xl tracking-tight leading-tight">
            <span className="font-light text-white/90">
              Healthcare websites that{" "}
            </span>
            <span className="font-black text-white">build trust</span>
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/60">
            {profile.bio}
          </p>

          {/* Stats shelf */}
          <Separator className="mx-auto mt-8 max-w-xs bg-white/10" />

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="animate-fade-in"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-white/60 font-mono uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Relevant Work
          </p>
          <h2 className="text-2xl font-bold mb-6">
            Projects in Healthcare &amp; Beyond
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className="linear-card p-5 flex flex-col animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Title + external link */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors duration-100"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome */}
                {project.outcome && (
                  <div className="mt-3 flex items-start gap-1.5 text-xs font-medium text-[color:var(--success)]">
                    <TrendingUp className="size-3.5 mt-0.5 shrink-0" />
                    <span>{project.outcome}</span>
                  </div>
                )}

                {/* Tech badges */}
                <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0 font-normal"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold mb-6">How I Work</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.approach.map((step, i) => (
              <div
                key={i}
                className="linear-card p-5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-lg font-bold text-primary/40 leading-none mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
            Capabilities
          </p>
          <h2 className="text-2xl font-bold mb-6">Relevant Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.skillCategories.map((category, i) => (
              <div
                key={category.name}
                className="linear-card p-5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h3 className="text-sm font-semibold mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: CTA Footer ── */}
        <section className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 px-6 py-10 text-center">
          {/* Pulsing availability dot */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[color:var(--success)] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[color:var(--success)]" />
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Available Now
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            Let&apos;s build this together
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
            This demo is just the starting point. I can have the full
            production site scoped and started within days of our first call.
          </p>

          <Button
            size="lg"
            className="btn-cta-pulse mt-6 gap-2"
          >
            Get in Touch
            <ArrowRight className="size-4" />
          </Button>

          <p className="mt-6 text-sm font-medium text-primary">— Humam</p>
        </section>
      </div>
    </div>
  );
}
