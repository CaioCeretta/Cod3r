import { Erros } from "@/constants/Erros";
import NomeSimples from "@/shared/NomeSimples";

test("Deve retornar o nome simples", () => {
	const nome = new NomeSimples("Arquitetura Limpa", 3, 30);
	expect(nome.completo).toBe("Arquitetura Limpa");
});

test("Deve lançar erro com nome vazio", () => {
	expect(() => new NomeSimples(undefined as any, 3, 50)).toThrow();
	expect(() => new NomeSimples("", 3, 50)).toThrow();
});

test("Deve lançar erro com nome muito pequeno", () => {
	expect(() => new NomeSimples("Ar", 4, 30)).toThrow(Erros.NOME_PEQUENO);
});

test("Deve lançar erro com nome muito grande", () => {
	expect(() => new NomeSimples("Arquitetura Limpa", 3, 10)).toThrow(
		Erros.NOME_GRANDE,
	);
});

test("Deve retornar o nome pascal case", () => {
	const nome = new NomeSimples("arquitetura limpa", 3, 30);
	expect(nome.pascalCase).toBe("Arquitetura Limpa");
});
