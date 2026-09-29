import { Check } from "lucide-react";
import { PICKUP_STAGES } from "@/lib/scrapsense/storage";

export function TrackingTimeline({ stageIndex }: { stageIndex: number }) {
  return (
    <ol className="relative ml-3 border-l-2 border-border pl-6">
      {PICKUP_STAGES.map((stage, i) => {
        const done = i < stageIndex;
        const current = i === stageIndex;
        return (
          <li key={stage} className="relative pb-7 last:pb-0">
            <span
              className={`absolute -left-[2.15rem] grid size-7 place-items-center rounded-full border-2 ${
                done
                  ? "border-primary bg-primary text-primary-foreground"
                  : current
                    ? "border-primary bg-secondary text-primary"
                    : "border-border bg-card text-muted-foreground"
              }`}
            >
              {done ? <Check className="size-3.5" /> : <span className="size-2 rounded-full bg-current" />}
            </span>
            <p
              className={`text-sm font-semibold ${
                done ? "text-primary" : current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {stage}
            </p>
            {current && (
              <p className="mt-0.5 text-xs font-medium text-primary">Current status</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
