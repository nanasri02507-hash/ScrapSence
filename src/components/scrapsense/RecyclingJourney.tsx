import { ArrowDown, Factory, Home, Recycle, Store } from "lucide-react";

const NODES = [
  { icon: Home, label: "Household", note: "Waste sorted and scanned" },
  { icon: Store, label: "Kabadiwala", note: "Collected from your door" },
  { icon: Factory, label: "Scrap Dealer", note: "Aggregated and graded" },
  { icon: Recycle, label: "Recycler", note: "Processed into new material" },
];

/** Journey stage reached, derived from the pickup stage index (0-5). */
export function RecyclingJourney({ stageIndex }: { stageIndex: number }) {
  const reached = stageIndex >= 5 ? 4 : stageIndex >= 4 ? 3 : stageIndex >= 3 ? 2 : 1;

  return (
    <div className="flex flex-col items-center">
      {NODES.map(({ icon: Icon, label, note }, i) => {
        const active = i < reached;
        return (
          <div key={label} className="flex w-full flex-col items-center">
            <div
              className={`flex w-full max-w-sm items-center gap-4 rounded-2xl border p-4 transition-colors ${
                active
                  ? "border-primary/40 bg-secondary/60"
                  : "border-border bg-card opacity-60"
              }`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-display font-bold">{label}</p>
                <p className="text-xs text-muted-foreground">{note}</p>
              </div>
            </div>
            {i < NODES.length - 1 && (
              <ArrowDown
                className={`my-2 size-5 ${active ? "text-primary" : "text-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
