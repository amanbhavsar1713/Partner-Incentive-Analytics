# Partner Incentive Analytics

An analytics dashboard for monitoring a portfolio of partner incentive deals — incentive spend
against budget, spend-weighted ROI, revenue attainment, pipeline by stage, and per-deal
performance with risk flags. It is the portfolio-monitoring counterpart to a single-deal model:
where a deal model answers "should we do this deal?", this answers "how is the whole book of
deals performing, and where is the risk?"

Built as a portfolio project to demonstrate **performance management discipline — metrics,
monitoring, and reporting** across a multi-partner incentive stack, the kind of reporting a deals
organization brings to leadership reviews.

## What it does

- **Portfolio KPIs** — total budget, total spend, budget utilization, spend-weighted ROI,
  revenue attainment, active deals, and at-risk count.
- **Budget vs. spend by partner** — where the incentive dollars are going.
- **Weighted ROI by region** — which geographies are returning on incentive spend.
- **Spend over time** — monthly incentive spend with a cumulative trend line.
- **Pipeline by stage** — deal counts and committed revenue from Prospecting through Closed.
- **Budget variance** — partners where spend has run over the approved budget.
- **Deal detail table** — sortable, with at-risk / on-track status per deal.
- **Filters** — slice the entire dashboard by region, partner category, stage, or at-risk only.

## Tech stack

| Layer    | Stack                                                |
| -------- | ---------------------------------------------------- |
| Frontend | React 18, TypeScript, Vite, Recharts, plain CSS      |
| Backend  | Node.js, Express, TypeScript                         |
| Shared   | A typed contract mirrored on both sides              |

All aggregation logic lives in `backend/src/lib/analytics.ts` and is pure and testable. Filtering
happens server-side so every chart and KPI reflects the active filter set.

## Project structure

```
partner-incentive-analytics/
├── backend/          Express + TypeScript API
│   └── src/
│       ├── data/     portfolio.ts — 24 synthetic partner deals
│       ├── lib/      analytics.ts — KPIs, spend, ROI, trend, pipeline, variance
│       ├── routes/   /api/analytics endpoints
│       ├── types.ts  Shared contract
│       └── server.ts
└── frontend/         React + Vite client
    └── src/
        ├── components/  KpiCards, FilterBar, SpendByPartnerChart, RoiByRegionChart,
        │                SpendTrendChart, PipelineFunnel, DealsTable
        ├── api.ts       Typed fetch wrappers
        ├── format.ts    Money / percent / month formatters
        └── App.tsx
```

## Running locally

Open two terminals.

**1. Backend** (http://localhost:4000)

```bash
cd backend
npm install
npm run dev
```

**2. Frontend** (http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to the backend, so no extra configuration is needed. To point
the frontend at a deployed API, set `VITE_API_URL` at build time.

## API

| Method | Path                       | Query                                          | Returns                  |
| ------ | -------------------------- | ---------------------------------------------- | ------------------------ |
| GET    | `/api/health`              | —                                              | `{ ok: true }`           |
| GET    | `/api/analytics/meta`      | —                                              | filter option lists      |
| GET    | `/api/analytics/summary`   | `region, category, stage, atRisk` (all optional)| full `AnalyticsSummary`  |
| GET    | `/api/analytics/deals`     | same filters                                   | `{ deals }` only         |

## Notes

All partners, figures, and dates in the sample portfolio are fictional and for demonstration only.
