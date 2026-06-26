# Frontend — Partner Incentive Analytics

React 18 + TypeScript + Vite dashboard. Charts use Recharts; styling is plain CSS in
`src/index.css`.

## Scripts

```bash
npm install
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build
```

## Configuration

In development, Vite proxies `/api` to `http://localhost:4000` (see `vite.config.ts`). For a
deployed backend, set `VITE_API_URL` at build time.

## Components

- `FilterBar` — region / category / stage / at-risk filters that drive the whole dashboard.
- `KpiCards` — portfolio headline metrics.
- `SpendByPartnerChart` — budget vs. spend per partner.
- `RoiByRegionChart` — spend-weighted ROI by region.
- `SpendTrendChart` — monthly and cumulative incentive spend.
- `PipelineFunnel` — deal counts and committed revenue by stage.
- `DealsTable` — sortable per-deal detail with risk status.
