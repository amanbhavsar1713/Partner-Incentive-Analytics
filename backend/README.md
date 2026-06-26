# Backend — Partner Incentive Analytics

Express + TypeScript API that aggregates a portfolio of partner incentive deals.

## Scripts

```bash
npm install
npm run dev     # tsx watch on http://localhost:4000
npm run build   # tsc -> dist/
npm start       # node dist/server.js
```

## Endpoints

- `GET /api/health` — liveness check.
- `GET /api/analytics/meta` — filter option lists (regions, categories, stages).
- `GET /api/analytics/summary` — full summary; honors `?region=&category=&stage=&atRisk=true`.
- `GET /api/analytics/deals` — filtered deal list without the aggregates.

## Where the logic lives

`src/lib/analytics.ts` holds pure aggregation functions — `computeKpis`, `spendByPartner`,
`roiByRegion`, `spendTrend`, `pipeline`, `variance`, and `filterDeals`. The sample portfolio is in
`src/data/portfolio.ts`; ROI and at-risk flags are derived from each deal's realized revenue,
margin, and spend so the numbers stay internally consistent.
