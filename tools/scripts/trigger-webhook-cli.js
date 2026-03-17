#!/usr/bin/env node
/**
 * CLI para disparar webhooks manualmente (sin usar la UI)
 * Equivalente a un "admin" que ejecuta jobs desde terminal.
 *
 * Uso:
 *   node tools/scripts/trigger-webhook-cli.js <jobId> [--payload '{"key":"value"}']
 *   node tools/scripts/trigger-webhook-cli.js daily-report
 *   node tools/scripts/trigger-webhook-cli.js custom-job --payload '{"provider":"claude","message":"manual"}'
 *
 * Requisitos: API AgentCrew corriendo, NATS disponible
 */

const BASE_URL = process.env.AGENTCREW_URL || "http://localhost:3003";

const { parseArgs } = require("./parse-cli-args.js");

async function main() {
  const args = process.argv.slice(2);
  const { jobId, payload } = parseArgs(args);

  if (!jobId) {
    console.error("Uso: node trigger-webhook-cli.js <jobId> [--payload '{\"key\":\"value\"}']");
    console.error("Ejemplo: node trigger-webhook-cli.js daily-report");
    process.exit(1);
  }

  const body = { ...payload, jobId };

  try {
    const res = await fetch(`${BASE_URL}/webhook/${jobId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (res.ok && data.ok) {
      console.log("Job encolado:", jobId);
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error("Error:", data.error || res.status);
      process.exit(1);
    }
  } catch (err) {
    console.error("Error de conexión:", err.message);
    process.exit(1);
  }
}

main();
