import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-12 pb-8">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-5 pb-12">{children}</div>;
}

export function EmptyState({
  title,
  text,
  actionLabel,
  to,
}: {
  title: string;
  text: string;
  actionLabel: string;
  to: "/scan" | "/collectors" | "/dashboard" | "/track";
}) {
  return (
    <div className="surface grid place-items-center p-14 text-center">
      <p className="font-display text-lg font-bold">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
      <Link
        to={to}
        className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
