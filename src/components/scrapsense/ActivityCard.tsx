import type { LucideIcon } from "lucide-react";

export function ActivityCard({
  icon: Icon,
  title,
  meta,
  status,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{meta}</p>
      </div>
      <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground">
        {status}
      </span>
    </div>
  );
}
