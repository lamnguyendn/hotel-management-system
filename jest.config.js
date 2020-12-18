module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'scss'],
  testRegex: '(/__tests__/.*|(\\.|/)|(test|spec))\\.(ts|tsx|js|jsx)$',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(ts|tsx|js|jsx)', '!**/*.d.ts', '!**/*.stories.tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
