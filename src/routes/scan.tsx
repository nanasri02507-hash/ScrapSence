import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/scrapsense/PageShell";
import { WasteScanner } from "@/components/scrapsense/WasteScanner";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan Your Waste — ScrapSense" },
      {
        name: "description",
        content:
          "Upload a photo of your waste and get the detected material, an estimated scrap value range and a matched local collector.",
      },
      { property: "og:title", content: "Scan Your Waste — ScrapSense" },
      {
        property: "og:description",
        content: "AI-assisted waste identification with instant scrap value estimates.",
      },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Step 01 — Scan"
        title="Scan Your Waste"
        subtitle="Drop in a photo and ScrapSense identifies the material, estimates its value and recommends a collector who takes it."
      />
      <Section>
        <WasteScanner />
      </Section>
    </>
  );
}
