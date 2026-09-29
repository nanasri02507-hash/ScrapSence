import { useCallback, useEffect, useState } from "react";
import type { Material } from "./data";

export const PICKUP_STAGES = [
  "Request Created",
  "Collector Assigned",
  "Pickup Scheduled",
  "Waste Collected",
  "Sent for Recycling",
  "Recycling Completed",
] as const;

export type PickupStage = (typeof PICKUP_STAGES)[number];

export interface WasteScan {
  id: string;
  material: Material;
  quantity: number;
  confidence: number;
  estimatedMin: number;
  estimatedMax: number;
  date: string;
}

export interface Pickup {
  id: string;
  collectorId: string;
  collectorName: string;
  customerName: string;
  material: Material;
  quantity: number;
  address: string;
  date: string;
  time: string;
  notes: string;
  estimatedMin: number;
  estimatedMax: number;
  stageIndex: number;
  rejected?: boolean;
  createdAt: string;
}

const SCANS_KEY = "scrapsense.scans";
const PICKUPS_KEY = "scrapsense.pickups";
const DRAFT_KEY = "scrapsense.draftScan";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("scrapsense:change"));
}

export function getScans() {
  return read<WasteScan[]>(SCANS_KEY, []);
}
export function saveScan(scan: WasteScan) {
  write(SCANS_KEY, [scan, ...getScans()].slice(0, 50));
}

export function getPickups() {
  return read<Pickup[]>(PICKUPS_KEY, []);
}
export function savePickup(pickup: Pickup) {
  write(PICKUPS_KEY, [pickup, ...getPickups()]);
}
export function updatePickup(id: string, patch: Partial<Pickup>) {
  write(
    PICKUPS_KEY,
    getPickups().map((p) => (p.id === id ? { ...p, ...patch } : p)),
  );
}

/** The most recent scan, handed from the scanner to the pickup form. */
export function getDraftScan() {
  return read<WasteScan | null>(DRAFT_KEY, null);
}
export function setDraftScan(scan: WasteScan | null) {
  write(DRAFT_KEY, scan);
}

export function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

/** Client-only store hook: returns null until hydrated, then live data. */
export function useStore<T>(selector: () => T): T | null {
  const [value, setValue] = useState<T | null>(null);
  const refresh = useCallback(() => setValue(selector()), [selector]);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("scrapsense:change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("scrapsense:change", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  return value;
}
