import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "lucide-react";

interface FlowStep {
  label: string;
  highlight?: boolean;
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-medium transition-colors duration-150",
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-card text-foreground"
              )}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col items-start gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-start gap-2">
            <div
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-medium transition-colors duration-150",
                step.highlight
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-card text-foreground"
              )}
            >
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ArrowDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-3" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
