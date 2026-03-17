/**
 * Parsea argumentos del CLI de trigger-webhook
 * @param {string[]} args - process.argv.slice(2)
 * @returns {{ jobId: string, payload: object }}
 */
function parseArgs(args) {
  const jobId = args[0];
  const payloadIdx = args.indexOf("--payload");
  const payloadStr = payloadIdx >= 0 ? args[payloadIdx + 1] : null;
  const payload = payloadStr ? JSON.parse(payloadStr) : {};
  return { jobId, payload };
}

module.exports = { parseArgs };
