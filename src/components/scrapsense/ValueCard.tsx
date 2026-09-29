import { Coins } from "lucide-react";
import { estimateValue, type Material } from "@/lib/scrapsense/data";

export function ValueCard({
  material,
  quantity,
}: {
  material: Material;
  quantity: number;
}) {
  const v = estimateValue(material, quantity);

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-6 py-4">
        <Coins className="size-4 text-primary" />
        <h3 className="text-sm font-bold">Estimated Scrap Value</h3>
        <span className="ml-auto rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
          Demo rates
        </span>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3">
        <Field label="Material" value={material} />
        <Field label="Quantity" value={`${quantity} kg`} />
        <Field label="Reference rate" value={`₹${v.rateMin}–₹${v.rateMax}/kg`} />
      </div>

      <div className="mx-6 mb-6 rounded-xl eco-gradient px-6 py-6 text-center">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          Estimated value
        </p>
        <p className="mt-1 font-display text-4xl font-bold text-primary">
          ₹{v.min} – ₹{v.max}
        </p>
      </div>

      <p className="border-t border-border px-6 py-4 text-xs text-muted-foreground">
        This is an estimated range. Actual scrap prices may vary depending on quality, quantity,
        location and local market conditions.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
