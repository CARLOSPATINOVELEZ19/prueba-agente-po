/**
 * Tests unitarios: API AgentCrew (health, info, webhook)
 */
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";

let app;

beforeAll(async () => {
  const mod = await import("../../portal/server/app.js");
  app = mod.app;
});

describe("AgentCrew API", () => {
  describe("GET /health", () => {
    it("responde 200 con ok: true", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.service).toBe("agentcrew-api");
      expect(res.body.timestamp).toBeDefined();
    });

    it("incluye timestamp ISO8601", async () => {
      const res = await request(app).get("/health");
      expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
  });

  describe("GET /", () => {
    it("responde con info del API", async () => {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("AgentCrew API");
      expect(res.body.version).toBe("1.0.0");
      expect(res.body.endpoints).toEqual({
        health: "GET /health",
        webhook: "POST /webhook",
        webhookJob: "POST /webhook/:jobId",
      });
    });
  });

  describe("POST /webhook/:jobId", () => {
    it("acepta job por jobId en path", async () => {
      const res = await request(app)
        .post("/webhook/daily-report")
        .send({ provider: "claude", type: "daily-report" });
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.jobId).toBe("daily-report");
    });

    it("combina body con jobId del path", async () => {
      const res = await request(app)
        .post("/webhook/seed-custom")
        .send({ provider: "claude", message: "test" });
      expect(res.status).toBe(200);
      expect(res.body.payload).toMatchObject({
        jobId: "seed-custom",
        provider: "claude",
        message: "test",
      });
    });
  });

  describe("POST /webhook", () => {
    it("acepta job con jobId en body", async () => {
      const res = await request(app)
        .post("/webhook")
        .send({ jobId: "anonymous-job", provider: "opencode" });
      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.jobId).toBe("anonymous-job");
    });
  });
});
