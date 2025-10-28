/// <reference types="jest" />

import { soma } from "../src/calc";

test("Deve somar dois numeros", () => {
	expect(soma(1, 2)).toBe(3);
});
