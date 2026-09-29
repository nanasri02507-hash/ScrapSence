import { BadgeCheck, Boxes, Gauge, Sparkles } from "lucide-react";
import { RECYCLABLE } from "@/lib/scrapsense/data";
import type { AnalysisResult as Result } from "@/lib/scrapsense/ai";

export function AnalysisResult({ result }: { result: Result }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-6 py-4">
        <Sparkles className="size-4 text-primary" />
        <h3 className="text-sm font-bold">AI Analysis</h3>
        <span className="ml-auto rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          AI Demo Analysis
        </span>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <Item icon={<BadgeCheck className="size-4" />} label="Detected Material" value={result.material} highlight />
        <Item icon={<Boxes className="size-4" />} label="Category" value={RECYCLABLE[result.material]} />
        <Item icon={<Boxes className="size-4" />} label="Estimated Quantity" value={`${result.quantity} kg`} />
        <Item
          icon={<Gauge className="size-4" />}
          label="Confidence"
          value={`${Math.round(result.confidence * 100)}%`}
        />
      </div>

      <div className="px-6 pb-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700"
            style={{ width: `${Math.round(result.confidence * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Item({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-semibold tracking-wide uppercase">{label}</span>
      </div>
      <p
        className={`mt-1 font-display text-xl font-bold ${highlight ? "text-primary" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
