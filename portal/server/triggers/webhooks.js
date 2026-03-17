/**
 * Webhooks: rutas POST /webhook y POST /webhook/:jobId
 */
export function registerWebhookRoutes(app) {
  app.post("/webhook", (req, res) => {
    const jobId = req.body?.jobId || "anonymous";
    res.json({ ok: true, jobId, message: "Job encolado" });
  });

  app.post("/webhook/:jobId", (req, res) => {
    const { jobId } = req.params;
    const body = { ...req.body, jobId };
    res.json({ ok: true, jobId, payload: body });
  });
}
