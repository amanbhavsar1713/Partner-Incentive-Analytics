import {
  AnalyticsSummary,
  DealRecord,
  DealStage,
  PipelineStage,
  PortfolioKpis,
  Region,
  RoiByRegion,
  SpendByPartner,
  SpendTrendPoint,
  VarianceRow,
} from "../types";

const STAGE_ORDER: DealStage[] = [
  "Prospecting",
  "Modeling",
  "Negotiation",
  "Approved",
  "Live",
  "Closed",
];

const ACTIVE_STAGES: DealStage[] = ["Approved", "Live"];

function sum(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}

/** Spend-weighted average ROI across deals that have actually spent. */
function weightedRoi(deals: DealRecord[]): number {
  const spent = deals.filter((d) => d.incentiveSpend > 0);
  const totalSpend = sum(spent.map((d) => d.incentiveSpend));
  if (totalSpend === 0) return 0;
  const weighted = sum(spent.map((d) => d.roiPct * d.incentiveSpend));
  return weighted / totalSpend;
}

export function computeKpis(deals: DealRecord[]): PortfolioKpis {
  const totalBudget = sum(deals.map((d) => d.incentiveBudget));
  const totalSpend = sum(deals.map((d) => d.incentiveSpend));
  const committedRevenue = sum(deals.map((d) => d.committedRevenue));
  const realizedRevenue = sum(deals.map((d) => d.realizedRevenue));

  return {
    totalBudget,
    totalSpend,
    budgetUtilizationPct: totalBudget === 0 ? 0 : (totalSpend / totalBudget) * 100,
    weightedAvgRoiPct: weightedRoi(deals),
    committedRevenue,
    realizedRevenue,
    revenueAttainmentPct: committedRevenue === 0 ? 0 : (realizedRevenue / committedRevenue) * 100,
    activeDeals: deals.filter((d) => ACTIVE_STAGES.includes(d.stage)).length,
    atRiskDeals: deals.filter((d) => d.atRisk).length,
    totalDeals: deals.length,
  };
}

export function spendByPartner(deals: DealRecord[]): SpendByPartner[] {
  const map = new Map<string, { budget: number; spend: number }>();
  for (const d of deals) {
    const cur = map.get(d.partner) ?? { budget: 0, spend: 0 };
    cur.budget += d.incentiveBudget;
    cur.spend += d.incentiveSpend;
    map.set(d.partner, cur);
  }
  return [...map.entries()]
    .map(([partner, v]) => ({
      partner,
      budget: v.budget,
      spend: v.spend,
      utilizationPct: v.budget === 0 ? 0 : Math.round((v.spend / v.budget) * 1000) / 10,
    }))
    .sort((a, b) => b.spend - a.spend);
}

export function roiByRegion(deals: DealRecord[]): RoiByRegion[] {
  const regions = [...new Set(deals.map((d) => d.region))] as Region[];
  return regions
    .map((region) => {
      const inRegion = deals.filter((d) => d.region === region);
      return {
        region,
        roiPct: Math.round(weightedRoi(inRegion) * 10) / 10,
        spend: sum(inRegion.map((d) => d.incentiveSpend)),
      };
    })
    .sort((a, b) => b.roiPct - a.roiPct);
}

export function spendTrend(deals: DealRecord[]): SpendTrendPoint[] {
  const byMonth = new Map<string, number>();
  for (const d of deals) {
    if (d.incentiveSpend <= 0) continue;
    const month = d.startDate.slice(0, 7); // YYYY-MM
    byMonth.set(month, (byMonth.get(month) ?? 0) + d.incentiveSpend);
  }
  const months = [...byMonth.keys()].sort();
  let running = 0;
  return months.map((month) => {
    const spend = byMonth.get(month) ?? 0;
    running += spend;
    return { month, spend, cumulative: running };
  });
}

export function pipeline(deals: DealRecord[]): PipelineStage[] {
  return STAGE_ORDER.map((stage) => {
    const inStage = deals.filter((d) => d.stage === stage);
    return {
      stage,
      count: inStage.length,
      committedRevenue: sum(inStage.map((d) => d.committedRevenue)),
    };
  });
}

export function variance(deals: DealRecord[]): VarianceRow[] {
  return deals
    .filter((d) => d.incentiveBudget > 0)
    .map((d) => {
      const v = d.incentiveBudget - d.incentiveSpend;
      return {
        partner: d.partner,
        region: d.region,
        budget: d.incentiveBudget,
        spend: d.incentiveSpend,
        variance: v,
        variancePct: Math.round((v / d.incentiveBudget) * 1000) / 10,
      };
    })
    .sort((a, b) => a.variance - b.variance); // most over-budget first
}

export interface FilterOpts {
  region?: string;
  category?: string;
  stage?: string;
  atRiskOnly?: boolean;
}

export function filterDeals(deals: DealRecord[], opts: FilterOpts): DealRecord[] {
  return deals.filter((d) => {
    if (opts.region && opts.region !== "All" && d.region !== opts.region) return false;
    if (opts.category && opts.category !== "All" && d.category !== opts.category) return false;
    if (opts.stage && opts.stage !== "All" && d.stage !== opts.stage) return false;
    if (opts.atRiskOnly && !d.atRisk) return false;
    return true;
  });
}

export function summarize(deals: DealRecord[]): AnalyticsSummary {
  return {
    kpis: computeKpis(deals),
    spendByPartner: spendByPartner(deals),
    roiByRegion: roiByRegion(deals),
    spendTrend: spendTrend(deals),
    pipeline: pipeline(deals),
    variance: variance(deals),
    deals,
  };
}
