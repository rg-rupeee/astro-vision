module.exports = {
  testEnvironment: 'node',
  rootDir: '.',
  verbose: true,
  silent: false,
  setupFiles: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.spec.ts', '**/tests/**/*.e2e.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@util/(.*)$': '<rootDir>/src/util/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@interface/(.*)$': '<rootDir>/src/interface/$1',
    '^@module/(.*)$': '<rootDir>/src/module/$1',
    '^@entity/(.*)$': '<rootDir>/src/entity/$1',
    '^@database/(.*)$': '<rootDir>/src/database/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@constant/(.*)$': '<rootDir>/src/constant/$1',
    '^@repository/(.*)$': '<rootDir>/src/repository/$1',
    '^use-case/(.*)$': '<rootDir>/src/use-case/$1',
  },
};
