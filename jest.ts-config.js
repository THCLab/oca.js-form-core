module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    "<rootDir>/src",
    "<rootDir>/test",
  ],
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  moduleNameMapper: {
    '^@test(.*)$': "<rootDir>test/$1",
  },
  clearMocks: true,
};
