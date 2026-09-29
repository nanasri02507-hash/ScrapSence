import { Camera, Coins, Cpu, MapPin, Recycle, Truck } from "lucide-react";

const STEPS = [
  { n: "01", icon: Camera, title: "Scan", text: "Upload a picture of your waste." },
  { n: "02", icon: Cpu, title: "Identify", text: "AI identifies the material." },
  { n: "03", icon: Coins, title: "Estimate", text: "Get an estimated scrap-value range." },
  { n: "04", icon: MapPin, title: "Match", text: "Find a suitable nearby collector." },
  { n: "05", icon: Truck, title: "Pickup", text: "Schedule a convenient pickup." },
  { n: "06", icon: Recycle, title: "Recycle", text: "Track the recycling journey." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">How it works</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Six steps from bin to recycler
        </h2>
        <p className="mt-3 text-muted-foreground">
          One connected flow so nothing valuable ends up in the landfill.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map(({ n, icon: Icon, title, text }) => (
          <div key={n} className="surface lift relative overflow-hidden p-6">
            <span className="absolute top-3 right-4 font-display text-5xl font-bold text-secondary">
              {n}
            </span>
            <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
