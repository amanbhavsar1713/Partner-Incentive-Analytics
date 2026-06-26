import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpendTrendPoint } from "../types";
import { money, monthLabel } from "../format";

interface Props {
  data: SpendTrendPoint[];
}

export default function SpendTrendChart({ data }: Props) {
  const rows = data.map((d) => ({
    month: monthLabel(d.month),
    Monthly: Math.round(d.spend),
    Cumulative: Math.round(d.cumulative),
  }));

  return (
    <div className="card span2">
      <h2>Incentive Spend Over Time</h2>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rows} margin={{ top: 8, right: 16, bottom: 4, left: 8 }}>
            <defs>
              <linearGradient id="cumFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a0a0" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#16a0a0" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6eaf2" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5b6783" }} />
            <YAxis tick={{ fontSize: 11, fill: "#5b6783" }} tickFormatter={(v) => money(v, true)} width={64} />
            <Tooltip formatter={(v: number) => money(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="Cumulative" stroke="#16a0a0" strokeWidth={2} fill="url(#cumFill)" />
            <Bar dataKey="Monthly" barSize={26} fill="#2f4bd6" radius={[3, 3, 0, 0]} />
            <Line type="monotone" dataKey="Cumulative" stroke="#16a0a0" strokeWidth={0} dot={false} legendType="none" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
