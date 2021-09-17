/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cache: false,
  clearMocks: true,
  restoreMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: ["node_modules", "dist"],
  modulePathIgnorePatterns: ["dist"],
  testPathIgnorePatterns: ["dist"],
  collectCoverageFrom: [
    "lib/**/*.ts", "!lib/**/index.ts"
  ]
};