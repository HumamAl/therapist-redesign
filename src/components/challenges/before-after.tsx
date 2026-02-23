import { X, Check } from "lucide-react";

interface BeforeAfterProps {
  before: {
    label: string;
    items: string[];
  };
  after: {
    label: string;
    items: string[];
  };
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-[color:var(--destructive)]/5 border border-[color:var(--destructive)]/15 rounded-lg p-4">
        <p className="text-sm font-medium text-[color:var(--destructive)] mb-3">
          {before.label}
        </p>
        <ul className="space-y-2">
          {before.items.map((item) => (
            <li
              key={item}
              className="text-sm text-[color:var(--destructive)]/80 flex items-start gap-2"
            >
              <X className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[color:var(--success)]/5 border border-[color:var(--success)]/15 rounded-lg p-4">
        <p className="text-sm font-medium text-[color:var(--success)] mb-3">
          {after.label}
        </p>
        <ul className="space-y-2">
          {after.items.map((item) => (
            <li
              key={item}
              className="text-sm text-[color:var(--success)]/80 flex items-start gap-2"
            >
              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
