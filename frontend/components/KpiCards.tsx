import { PortfolioKpis } from "../types";
import { money, pct, count } from "../format";

interface Props {
  kpis: PortfolioKpis;
}

export default function KpiCards({ kpis }: Props) {
  const utilClass = kpis.budgetUtilizationPct > 100 ? "neg" : kpis.budgetUtilizationPct > 90 ? "warn" : "";
  const roiClass = kpis.weightedAvgRoiPct >= 0 ? "pos" : "neg";

  return (
    <div className="kpis">
      <div className="kpi">
        <div className="label">Incentive Budget</div>
        <div className="value">{money(kpis.totalBudget, true)}</div>
        <div className="sub">{count(kpis.totalDeals)} deals in view</div>
      </div>
      <div className="kpi">
        <div className="label">Incentive Spend</div>
        <div className="value">{money(kpis.totalSpend, true)}</div>
        <div className="sub">to date</div>
      </div>
      <div className="kpi">
        <div className="label">Budget Utilization</div>
        <div className={`value ${utilClass}`}>{pct(kpis.budgetUtilizationPct, 0)}</div>
        <div className="sub">spend ÷ budget</div>
      </div>
      <div className="kpi">
        <div className="label">Weighted ROI</div>
        <div className={`value ${roiClass}`}>{pct(kpis.weightedAvgRoiPct, 1)}</div>
        <div className="sub">spend-weighted</div>
      </div>
      <div className="kpi">
        <div className="label">Revenue Attainment</div>
        <div className="value">{pct(kpis.revenueAttainmentPct, 0)}</div>
        <div className="sub">
          {money(kpis.realizedRevenue, true)} / {money(kpis.committedRevenue, true)}
        </div>
      </div>
      <div className="kpi">
        <div className="label">Active Deals</div>
        <div className="value">{count(kpis.activeDeals)}</div>
        <div className="sub">approved or live</div>
      </div>
      <div className="kpi">
        <div className="label">At-Risk Deals</div>
        <div className={`value ${kpis.atRiskDeals > 0 ? "neg" : "pos"}`}>{count(kpis.atRiskDeals)}</div>
        <div className="sub">over budget or under-delivering</div>
      </div>
      <div className="kpi">
        <div className="label">Committed Revenue</div>
        <div className="value">{money(kpis.committedRevenue, true)}</div>
        <div className="sub">across portfolio</div>
      </div>
    </div>
  );
}
