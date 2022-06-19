export default {
  roots: ['<rootDir>/src'],
  bail: true,
  clearMocks: true,
  // collectCoverageFrom: [
  //   '<rootDir>/src/modules/**/useCases/**/*.ts'
  // ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    "text-summary",
    "lcov",
  ],
  preset: "ts-jest",
  testMatch: [
    '**/*.spec.ts'
  ],
};