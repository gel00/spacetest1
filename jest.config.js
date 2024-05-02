module.exports = {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],

  // A map from regular expressions to paths to transformers
  moduleNameMapper: {
    // Handle CSS imports (using jest-transform-stub)
    '\\.(css|less|scss|sass)$': 'jest-transform-stub',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub'
  },

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    '/node_modules/'
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  transform: {
    // Use `babel-jest` to transpile tests with the next babel preset
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // Use `jest-transform-stub` for CSS and other file types normally not handled by JS
    '^.+\\.css$': 'jest-transform-stub'
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true
}
