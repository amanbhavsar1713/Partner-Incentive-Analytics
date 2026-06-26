import { Filters, MetaResponse } from "../types";

interface Props {
  filters: Filters;
  meta: MetaResponse | null;
  onChange: (next: Filters) => void;
}

const DEFAULTS: Filters = { region: "All", category: "All", stage: "All", atRiskOnly: false };

export default function FilterBar({ filters, meta, onChange }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="filterbar">
      <div className="fb-field">
        <label>Region</label>
        <select value={filters.region} onChange={(e) => set({ region: e.target.value })}>
          <option>All</option>
          {meta?.regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="fb-field">
        <label>Category</label>
        <select value={filters.category} onChange={(e) => set({ category: e.target.value })}>
          <option>All</option>
          {meta?.categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="fb-field">
        <label>Stage</label>
        <select value={filters.stage} onChange={(e) => set({ stage: e.target.value })}>
          <option>All</option>
          {meta?.stages.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <label className="check">
        <input
          type="checkbox"
          checked={filters.atRiskOnly}
          onChange={(e) => set({ atRiskOnly: e.target.checked })}
        />
        At-risk only
      </label>

      <button className="fb-reset" onClick={() => onChange(DEFAULTS)}>
        Reset
      </button>
    </div>
  );
}
