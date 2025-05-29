// jest.config.ts
export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src', // Important: this points to the folder where your .spec.ts files live
  testRegex: '.*\\.spec\\.ts$', // Looks for *.spec.ts files
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^aws/(.*)$': '<rootDir>/src/aws/$1',
  },
};
