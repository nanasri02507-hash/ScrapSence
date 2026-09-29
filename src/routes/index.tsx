import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/scrapsense/Hero";
import { HowItWorks } from "@/components/scrapsense/HowItWorks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScrapSense — Turn Your Waste Into Value" },
      {
        name: "description",
        content:
          "ScrapSense uses AI to identify recyclable waste, estimate its scrap value and connect you with the right local collector.",
      },
      { property: "og:title", content: "ScrapSense — Turn Your Waste Into Value" },
      {
        property: "og:description",
        content:
          "Scan waste, get an instant value estimate, match with a verified kabadiwala and track recycling end to end.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-5 pb-8">
        <div className="surface eco-gradient flex flex-col items-center gap-6 px-8 py-14 text-center">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Scan → Sense → Value → Match → Pickup → Recycle
          </h2>
          <p className="max-w-xl text-muted-foreground">
            The whole loop in one place. Start with a single photo of what's in your bin.
          </p>
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
          >
            Scan Your Waste <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
