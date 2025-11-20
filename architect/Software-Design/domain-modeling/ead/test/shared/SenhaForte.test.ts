import { Erros } from "@/constants/Erros";
import SenhaForte from "@/shared/SenhaForte";

test("Deve lançar erro com senha vazia", () => {
	expect(() => new SenhaForte()).toThrow(Erros.SENHA_FRACA);
	expect(() => new SenhaForte("")).toThrow(Erros.SENHA_FRACA);
});

test("Deve lançar erro com senha apenas com numeros", () => {
	expect(() => new SenhaForte("123456789")).toThrow(Erros.SENHA_FRACA);
});

test("Deve lançar erro com senha apenas com letras", () => {
	expect(() => new SenhaForte("testeee")).toThrow(Erros.SENHA_FRACA);
});

test("Deve lançar erro com senha apenas com caracteres especiais", () => {
	expect(() => new SenhaForte("@%^!%$@^%!$#%^!$#^")).toThrow(Erros.SENHA_FRACA);
});

test("Deve lançar erro com senha menor que 8 caracteres", () => {
	expect(() => new SenhaForte("%S3nh4@")).toThrow(Erros.SENHA_FRACA);
});

test("Deve criar senha forte", () => {
	const senha = "S3nh4F0rt3%";
	expect(new SenhaForte(senha).valor).toBe(senha);
});
