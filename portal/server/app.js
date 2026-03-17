/**
 * AgentCrew API - App Express (exportado para tests)
 */
import express from "express";
import { registerWebhookRoutes } from "./triggers/webhooks.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "agentcrew-api", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({
    name: "AgentCrew API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      webhook: "POST /webhook",
      webhookJob: "POST /webhook/:jobId",
    },
  });
});

registerWebhookRoutes(app);

export { app };
