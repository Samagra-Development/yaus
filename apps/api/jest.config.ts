/* eslint-disable */
export default {
  displayName: "api",
  preset: "../../jest.preset.js",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  transformIgnorePatterns: [
    "[/\\\\]node_modules(?![\\/\\\\](monaco-editor|weak-lru-cache|ordered-binary))[/\\\\].+\\.js$",
  ],
  coverageDirectory: "../../coverage/apps/api",
};
