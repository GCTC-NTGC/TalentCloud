module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/resources/assets/js"],
  setupFilesAfterEnv: [
    "./jest.setup.js",
    "./resources/assets/js/helpers/setupTests.ts",
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transformIgnorePatterns: [
    "/node_modules/(?!intl-messageformat|intl-messageformat-parser).+\\.js$",
  ],
  // junit
  reporters: ["default", "jest-junit"],
};
