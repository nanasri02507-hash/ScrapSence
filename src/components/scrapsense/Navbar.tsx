import { Link } from "@tanstack/react-router";
import { Menu, Recycle, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/scan", label: "Scan Waste" },
  { to: "/collectors", label: "Find Collector" },
  { to: "/track", label: "Track Pickup" },
  { to: "/recycling", label: "Recycling" },
  { to: "/collector-dashboard", label: "For Collectors" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Recycle className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">ScrapSense</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/scan"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-xl border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card px-5 py-3 lg:hidden">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-lg px-2 py-3 text-sm font-medium text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/scan"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
