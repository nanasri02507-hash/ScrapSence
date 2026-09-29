import { createFileRoute } from "@tanstack/react-router";
import { CollectorList } from "@/components/scrapsense/CollectorList";
import { PageHeader, Section } from "@/components/scrapsense/PageShell";

export const Route = createFileRoute("/collectors")({
  head: () => ({
    meta: [
      { title: "Find a Collector — ScrapSense" },
      {
        name: "description",
        content:
          "Browse verified local kabadiwalas by material, distance, availability and collection capacity, then schedule a pickup.",
      },
      { property: "og:title", content: "Find a Collector — ScrapSense" },
      {
        property: "og:description",
        content: "Verified nearby collectors filtered by the material you want to sell.",
      },
    ],
  }),
  component: CollectorsPage,
});

function CollectorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Step 04 — Match"
        title="Find a Collector"
        subtitle="Demo collectors near you. Filter by material, then schedule a pickup in a couple of taps."
      />
      <Section>
        <CollectorList />
      </Section>
    </>
  );
}
