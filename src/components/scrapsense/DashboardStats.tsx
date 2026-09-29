import type { LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}

export function DashboardStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, hint }) => (
        <div key={label} className="surface lift p-5">
          <span className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
            <Icon className="size-5" />
          </span>
          <p className="mt-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-1 font-display text-2xl font-bold">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
      ))}
    </div>
  );
}
