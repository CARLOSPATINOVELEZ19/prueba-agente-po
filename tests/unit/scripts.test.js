/**
 * Tests unitarios: scripts (parse-cli-args, seed-jobs)
 */
import { describe, it, expect } from "vitest";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { parseArgs } = require("../../tools/scripts/parse-cli-args.js");
const { JOBS } = require("../../tools/scripts/seed-jobs.js");

describe("parseArgs (trigger-webhook-cli)", () => {
  it("extrae jobId del primer argumento", () => {
    const { jobId } = parseArgs(["daily-report"]);
    expect(jobId).toBe("daily-report");
  });

  it("extrae payload vacío cuando no hay --payload", () => {
    const { payload } = parseArgs(["health-check"]);
    expect(payload).toEqual({});
  });

  it("extrae payload desde --payload", () => {
    const { jobId, payload } = parseArgs([
      "custom-job",
      "--payload",
      '{"provider":"claude","message":"test"}',
    ]);
    expect(jobId).toBe("custom-job");
    expect(payload).toEqual({ provider: "claude", message: "test" });
  });

  it("parsea payload con campos anidados", () => {
    const { payload } = parseArgs([
      "job",
      "--payload",
      '{"nested":{"key":"value"}}',
    ]);
    expect(payload).toEqual({ nested: { key: "value" } });
  });
});

describe("JOBS (seed-webhook-jobs)", () => {
  it("tiene al menos 3 jobs", () => {
    expect(JOBS.length).toBeGreaterThanOrEqual(3);
  });

  it("cada job tiene jobId", () => {
    JOBS.forEach((job) => {
      expect(job).toHaveProperty("jobId");
      expect(typeof job.jobId).toBe("string");
      expect(job.jobId.length).toBeGreaterThan(0);
    });
  });

  it("incluye seed-daily-report con provider claude", () => {
    const daily = JOBS.find((j) => j.jobId === "seed-daily-report");
    expect(daily).toBeDefined();
    expect(daily.provider).toBe("claude");
    expect(daily.type).toBe("daily-report");
  });

  it("incluye seed-health-check con provider opencode", () => {
    const health = JOBS.find((j) => j.jobId === "seed-health-check");
    expect(health).toBeDefined();
    expect(health.provider).toBe("opencode");
    expect(health.type).toBe("health-check");
  });
});
