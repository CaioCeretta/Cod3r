import { Erros } from "@/constants/Erros";
import NomePessoa from "@/shared/NomePessoa";

test("Deve lançar erro ao tentar criar nome vazio", () => {
	expect(() => new NomePessoa()).toThrow(Erros.NOME_VAZIO);
	expect(() => new NomePessoa("")).toThrow(Erros.NOME_VAZIO);
});

test("Deve lançar vários erros ao tentar criar nome vazio", () => {
	try {
		new NomePessoa();
	} catch (erros: any) {
		expect(erros[0].codigo).toBe(Erros.NOME_VAZIO);

		expect(erros[1].codigo).toBe(Erros.NOME_PEQUENO);
		expect(erros[1].extras.min).toBe(4);

		expect(erros[2].codigo).toBe(Erros.NOME_SEM_SOBRENOME);
	}
});

test("Deve lançar erro ao tentar criar nome menor que 4 caracteres", () => {
	expect(() => new NomePessoa("Li")).toThrow(Erros.NOME_PEQUENO);
});

test("Deve lançar erro ao tentar criar nome maior que 120 caracteres", () => {
	const nomeGigante =
		"Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga de Bragança e Habsburgo";
	expect(() => new NomePessoa(nomeGigante)).toThrow(Erros.NOME_GRANDE);
});

test("Deve lançar erro ao tentar criar nome sem sobrenome", () => {
	expect(() => new NomePessoa("Guilherme")).toThrow(Erros.NOME_SEM_SOBRENOME);
});

test("Deve lançar erro ao tentar criar nome com caracteres especiais", () => {
	expect(() => new NomePessoa("João @OOOJoao")).toThrow(
		Erros.NOME_CARACTERES_INVALIDOS,
	);
});

test("Deve criar nome e dois sobrenomes", () => {
	const nome = new NomePessoa("João Silva Pereira");
	expect(nome.completo).toBe("João Silva Pereira");
	expect(nome.primeiroNome).toBe("João");
	expect(nome.sobrenomes).toEqual(["Silva", "Pereira"]);
	expect(nome.ultimoSobrenome).toBe("Pereira");
});

test("Deve criar nome com apostrofo", () => {
	const nomeComApostrofo = "João D'Ávila";
	const nome = new NomePessoa(nomeComApostrofo);
	expect(nome.completo).toBe(nomeComApostrofo);
});
