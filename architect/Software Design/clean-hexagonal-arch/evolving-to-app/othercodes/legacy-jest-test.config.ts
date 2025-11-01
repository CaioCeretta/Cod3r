// // The type assertion for configuration
// import type { JestConfigWithTsJest } from "ts-jest";

// const config: JestConfigWithTsJest = {
// 	// 1. ESM Preset is the most important. It configures the transform and globals correctly

// 	preset: "ts-jest/presets/default-esm",
// 	testEnvironment: "node",

// 	// 2. Extensions - Essential to ESM
// 	moduleFileExtensions: ["ts", "js", "json", "node"],
// 	extensionsToTreatAsEsm: [".ts"], // required for ESM

// 	//3. Mappings for files resolution
// 	// Crucial for the interoperability between imports .js and ts files inside nodenext
// 	moduleNameMapper: {
// 		// When we import 'module.js' in our .ts, he redirects it to .ts for for Jest
// 		"^(\\.{1,2}/.*)\\.js$": "$1",
// 	},

// 	// 4. Compiler settings (needed to point to the tsconfig.test)

// 	transform: {
// 		"^.+\\.tsx?$": [
// 			"ts-jest",
// 			{
// 				// Adds the options not covered by the preset
// 				tsconfig: "tsconfig.test.json",
// 				// Also add the isolatedModules here, to make sure that jest applies it.
// 				isolatedModules: true,
// 				useESM: true, // Essential to work with  "type": "module"
// 			},
// 		],
// 	},
// };

// export default config;
