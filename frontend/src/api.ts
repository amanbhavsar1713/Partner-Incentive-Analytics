import { AnalyticsSummary, Filters, MetaResponse } from "./types";

const BASE = (import.meta as any).env?.VITE_API_URL ?? "";

function queryFromFilters(f: Filters): string {
  const p = new URLSearchParams();
  if (f.region && f.region !== "All") p.set("region", f.region);
  if (f.category && f.category !== "All") p.set("category", f.category);
  if (f.stage && f.stage !== "All") p.set("stage", f.stage);
  if (f.atRiskOnly) p.set("atRisk", "true");
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function fetchMeta(): Promise<MetaResponse> {
  const res = await fetch(`${BASE}/api/analytics/meta`);
  if (!res.ok) throw new Error("Failed to load filter options");
  return res.json();
}

export async function fetchSummary(filters: Filters): Promise<AnalyticsSummary> {
  const res = await fetch(`${BASE}/api/analytics/summary${queryFromFilters(filters)}`);
  if (!res.ok) {
    throw new Error("Could not reach the API. Is the backend running on :4000?");
  }
  return res.json();
}
