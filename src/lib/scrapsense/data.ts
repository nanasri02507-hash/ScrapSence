export type Material =
  | "Plastic"
  | "Paper"
  | "Cardboard"
  | "Metal"
  | "Glass"
  | "E-waste"
  | "Other";

export const MATERIALS: Material[] = [
  "Plastic",
  "Paper",
  "Cardboard",
  "Metal",
  "Glass",
  "E-waste",
  "Other",
];

/** Demo reference rates (₹ per kg). Not live market prices. */
export const RATES: Record<Material, { min: number; max: number }> = {
  Plastic: { min: 25, max: 40 },
  Paper: { min: 10, max: 18 },
  Cardboard: { min: 8, max: 15 },
  Metal: { min: 40, max: 70 },
  Glass: { min: 3, max: 8 },
  "E-waste": { min: 50, max: 150 },
  Other: { min: 2, max: 6 },
};

export const RECYCLABLE: Record<Material, string> = {
  Plastic: "Recyclable",
  Paper: "Recyclable",
  Cardboard: "Recyclable",
  Metal: "Recyclable",
  Glass: "Recyclable",
  "E-waste": "Special handling",
  Other: "Needs sorting",
};

export interface Collector {
  id: string;
  name: string;
  distance: number;
  materials: Material[];
  availabilityFrom: number; // 24h
  availabilityTo: number;
  availability: string;
  capacity: number;
  verified: boolean;
  area: string;
  rating: number;
}

export const COLLECTORS: Collector[] = [
  {
    id: "c1",
    name: "Ravi Scrap Services",
    distance: 1.8,
    materials: ["Plastic", "Paper", "Metal"],
    availabilityFrom: 16,
    availabilityTo: 19,
    availability: "4 PM – 7 PM",
    capacity: 50,
    verified: true,
    area: "Gandhi Nagar",
    rating: 4.8,
  },
  {
    id: "c2",
    name: "GreenCycle Kabadi",
    distance: 2.4,
    materials: ["Paper", "Cardboard", "Glass", "Plastic"],
    availabilityFrom: 9,
    availabilityTo: 13,
    availability: "9 AM – 1 PM",
    capacity: 80,
    verified: true,
    area: "Sector 12",
    rating: 4.6,
  },
  {
    id: "c3",
    name: "Meena Waste Traders",
    distance: 3.1,
    materials: ["Metal", "E-waste", "Plastic"],
    availabilityFrom: 11,
    availabilityTo: 18,
    availability: "11 AM – 6 PM",
    capacity: 120,
    verified: true,
    area: "Old Market Road",
    rating: 4.4,
  },
  {
    id: "c4",
    name: "EcoLoop Collection Point",
    distance: 4.6,
    materials: ["E-waste", "Glass", "Metal", "Other"],
    availabilityFrom: 10,
    availabilityTo: 20,
    availability: "10 AM – 8 PM",
    capacity: 200,
    verified: true,
    area: "Industrial Estate",
    rating: 4.9,
  },
  {
    id: "c5",
    name: "Sunil Paper Mart",
    distance: 0.9,
    materials: ["Paper", "Cardboard"],
    availabilityFrom: 8,
    availabilityTo: 12,
    availability: "8 AM – 12 PM",
    capacity: 30,
    verified: false,
    area: "Nehru Colony",
    rating: 4.1,
  },
  {
    id: "c6",
    name: "Aarti Recyclers",
    distance: 5.3,
    materials: ["Plastic", "Glass", "Cardboard", "Other"],
    availabilityFrom: 14,
    availabilityTo: 21,
    availability: "2 PM – 9 PM",
    capacity: 150,
    verified: true,
    area: "Riverside",
    rating: 4.5,
  },
];

export function estimateValue(material: Material, quantity: number) {
  const rate = RATES[material];
  return {
    rateMin: rate.min,
    rateMax: rate.max,
    min: Math.round(rate.min * quantity),
    max: Math.round(rate.max * quantity),
  };
}
