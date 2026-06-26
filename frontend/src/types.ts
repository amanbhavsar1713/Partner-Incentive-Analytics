// Mirrors the backend analytics contract.

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
  incentiveBudget: number;
  incentiveSpend: number;
  committedRevenue: number;
  realizedRevenue: number;
  grossMarginPct: number;
  startDate: string;
  roiPct: number;
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
  month: string;
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
  variance: number;
  variancePct: number;
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

export interface Filters {
  region: string;
  category: string;
  stage: string;
  atRiskOnly: boolean;
}

export interface MetaResponse {
  regions: string[];
  categories: string[];
  stages: string[];
}
