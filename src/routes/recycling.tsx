import { createFileRoute } from "@tanstack/react-router";
import { EmptyState, PageHeader, Section } from "@/components/scrapsense/PageShell";
import { RecyclingJourney } from "@/components/scrapsense/RecyclingJourney";
import { PICKUP_STAGES, getPickups, useStore } from "@/lib/scrapsense/storage";

export const Route = createFileRoute("/recycling")({
  head: () => ({
    meta: [
      { title: "Your Waste Journey — ScrapSense" },
      {
        name: "description",
        content:
          "Follow your waste from household to kabadiwala to scrap dealer to recycler, with material, quantity and recycling status.",
      },
      { property: "og:title", content: "Your Waste Journey — ScrapSense" },
      {
        property: "og:description",
        content: "See exactly where your recyclables went after collection.",
      },
    ],
  }),
  component: RecyclingPage,
});

function RecyclingPage() {
  const pickups = useStore(getPickups);

  return (
    <>
      <PageHeader
        eyebrow="Step 06 — Recycle"
        title="Your Waste Journey"
        subtitle="Every scheduled pickup, traced from your doorstep to the recycler."
      />
      <Section>
        {pickups === null ? (
          <div className="surface h-64 animate-pulse" />
        ) : pickups.length === 0 ? (
          <EmptyState
            title="No recycling records yet"
            text="Scan your waste and schedule your first pickup to start a journey."
            actionLabel="Scan Waste"
            to="/scan"
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {pickups.map((p) => (
              <div key={p.id} className="surface p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {p.quantity} kg {p.material}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {p.id} • Collected by {p.collectorName}
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
                    {PICKUP_STAGES[p.stageIndex]}
                    {p.stageIndex === 5 ? " ♻️" : ""}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <Meta label="Material" value={p.material} />
                  <Meta label="Quantity" value={`${p.quantity} kg`} />
                  <Meta label="Collection date" value={p.date} />
                  <Meta label="Value" value={`₹${p.estimatedMin}–₹${p.estimatedMax}`} />
                </div>

                <div className="mt-6">
                  <RecyclingJourney stageIndex={p.stageIndex} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold">{value}</p>
    </div>
  );
}
