/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  restoreMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: ["node_modules"],
  collectCoverageFrom: [
    "lib/**/*.ts", "!lib/**/index.ts"
  ]
};