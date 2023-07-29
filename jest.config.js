/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  collectCoverage: false,
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['apps', 'libs'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      lines: 90,
      statements: 90,
      functions: 80,
      branches: 60,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  coverageReporters: ['json-summary', 'lcov'],
  setupFiles: ['<rootDir>/test/setup-tests.ts'],
}
