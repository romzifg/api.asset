import type {Config} from "jest";

const config: Config = {
    roots: ['src'],
    moduleDirectories: ['node_modules', 'src', __dirname],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    moduleNameMapper: {
        '^@/(.*)$': ['<rootDir>/src/$1'],
    },
    verbose: true,
    forceExit: true,
    transformIgnorePatterns: [
        "/!node_modules\\/lodash-es/"
    ]
}

export default config