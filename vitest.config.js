/** @type {import('vitest').UserConfig} */
module.exports = {
  test: {
    globals: true,
    environment: "node",
    include: ["tests/unit/**/*.test.js"],
    testTimeout: 10000,
  },
};
