import type { Config } from "jest";
import type { JestConfigWithTsJest } from "ts-jest";

// Use the ES Module syntax (import and export default)
const config: JestConfigWithTsJest = {
	// 1. The ESM Preset is the core transpilation engine
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",

	// 2. Extensions - Essential for ESM mode
	moduleFileExtensions: ["ts", "js", "json", "node"],
	extensionsToTreatAsEsm: [".ts"],

	// 3. Module Mapping (Crucial for resolving imports without the .js extension under 'nodenext')
	moduleNameMapper: {
		// Maps imports without extension or using the .js extension back to the source file
		"^(\\.{1,2}/.*)$": "$1",
	},

	// 4. TypeScript Configuration in Transform (To inject the custom tsconfig for tests)
	transform: {
		// Apply the ts-jest ESM transformer
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				// Use the specific configuration file for tests
				tsconfig: "tsconfig.test.json",
				// Ensures isolated module mode is applied (essential for nodenext and ts-jest)
				isolatedModules: true,
			},
		],
	},
};

// Export the configuration using ES Module syntax
export default config;
