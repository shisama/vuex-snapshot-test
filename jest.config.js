module.exports = {
  moduleFileExtensions: ["js", "ts", "tsx"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/__tests__/*.(js|ts)"]
};
