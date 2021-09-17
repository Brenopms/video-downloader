/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
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
    "src/**/*.ts", "!src/**/index.ts"
  ]
};