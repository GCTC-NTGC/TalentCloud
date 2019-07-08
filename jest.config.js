module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/resources/assets/js"],
  setupFilesAfterEnv: [
    "@testing-library/react/cleanup-after-each",
    "./jest.setup.js",
    "./resources/assets/js/helpers/setupTests.ts",
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
