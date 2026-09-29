import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, ImageUp, Loader2, RefreshCw, ScanLine, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { analyzeWaste, type AnalysisResult as Result } from "@/lib/scrapsense/ai";
import { estimateValue } from "@/lib/scrapsense/data";
import { bestMatch } from "@/lib/scrapsense/matching";
import { newId, saveScan, setDraftScan } from "@/lib/scrapsense/storage";
import { AnalysisResult } from "./AnalysisResult";
import { ValueCard } from "./ValueCard";
import { CollectorCard } from "./CollectorCard";

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png"];

export function WasteScanner() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [dragging, setDragging] = useState(false);

  function accept(f: File | undefined) {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setError("That file type isn't supported. Please upload a JPG, JPEG or PNG image.");
      return;
    }
    setError(null);
    setResult(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function onAnalyze() {
    if (!file) {
      setError("Please upload an image before analyzing your waste.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const r = await analyzeWaste(file);
      const v = estimateValue(r.material, r.quantity);
      const scan = {
        id: newId("SCN"),
        material: r.material,
        quantity: r.quantity,
        confidence: r.confidence,
        estimatedMin: v.min,
        estimatedMax: v.max,
        date: new Date().toISOString(),
      };
      saveScan(scan);
      setDraftScan(scan);
      setResult(r);
    } catch {
      setError("We couldn't analyze that image. Please try another one.");
    } finally {
      setLoading(false);
    }
  }

  const match = result ? bestMatch({ material: result.material, quantity: result.quantity }) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="surface h-fit p-6">
        <h2 className="font-display text-lg font-bold">Upload your waste image</h2>
        <p className="mt-1 text-sm text-muted-foreground">JPG, JPEG or PNG.</p>

        {!preview ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              accept(e.dataTransfer.files?.[0]);
            }}
            className={`mt-5 grid place-items-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors ${
              dragging ? "border-primary bg-secondary/60" : "border-border bg-background"
            }`}
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <ImageUp className="size-6" />
            </span>
            <p className="mt-4 font-semibold">Drop your waste image here</p>
            <p className="mt-1 text-sm text-muted-foreground">or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Upload Image
            </button>
          </div>
        ) : (
          <div className="mt-5">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img src={preview} alt="Uploaded waste" className="h-64 w-full object-cover" />
              {loading && (
                <>
                  <div className="absolute inset-0 bg-charcoal/45" />
                  <div className="absolute inset-x-0 top-0 h-16 scan-sweep bg-gradient-to-b from-transparent via-mint/60 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      Analyzing your waste...
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold"
              >
                <RefreshCw className="size-4" /> Replace
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-destructive"
              >
                <Trash2 className="size-4" /> Remove
              </button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="hidden"
          onChange={(e) => accept(e.target.files?.[0])}
        />

        {error && (
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onAnalyze}
          disabled={loading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <ScanLine className="size-4" />}
          {loading ? "Analyzing your waste..." : "Analyze Waste"}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          AI Demo Analysis — simulated results, not a trained production model.
        </p>
      </div>

      <div className="space-y-6">
        {!result && !loading && (
          <div className="surface grid place-items-center p-12 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <ScanLine className="size-6" />
            </span>
            <p className="mt-4 font-semibold">No analysis yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Upload an image and run the analysis to see the detected material, its value and a
              matched collector.
            </p>
          </div>
        )}

        {loading && (
          <div className="surface space-y-4 p-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
            <p className="text-center text-sm text-muted-foreground">Analyzing your waste...</p>
          </div>
        )}

        {result && !loading && (
          <>
            <AnalysisResult result={result} />
            <ValueCard material={result.material} quantity={result.quantity} />
            {match ? (
              <CollectorCard collector={match.collector} reasons={match.reasons} recommended />
            ) : (
              <div className="surface p-6 text-center">
                <p className="font-semibold">No collector available for this material yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse all collectors and pick the closest alternative.
                </p>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/collectors" })}
                  className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Find a Collector
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
