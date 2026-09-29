import { COLLECTORS, type Collector, type Material } from "./data";

export interface MatchInput {
  material: Material;
  quantity: number;
  /** Preferred hour of day in 24h format, e.g. 17 for 5 PM. */
  preferredHour?: number;
}

export interface MatchResult {
  collector: Collector;
  reasons: string[];
}

function hourLabel(h: number) {
  const suffix = h >= 12 ? "PM" : "AM";
  const base = h % 12 === 0 ? 12 : h % 12;
  return `${base} ${suffix}`;
}

/**
 * Plain, explainable matching: filter on material compatibility and capacity,
 * then rank by availability fit and distance. No opaque "AI score".
 */
export function matchCollectors(input: MatchInput): MatchResult[] {
  const { material, quantity, preferredHour } = input;

  return COLLECTORS.filter(
    (c) => c.materials.includes(material) && c.capacity >= quantity,
  )
    .map((c) => {
      const availableNow =
        preferredHour === undefined ||
        (preferredHour >= c.availabilityFrom && preferredHour < c.availabilityTo);

      const reasons: string[] = [
        `Accepts ${material}`,
        `${c.distance} km away`,
        availableNow
          ? preferredHour === undefined
            ? `Available ${c.availability}`
            : `Available at ${hourLabel(preferredHour)}`
          : `Works ${c.availability} — outside your preferred slot`,
        `Capacity ${c.capacity} kg covers your ${quantity} kg`,
      ];

      const rank =
        (availableNow ? 0 : 100) + c.distance + (c.verified ? 0 : 2);

      return { collector: c, reasons, rank };
    })
    .sort((a, b) => a.rank - b.rank)
    .map(({ collector, reasons }) => ({ collector, reasons }));
}

export function bestMatch(input: MatchInput): MatchResult | null {
  return matchCollectors(input)[0] ?? null;
}
