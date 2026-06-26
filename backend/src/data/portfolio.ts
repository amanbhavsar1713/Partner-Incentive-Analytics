import { DealRecord, PartnerCategory, Region, DealStage } from "../types";

// All partners, numbers, and dates below are fictional and for demonstration only.

interface RawDeal {
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
}

// Net margin dollars from realized revenue, then ROI against incentive spend.
function computeRoiPct(d: RawDeal): number {
  if (d.incentiveSpend <= 0) return 0;
  const netMargin = d.realizedRevenue * (d.grossMarginPct / 100);
  return ((netMargin - d.incentiveSpend) / d.incentiveSpend) * 100;
}

function computeAtRisk(d: RawDeal, roiPct: number): boolean {
  const overBudget = d.incentiveSpend > d.incentiveBudget;
  const underDelivering =
    (d.stage === "Live" || d.stage === "Closed") &&
    d.committedRevenue > 0 &&
    d.realizedRevenue < 0.5 * d.committedRevenue;
  return overBudget || underDelivering || roiPct < 0;
}

const RAW: RawDeal[] = [
  { id: "D-1001", partner: "Aurora Devices", category: "OEM", region: "Americas", stage: "Live", incentiveBudget: 1_800_000, incentiveSpend: 1_540_000, committedRevenue: 24_000_000, realizedRevenue: 17_600_000, grossMarginPct: 28, startDate: "2026-01-15" },
  { id: "D-1002", partner: "Borealis Compute", category: "Silicon", region: "EMEA", stage: "Live", incentiveBudget: 2_400_000, incentiveSpend: 2_050_000, committedRevenue: 31_000_000, realizedRevenue: 22_400_000, grossMarginPct: 33, startDate: "2026-01-22" },
  { id: "D-1003", partner: "Cobalt Retail Group", category: "Distribution", region: "Americas", stage: "Live", incentiveBudget: 900_000, incentiveSpend: 1_020_000, committedRevenue: 12_500_000, realizedRevenue: 5_100_000, grossMarginPct: 18, startDate: "2026-02-03" },
  { id: "D-1004", partner: "Delta Foundry", category: "ODM", region: "APAC", stage: "Live", incentiveBudget: 1_500_000, incentiveSpend: 1_180_000, committedRevenue: 19_000_000, realizedRevenue: 14_700_000, grossMarginPct: 24, startDate: "2026-02-10" },
  { id: "D-1005", partner: "Everest Mobile", category: "OEM", region: "Greater China", stage: "Live", incentiveBudget: 3_100_000, incentiveSpend: 2_760_000, committedRevenue: 41_000_000, realizedRevenue: 33_800_000, grossMarginPct: 22, startDate: "2026-01-08" },
  { id: "D-1006", partner: "Fjord Systems", category: "Silicon", region: "EMEA", stage: "Approved", incentiveBudget: 1_200_000, incentiveSpend: 240_000, committedRevenue: 16_000_000, realizedRevenue: 2_300_000, grossMarginPct: 31, startDate: "2026-04-01" },
  { id: "D-1007", partner: "Granite Distribution", category: "Distribution", region: "Americas", stage: "Live", incentiveBudget: 1_050_000, incentiveSpend: 880_000, committedRevenue: 14_000_000, realizedRevenue: 10_500_000, grossMarginPct: 16, startDate: "2026-02-18" },
  { id: "D-1008", partner: "Helios Devices", category: "OEM", region: "APAC", stage: "Negotiation", incentiveBudget: 2_000_000, incentiveSpend: 120_000, committedRevenue: 26_000_000, realizedRevenue: 0, grossMarginPct: 25, startDate: "2026-05-15" },
  { id: "D-1009", partner: "Ionic Semiconductors", category: "Silicon", region: "Greater China", stage: "Live", incentiveBudget: 2_700_000, incentiveSpend: 2_900_000, committedRevenue: 35_000_000, realizedRevenue: 31_500_000, grossMarginPct: 30, startDate: "2026-01-29" },
  { id: "D-1010", partner: "Juniper Retail", category: "Distribution", region: "EMEA", stage: "Live", incentiveBudget: 780_000, incentiveSpend: 610_000, committedRevenue: 9_800_000, realizedRevenue: 7_200_000, grossMarginPct: 17, startDate: "2026-03-04" },
  { id: "D-1011", partner: "Kestrel ODM", category: "ODM", region: "APAC", stage: "Approved", incentiveBudget: 1_350_000, incentiveSpend: 300_000, committedRevenue: 17_500_000, realizedRevenue: 3_900_000, grossMarginPct: 23, startDate: "2026-03-20" },
  { id: "D-1012", partner: "Lumen Compute", category: "Silicon", region: "Americas", stage: "Live", incentiveBudget: 2_200_000, incentiveSpend: 1_870_000, committedRevenue: 28_000_000, realizedRevenue: 23_100_000, grossMarginPct: 32, startDate: "2026-02-12" },
  { id: "D-1013", partner: "Monarch Mobile", category: "OEM", region: "EMEA", stage: "Live", incentiveBudget: 2_600_000, incentiveSpend: 2_240_000, committedRevenue: 33_000_000, realizedRevenue: 27_800_000, grossMarginPct: 21, startDate: "2026-01-18" },
  { id: "D-1014", partner: "Nimbus Distribution", category: "Distribution", region: "APAC", stage: "Closed", incentiveBudget: 640_000, incentiveSpend: 590_000, committedRevenue: 8_200_000, realizedRevenue: 8_400_000, grossMarginPct: 19, startDate: "2026-01-05" },
  { id: "D-1015", partner: "Onyx Foundry", category: "ODM", region: "Greater China", stage: "Live", incentiveBudget: 1_700_000, incentiveSpend: 1_490_000, committedRevenue: 21_000_000, realizedRevenue: 16_300_000, grossMarginPct: 26, startDate: "2026-02-25" },
  { id: "D-1016", partner: "Pinnacle Devices", category: "OEM", region: "Americas", stage: "Modeling", incentiveBudget: 1_900_000, incentiveSpend: 0, committedRevenue: 23_000_000, realizedRevenue: 0, grossMarginPct: 27, startDate: "2026-06-01" },
  { id: "D-1017", partner: "Quartz Semiconductors", category: "Silicon", region: "EMEA", stage: "Live", incentiveBudget: 2_500_000, incentiveSpend: 2_120_000, committedRevenue: 30_000_000, realizedRevenue: 25_600_000, grossMarginPct: 34, startDate: "2026-01-25" },
  { id: "D-1018", partner: "Raven Retail", category: "Distribution", region: "Greater China", stage: "Live", incentiveBudget: 820_000, incentiveSpend: 940_000, committedRevenue: 10_500_000, realizedRevenue: 4_300_000, grossMarginPct: 15, startDate: "2026-03-11" },
  { id: "D-1019", partner: "Solstice ODM", category: "ODM", region: "APAC", stage: "Live", incentiveBudget: 1_450_000, incentiveSpend: 1_210_000, committedRevenue: 18_500_000, realizedRevenue: 15_100_000, grossMarginPct: 24, startDate: "2026-02-08" },
  { id: "D-1020", partner: "Titan Compute", category: "Silicon", region: "Americas", stage: "Live", incentiveBudget: 2_900_000, incentiveSpend: 2_480_000, committedRevenue: 37_000_000, realizedRevenue: 30_200_000, grossMarginPct: 31, startDate: "2026-01-12" },
  { id: "D-1021", partner: "Umbra Mobile", category: "OEM", region: "EMEA", stage: "Prospecting", incentiveBudget: 1_600_000, incentiveSpend: 0, committedRevenue: 20_000_000, realizedRevenue: 0, grossMarginPct: 23, startDate: "2026-07-01" },
  { id: "D-1022", partner: "Vertex Distribution", category: "Distribution", region: "Americas", stage: "Live", incentiveBudget: 970_000, incentiveSpend: 760_000, committedRevenue: 13_000_000, realizedRevenue: 9_900_000, grossMarginPct: 18, startDate: "2026-02-22" },
  { id: "D-1023", partner: "Willow Foundry", category: "ODM", region: "Greater China", stage: "Closed", incentiveBudget: 1_250_000, incentiveSpend: 1_180_000, committedRevenue: 16_000_000, realizedRevenue: 16_500_000, grossMarginPct: 25, startDate: "2026-01-03" },
  { id: "D-1024", partner: "Xenon Semiconductors", category: "Silicon", region: "APAC", stage: "Live", incentiveBudget: 2_300_000, incentiveSpend: 1_960_000, committedRevenue: 29_000_000, realizedRevenue: 24_300_000, grossMarginPct: 33, startDate: "2026-02-15" },
];

export const portfolio: DealRecord[] = RAW.map((d) => {
  const roiPct = Math.round(computeRoiPct(d) * 10) / 10;
  return { ...d, roiPct, atRisk: computeAtRisk(d, roiPct) };
});
