import { Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, Package, Recycle, Star } from "lucide-react";
import type { Collector } from "@/lib/scrapsense/data";

export function CollectorCard({
  collector,
  reasons,
  recommended,
}: {
  collector: Collector;
  reasons?: string[];
  recommended?: boolean;
}) {
  return (
    <div
      className={`surface lift flex flex-col p-6 ${
        recommended ? "ring-2 ring-primary" : ""
      }`}
    >
      {recommended && (
        <span className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
          Recommended Collector
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold">{collector.name}</h3>
          <p className="text-xs text-muted-foreground">{collector.area}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
          <Star className="size-3.5" /> {collector.rating}
        </span>
      </div>

      <div className="mt-4 grid gap-2.5 text-sm">
        <Row icon={<MapPin className="size-4" />} text={`${collector.distance} km away`} />
        <Row
          icon={<Recycle className="size-4" />}
          text={`Accepts: ${collector.materials.join(" • ")}`}
        />
        <Row icon={<Clock className="size-4" />} text={`Available: ${collector.availability}`} />
        <Row icon={<Package className="size-4" />} text={`Capacity: ${collector.capacity} kg`} />
        <Row
          icon={<BadgeCheck className="size-4" />}
          text={collector.verified ? "Verified Collector" : "Verification pending"}
        />
      </div>

      {reasons && (
        <div className="mt-4 rounded-xl bg-secondary/50 p-4">
          <p className="text-xs font-bold text-primary">Why this collector?</p>
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {reasons.map((r) => (
              <li key={r}>• {r}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/pickup"
        search={{ collector: collector.id }}
        className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Schedule Pickup
      </Link>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2 text-muted-foreground">
      <span className="mt-0.5 text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
