module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/resources/assets/js"],
  setupFiles: ["./jest.setup.js"],
};
