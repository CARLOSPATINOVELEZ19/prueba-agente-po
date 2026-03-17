#!/usr/bin/env node
/**
 * Seed: Inyecta jobs de prueba vía webhook
 * Útil para probar el flujo completo sin esperar a los schedules.
 *
 * Uso:
 *   node tools/scripts/seed-webhook-jobs.js
 *   AGENTCREW_URL=http://localhost:3003 node tools/scripts/seed-webhook-jobs.js
 *
 * Requisitos: API AgentCrew corriendo, NATS disponible
 */

const { JOBS } = require("./seed-jobs.js");

const BASE_URL = process.env.AGENTCREW_URL || "http://localhost:3003";

async function seed() {
  console.log("[Seed] Conectando a", BASE_URL);

  for (const job of JOBS) {
    try {
      const res = await fetch(`${BASE_URL}/webhook/${job.jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      const body = await res.json();
      if (res.ok && body.ok) {
        console.log(`[Seed] OK: ${job.jobId}`);
      } else {
        console.warn(`[Seed] Fallo ${job.jobId}:`, body.error || res.status);
      }
    } catch (err) {
      console.error(`[Seed] Error ${job.jobId}:`, err.message);
    }
  }

  console.log("[Seed] Finalizado");
}

seed().catch(console.error);
