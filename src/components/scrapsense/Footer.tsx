import { Link } from "@tanstack/react-router";
import { Recycle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Recycle className="size-5" />
            </span>
            <span className="font-display text-lg font-bold">ScrapSense</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Smart Waste. Better Value. Connected Recycling. A student prototype connecting
            households with local kabadiwalas through AI-assisted waste sensing.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/scan" className="hover:text-primary">Scan Waste</Link>
            <Link to="/collectors" className="hover:text-primary">Find Collector</Link>
            <Link to="/pickup" className="hover:text-primary">Schedule Pickup</Link>
            <Link to="/track" className="hover:text-primary">Track Pickup</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">More</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link to="/recycling" className="hover:text-primary">Recycling Journey</Link>
            <Link to="/collector-dashboard" className="hover:text-primary">Collector Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          Demo prototype. AI analysis is simulated and scrap rates are illustrative demo values,
          not live market prices.
        </p>
      </div>
    </footer>
  );
}
