import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RoiByRegion } from "../types";
import { pct } from "../format";

interface Props {
  data: RoiByRegion[];
}

export default function RoiByRegionChart({ data }: Props) {
  const rows = data.map((d) => ({ region: d.region, roi: d.roiPct }));

  return (
    <div className="card">
      <h2>Weighted ROI by Region</h2>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 16, right: 12, bottom: 4, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6eaf2" vertical={false} />
            <XAxis dataKey="region" tick={{ fontSize: 11, fill: "#5b6783" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6783" }} tickFormatter={(v) => `${v}%`} width={44} />
            <Tooltip formatter={(v: number) => [pct(v, 1), "Weighted ROI"]} />
            <Bar dataKey="roi" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="roi" position="top" formatter={(v: number) => pct(v, 0)} style={{ fontSize: 11, fill: "#16203a" }} />
              {rows.map((r, i) => (
                <Cell key={i} fill={r.roi >= 0 ? "#1f9d6b" : "#d6453b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
