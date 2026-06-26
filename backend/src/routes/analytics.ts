import { Router, Request, Response } from "express";
import { portfolio } from "../data/portfolio";
import { summarize, filterDeals, FilterOpts } from "../lib/analytics";

const router = Router();

const REGIONS = ["Americas", "EMEA", "APAC", "Greater China"];
const CATEGORIES = ["OEM", "ODM", "Silicon", "Distribution"];
const STAGES = ["Prospecting", "Modeling", "Negotiation", "Approved", "Live", "Closed"];

/** Filter values for populating dropdowns on the client. */
router.get("/meta", (_req: Request, res: Response) => {
  res.json({ regions: REGIONS, categories: CATEGORIES, stages: STAGES });
});

/** Full analytics summary. Honors optional ?region=&category=&stage=&atRisk=true filters. */
router.get("/summary", (req: Request, res: Response) => {
  const opts: FilterOpts = {
    region: typeof req.query.region === "string" ? req.query.region : undefined,
    category: typeof req.query.category === "string" ? req.query.category : undefined,
    stage: typeof req.query.stage === "string" ? req.query.stage : undefined,
    atRiskOnly: req.query.atRisk === "true",
  };
  const filtered = filterDeals(portfolio, opts);
  res.json(summarize(filtered));
});

/** Raw deal list (filterable), without the aggregates. */
router.get("/deals", (req: Request, res: Response) => {
  const opts: FilterOpts = {
    region: typeof req.query.region === "string" ? req.query.region : undefined,
    category: typeof req.query.category === "string" ? req.query.category : undefined,
    stage: typeof req.query.stage === "string" ? req.query.stage : undefined,
    atRiskOnly: req.query.atRisk === "true",
  };
  res.json({ deals: filterDeals(portfolio, opts) });
});

export default router;
