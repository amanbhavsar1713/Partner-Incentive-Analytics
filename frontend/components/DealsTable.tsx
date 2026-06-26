import { useMemo, useState } from "react";
import { DealRecord } from "../types";
import { money, pct } from "../format";

interface Props {
  deals: DealRecord[];
}

type SortKey = keyof Pick<
  DealRecord,
  "partner" | "region" | "category" | "stage" | "incentiveBudget" | "incentiveSpend" | "roiPct" | "realizedRevenue"
>;

export default function DealsTable({ deals }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("incentiveSpend");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...deals];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return asc ? av - bv : bv - av;
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [deals, sortKey, asc]);

  function sortBy(key: SortKey) {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(false);
    }
  }

  const arrow = (key: SortKey) => (key === sortKey ? (asc ? " ▲" : " ▼") : "");

  return (
    <div className="card span2">
      <h2>Deal Detail ({deals.length})</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortBy("partner")}>Partner{arrow("partner")}</th>
              <th onClick={() => sortBy("category")}>Category{arrow("category")}</th>
              <th onClick={() => sortBy("region")}>Region{arrow("region")}</th>
              <th onClick={() => sortBy("stage")}>Stage{arrow("stage")}</th>
              <th onClick={() => sortBy("incentiveBudget")}>Budget{arrow("incentiveBudget")}</th>
              <th onClick={() => sortBy("incentiveSpend")}>Spend{arrow("incentiveSpend")}</th>
              <th onClick={() => sortBy("realizedRevenue")}>Realized Rev.{arrow("realizedRevenue")}</th>
              <th onClick={() => sortBy("roiPct")}>ROI{arrow("roiPct")}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => (
              <tr key={d.id}>
                <td>{d.partner}</td>
                <td>{d.category}</td>
                <td>{d.region}</td>
                <td><span className="pill stage">{d.stage}</span></td>
                <td>{money(d.incentiveBudget, true)}</td>
                <td style={{ color: d.incentiveSpend > d.incentiveBudget ? "var(--neg)" : undefined }}>
                  {money(d.incentiveSpend, true)}
                </td>
                <td>{money(d.realizedRevenue, true)}</td>
                <td style={{ color: d.roiPct >= 0 ? "var(--pos)" : "var(--neg)", fontWeight: 600 }}>
                  {pct(d.roiPct, 0)}
                </td>
                <td>
                  <span className={`pill ${d.atRisk ? "risk" : "ok"}`}>{d.atRisk ? "At risk" : "On track"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
