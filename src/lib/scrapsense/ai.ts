import { MATERIALS, type Material } from "./data";

export interface AnalysisResult {
  material: Material;
  confidence: number;
  quantity: number;
}

/**
 * AI Demo Analysis — simulated computer-vision service.
 *
 * This is NOT a trained production model. It derives a stable pseudo-random
 * result from the image file so the same image gives the same answer.
 * Swap the body of this function for a real vision API call later; the
 * return shape is all the UI depends on.
 */
export async function analyzeWaste(file: File): Promise<AnalysisResult> {
  await new Promise((r) => setTimeout(r, 1400 + Math.random() * 700));

  const seedSource = `${file.name}:${file.size}`;
  let seed = 0;
  for (let i = 0; i < seedSource.length; i++) {
    seed = (seed * 31 + seedSource.charCodeAt(i)) >>> 0;
  }
  const pool = MATERIALS.filter((m) => m !== "Other");
  const material = pool[seed % pool.length] as Material;
  const confidence = 0.78 + ((seed >> 4) % 20) / 100;
  const quantity = Math.round((0.5 + ((seed >> 8) % 60) / 10) * 10) / 10;

  return { material, confidence: Math.min(confidence, 0.97), quantity };
}
