import { useState } from "react";
import { COLLECTORS, MATERIALS, type Material } from "@/lib/scrapsense/data";
import { CollectorCard } from "./CollectorCard";

export function CollectorList() {
  const [filter, setFilter] = useState<Material | "All">("All");

  const list =
    filter === "All"
      ? COLLECTORS
      : COLLECTORS.filter((c) => c.materials.includes(filter));

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["All", ...MATERIALS] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setFilter(m)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === m
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="surface mt-8 grid place-items-center p-12 text-center">
          <p className="font-semibold">No collector available for {filter}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another material — more collectors are being onboarded.
          </p>
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Show all collectors
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <CollectorCard key={c.id} collector={c} />
          ))}
        </div>
      )}
    </div>
  );
}
