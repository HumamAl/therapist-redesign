import { cn } from "@/lib/utils";

interface MetricBarItem {
  label: string;
  value: number;
  max: number;
  displayLabel: string;
  status: "success" | "primary" | "warning";
}

interface MetricBarsProps {
  metrics: MetricBarItem[];
}

const statusColors: Record<string, string> = {
  success: "bg-[color:var(--success)]",
  primary: "bg-primary",
  warning: "bg-[color:var(--warning)]",
};

export function MetricBars({ metrics }: MetricBarsProps) {
  return (
    <div className="space-y-3">
      {metrics.map((metric) => {
        const percentage = Math.min((metric.value / metric.max) * 100, 100);
        return (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-mono text-xs font-medium">
                {metric.displayLabel}
              </span>
            </div>
            <div className="bg-muted rounded-full h-2">
              <div
                className={cn(
                  "rounded-full h-2 transition-all duration-150",
                  statusColors[metric.status]
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
