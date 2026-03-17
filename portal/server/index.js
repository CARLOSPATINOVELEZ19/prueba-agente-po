/**
 * AgentCrew API - Orquestador
 * Schedules, Webhooks, Post-Actions y MCP integrations
 */
import { app } from "./app.js";
import { initSchedules } from "./triggers/schedules.js";
import { getNatsConnection } from "./config/nats.js";
import { initClaudeAgent } from "./agents/claude-provider.js";
import { initOpenCodeAgent } from "./agents/opencode-provider.js";

const PORT = process.env.PORT || 3003;

async function bootstrap() {
  try {
    await getNatsConnection();
    initSchedules();
    await initClaudeAgent();
    await initOpenCodeAgent();
  } catch (err) {
    console.warn("[Bootstrap] NATS no disponible - webhooks/schedules fallarán hasta que NATS esté activo:", err.message);
  }

  app.listen(PORT, () => {
    console.log(`[AgentCrew] API escuchando en http://localhost:${PORT}`);
  });
}

bootstrap().catch(console.error);
