"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Heart,
  Users,
  Gem,
  Brain,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/data/mock-data";
import type { ServiceCategory } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  User,
  Heart,
  Users,
  Gem,
  Brain,
  Sparkles,
};

const categories: { label: string; value: ServiceCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Individual", value: "individual" },
  { label: "Couples", value: "couples" },
  { label: "Family", value: "family" },
  { label: "Specialized", value: "specialized" },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<
    ServiceCategory | "all"
  >("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Therapy Services</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your practice&apos;s service offerings
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
              activeCategory === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const Icon = iconMap[service.icon] || User;
          return (
            <Card key={service.id} className="linear-card p-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {service.isActive && (
                    <Badge
                      variant="outline"
                      className="border-[color:var(--success)]/30 text-[color:var(--success)] bg-[color:var(--success)]/10 gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {service.duration} min &mdash; ${service.price}/session
                  </span>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {service.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No services found in this category.
        </div>
      )}
    </div>
  );
}
