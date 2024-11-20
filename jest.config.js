/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testTimeout: 60000 * 5,
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};