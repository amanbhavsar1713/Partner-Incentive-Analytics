import { PipelineStage } from "../types";
import { money, count } from "../format";

interface Props {
  data: PipelineStage[];
}

export default function PipelineFunnel({ data }: Props) {
  const maxRevenue = Math.max(1, ...data.map((s) => s.committedRevenue));

  return (
    <div className="card">
      <h2>Pipeline by Stage</h2>
      <div className="funnel">
        {data.map((s) => {
          const widthPct = Math.max(s.committedRevenue > 0 ? 6 : 0, (s.committedRevenue / maxRevenue) * 100);
          return (
            <div className="funnel-row" key={s.stage}>
              <div className="funnel-label">{s.stage}</div>
              <div className="funnel-bar-wrap">
                <div className="funnel-bar" style={{ width: `${widthPct}%` }} />
              </div>
              <div className="funnel-meta">
                {count(s.count)} {s.count === 1 ? "deal" : "deals"} · {money(s.committedRevenue, true)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="muted" style={{ marginTop: 12 }}>
        Bar length is scaled to committed revenue at each stage.
      </div>
    </div>
  );
}
