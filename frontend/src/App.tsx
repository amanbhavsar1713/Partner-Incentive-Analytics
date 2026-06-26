import { useEffect, useState } from "react";
import { AnalyticsSummary, Filters, MetaResponse } from "./types";
import { fetchMeta, fetchSummary } from "./api";
import FilterBar from "./components/FilterBar";
import KpiCards from "./components/KpiCards";
import SpendByPartnerChart from "./components/SpendByPartnerChart";
import RoiByRegionChart from "./components/RoiByRegionChart";
import SpendTrendChart from "./components/SpendTrendChart";
import PipelineFunnel from "./components/PipelineFunnel";
import DealsTable from "./components/DealsTable";

const DEFAULT_FILTERS: Filters = { region: "All", category: "All", stage: "All", atRiskOnly: false };

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [meta, setMeta] = useState<MetaResponse | null>(null);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch(() => {
        /* dropdowns will just show "All"; summary fetch will surface a clearer error */
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchSummary(filters)
      .then((s) => {
        if (!cancelled) setSummary(s);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Failed to load analytics");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const empty = summary && summary.deals.length === 0;

  return (
    <div>
      <header className="appbar">
        <h1>Partner Incentive Analytics</h1>
        <p>Incentive spend, ROI, and pipeline across the strategic deals portfolio</p>
      </header>

      <div className="page">
        <FilterBar filters={filters} meta={meta} onChange={setFilters} />

        {error && <div className="error">{error}</div>}

        {!error && summary && (
          <>
            <KpiCards kpis={summary.kpis} />

            {empty ? (
              <div className="card">
                <div className="muted">No deals match the current filters. Try resetting.</div>
              </div>
            ) : (
              <>
                <SpendTrendChart data={summary.spendTrend} />
                <div className="grid">
                  <SpendByPartnerChart data={summary.spendByPartner} />
                  <RoiByRegionChart data={summary.roiByRegion} />
                  <PipelineFunnel data={summary.pipeline} />
                  <div className="card">
                    <h2>Budget Variance</h2>
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Partner</th>
                            <th>Region</th>
                            <th>Variance</th>
                            <th>%</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summary.variance.slice(0, 8).map((v) => (
                            <tr key={v.partner}>
                              <td>{v.partner}</td>
                              <td>{v.region}</td>
                              <td style={{ color: v.variance < 0 ? "var(--neg)" : "var(--pos)" }}>
                                {v.variance < 0 ? "-" : ""}${Math.abs(Math.round(v.variance)).toLocaleString()}
                              </td>
                              <td style={{ color: v.variance < 0 ? "var(--neg)" : "var(--pos)" }}>
                                {v.variancePct.toFixed(0)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="muted" style={{ marginTop: 10 }}>
                      Negative variance means spend has exceeded approved budget.
                    </div>
                  </div>
                </div>

                <DealsTable deals={summary.deals} />
              </>
            )}
          </>
        )}

        {loading && !summary && !error && <div className="muted">Loading portfolio…</div>}
      </div>
    </div>
  );
}
