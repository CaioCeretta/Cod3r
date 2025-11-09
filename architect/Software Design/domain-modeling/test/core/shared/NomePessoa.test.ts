import { Erros } from "@/core/constants/Erros";
import NomePessoa from "@/core/shared/NomePessoa";

test("Deve lançar erro ao tentar criar nome vazio", () => {
	expect(() => new NomePessoa("")).toThrow(Erros.NOME_VAZIO);
	expect(() => new NomePessoa()).toThrow(Erros.NOME_VAZIO);
});

test("Deve lançar erro ao tentar criar nome menor que 4 caracteres", () => {
	expect(() => new NomePessoa("Caio Ceretta")).toThrow(Erros.NOME_PEQUENO);
});

test("Deve lançar erro ao tentar criar nome maior que 120 caracteres", () => {
	const nomeGigante =
		"Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo";
	expect(() => new NomePessoa(nomeGigante)).toThrow(Erros.NOME_GRANDE);
});

test("Deve lançar erro ao tentar criar nome sem sobrenome", () => {
	expect(() => new NomePessoa("Caio")).toThrow(Erros.NOME_SEM_SOBRENOME);
});

test("Deve lançar erro ao tentar criar nome com caracteres especiais", () => {
	expect(() => new NomePessoa("Caio @OOOEretta")).toThrow(
		Erros.NOME_CARACTERES_INVALIDOS,
	);
});

test("Deve criar nome e dois sobrenomes", () => {
	const nome = new NomePessoa("Caio Ceretta Soares");
	expect(nome.completo).toBe("Caio Ceretta Soares");
	expect(nome.primeiroNome).toBe("Caio");
	expect(nome.sobrenomes).toEqual(["Ceretta", "Soares"]);
	expect(nome.ultimoSobrenome).toBe("Soares");
});
