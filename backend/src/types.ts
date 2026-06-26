// Shared contract for the Partner Incentive Analytics API.

export type PartnerCategory = "OEM" | "ODM" | "Silicon" | "Distribution";
export type Region = "Americas" | "EMEA" | "APAC" | "Greater China";
export type DealStage =
  | "Prospecting"
  | "Modeling"
  | "Negotiation"
  | "Approved"
  | "Live"
  | "Closed";

export interface DealRecord {
  id: string;
  partner: string;
  category: PartnerCategory;
  region: Region;
  stage: DealStage;
  /** Approved incentive budget for this deal, USD. */
  incentiveBudget: number;
  /** Incentive dollars actually spent to date, USD. */
  incentiveSpend: number;
  /** Revenue the partner committed to, USD. */
  committedRevenue: number;
  /** Revenue realized to date, USD. */
  realizedRevenue: number;
  grossMarginPct: number;
  /** ISO date the deal started / is expected to start. */
  startDate: string;
  /** Deal-level ROI as a percentage (net margin generated vs. incentive spend). */
  roiPct: number;
  /** Flagged when spend is outpacing realized revenue or budget. */
  atRisk: boolean;
}

export interface PortfolioKpis {
  totalBudget: number;
  totalSpend: number;
  budgetUtilizationPct: number;
  weightedAvgRoiPct: number;
  committedRevenue: number;
  realizedRevenue: number;
  revenueAttainmentPct: number;
  activeDeals: number;
  atRiskDeals: number;
  totalDeals: number;
}

export interface NamedValue {
  name: string;
  value: number;
}

export interface SpendByPartner {
  partner: string;
  budget: number;
  spend: number;
  utilizationPct: number;
}

export interface RoiByRegion {
  region: Region;
  roiPct: number;
  spend: number;
}

export interface SpendTrendPoint {
  month: string; // e.g. "2026-01"
  spend: number;
  cumulative: number;
}

export interface PipelineStage {
  stage: DealStage;
  count: number;
  committedRevenue: number;
}

export interface VarianceRow {
  partner: string;
  region: Region;
  budget: number;
  spend: number;
  variance: number; // budget - spend
  variancePct: number; // variance / budget * 100
}

export interface AnalyticsSummary {
  kpis: PortfolioKpis;
  spendByPartner: SpendByPartner[];
  roiByRegion: RoiByRegion[];
  spendTrend: SpendTrendPoint[];
  pipeline: PipelineStage[];
  variance: VarianceRow[];
  deals: DealRecord[];
}
