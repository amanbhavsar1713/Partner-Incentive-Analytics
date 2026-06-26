import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpendByPartner } from "../types";
import { money } from "../format";

interface Props {
  data: SpendByPartner[];
}

export default function SpendByPartnerChart({ data }: Props) {
  // Show the top partners by spend so the axis stays readable.
  const top = data.slice(0, 10).map((d) => ({
    partner: d.partner.replace(/ (Devices|Compute|Distribution|Retail|Group|Semiconductors|Foundry|Mobile|Systems|ODM)$/, ""),
    Budget: Math.round(d.budget),
    Spend: Math.round(d.spend),
  }));

  return (
    <div className="card">
      <h2>Budget vs. Spend by Partner</h2>
      <div className="chart-wrap" style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6eaf2" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#5b6783" }} tickFormatter={(v) => money(v, true)} />
            <YAxis type="category" dataKey="partner" tick={{ fontSize: 11, fill: "#5b6783" }} width={90} />
            <Tooltip formatter={(v: number) => money(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Budget" fill="#c2cdf2" radius={[0, 3, 3, 0]} />
            <Bar dataKey="Spend" fill="#2f4bd6" radius={[0, 3, 3, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
