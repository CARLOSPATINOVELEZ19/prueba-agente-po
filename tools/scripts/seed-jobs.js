/**
 * Jobs de seed para pruebas vía webhook
 */
const JOBS = [
  { jobId: "seed-daily-report", provider: "claude", type: "daily-report", message: "Seed test" },
  { jobId: "seed-health-check", provider: "opencode", type: "health-check", message: "Seed test" },
  { jobId: "seed-custom", provider: "claude", message: "Custom seed job" },
];

module.exports = { JOBS };
