const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'public/coverageReports',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    "^@actions(.*)$": "<rootDir>/src/actions$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@config(.*)$": "<rootDir>/config$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@reducers(.*)$": "<rootDir>/src/reducers$1",
    "^@src(.*)$": "<rootDir>/src$1",
  },
  preset: 'ts-jest',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report'
      },
    ],
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  testRegex: ['spec\/.+-spec\.tsx?$'],
  verbose: true,
}
