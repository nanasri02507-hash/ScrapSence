import { Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Coins, Cpu, MapPin, Recycle, ScanLine } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-32 size-[38rem] rounded-full eco-gradient blur-3xl opacity-70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-16 pb-10 lg:grid-cols-2 lg:pt-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Recycle className="size-3.5" /> Smart Waste. Better Value. Connected Recycling.
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
            Turn Your Waste <br />
            Into <span className="text-primary">Value.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            ScrapSense uses AI to identify recyclable waste, estimate its value, and connect
            you with the right local collector.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              <ScanLine className="size-4" /> Scan Your Waste
            </Link>
            <Link
              to="/collectors"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Find a Collector <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <span>Scan</span>
            <span className="text-primary">→</span>
            <span>Sense</span>
            <span className="text-primary">→</span>
            <span>Value</span>
            <span className="text-primary">→</span>
            <span>Match</span>
            <span className="text-primary">→</span>
            <span>Pickup</span>
            <span className="text-primary">→</span>
            <span>Recycle</span>
          </div>
        </div>

        <div className="relative">
          <div className="surface relative mx-auto max-w-md overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">AI Demo Analysis</span>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
                Live preview
              </span>
            </div>

            <div className="relative mt-4 grid h-44 place-items-center overflow-hidden rounded-xl eco-gradient">
              <Boxes className="size-20 text-primary/70 float-slow" />
              <div className="absolute inset-x-0 top-0 h-14 scan-sweep bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Stat icon={<Cpu className="size-4" />} label="Detected" value="Plastic" />
              <Stat icon={<Boxes className="size-4" />} label="Quantity" value="2.5 kg" />
              <Stat icon={<Coins className="size-4" />} label="Value" value="₹60 – ₹90" />
              <Stat icon={<MapPin className="size-4" />} label="Nearest" value="1.8 km" />
            </div>
          </div>

          <div className="surface absolute -bottom-6 -left-2 hidden items-center gap-3 p-4 sm:flex lg:-left-8">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Recycle className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Recycling Completed</p>
              <p className="text-xs text-muted-foreground">2.5 kg diverted from landfill</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-semibold tracking-wide uppercase">{label}</span>
      </div>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
