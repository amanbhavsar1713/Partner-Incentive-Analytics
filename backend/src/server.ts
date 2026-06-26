import express from "express";
import cors from "cors";
import analyticsRouter from "./routes/analytics";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "partner-incentive-analytics" });
});

app.use("/api/analytics", analyticsRouter);

app.listen(PORT, () => {
  console.log(`Partner Incentive Analytics API listening on http://localhost:${PORT}`);
});
