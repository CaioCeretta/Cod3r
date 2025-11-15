import Validador from "@/utils/Validador";

test("Deve retornar null com texto não nulo", () => {
	const erro = Validador.naoNulo("Buongiorno", "Invalid Text");
	expect(erro).toBeNull();
});

test("Deve retornar erro com texto null para funçao naoNulo", () => {
	const msgErro = "Texto Inválido";
	const erro = Validador.naoNulo(null, msgErro);
	expect(erro?.codigo).toBe(msgErro);
});

test("Deve retornar null com text nao vazio", () => {
	const erro = Validador.naoVazio("ABC", "Texto Vazio");

	expect(erro).toBeNull();
});

test("Deve retornar erro com texto vazio", () => {
	const msgErro = "Texto Inválido";
	const e1 = Validador.naoVazio("    ", msgErro);
	expect(e1?.codigo).toBe(msgErro);
});

test("Deve retornar erro com texto null para funçao naoVazio", () => {
	const msgErro = "texto inválido";
	const e1 = Validador.naoVazio(null, msgErro);
	expect(e1?.codigo).toBe(msgErro);
});

test("Deve retornar erro com texto undefined", () => {
	const msgErro = "texto inválido";
	const e1 = Validador.naoVazio(undefined, msgErro);
	expect(e1?.codigo).toBe(msgErro);
});

test("Deve retornar nulo com texto menor o tamanho maximo", () => {
	const msgErro = "Tamanho menor que o tamanho maximo";
	const e1 = Validador.tamanhoMenorQue("teste", 6, msgErro);
	expect(e1).toBeNull();
});

test("Deve retornar nulo com texto maior o tamanho maximo", () => {
	const msgErro = "Texto maior que o maximo";
	const e1 = Validador.tamanhoMenorQue("teste123", 6, msgErro);
	expect(e1?.codigo).toBe(msgErro);
});

test("Deve retornar nulo com texto maior o tamanho mínimo", () => {
	const msgErro = "Texto menor que o tamanho mínimo";
	const e1 = Validador.tamanhoMaiorQue("teste123", 6, msgErro);
	expect(e1).toBeNull();
});

test("Deve retornar erro com texto menor o tamanho mínimo", () => {
	const msgErro = "Texto menor que o tamanho mínimo";
	const e1 = Validador.tamanhoMaiorQue("teste", 6, msgErro);
	expect(e1?.codigo).toBe(msgErro);
});

test("Deve retornar erro com texto maior ou igual que o tamanho máximo", () => {
	const erro = Validador.tamanhoMenorQue("Bom dia", 7, "erro");
	expect(erro?.codigo).toBe("erro");
});

test("Deve retornar null com texto menor ou igual que o tamanho máximo", () => {
	const erro = Validador.tamanhoMenorQueOuIgual("teste", 5, "erro");
	expect(erro).toBeNull();
});

test("Deve validar via regex que só tem números", () => {
	const erro = Validador.regex("12345678900", /\d{11}/, "erro");
	expect(erro).toBeNull();
});

test("Deve retornar um erro via validação de números", () => {
	const erro = Validador.regex("123456a89", /\d{11}/, "erro");
	expect(erro?.codigo).toBe("erro");
});

test("Deve combinar com erros", () => {
	const erros = Validador.combinar(
		Validador.naoVazio("", "erro1"),
		Validador.naoVazio("", "erro2"),
		Validador.naoVazio("", "erro3"),
		Validador.naoVazio("Teste", "nao erro 4"),
		Validador.naoVazio("", "erro5"),
	);

	expect(erros?.map((e) => e.codigo).join(", ")).toBe(
		"erro1, erro2, erro3, erro5",
	);
});

test("Deve combinar sem erros", () => {
	const erros = Validador.combinar(
		Validador.naoVazio("1", "erro1"),
		Validador.naoVazio("2", "erro2"),
		Validador.naoVazio("3", "erro3"),
		Validador.naoVazio("Teste", "nao erro 4"),
		Validador.naoVazio("5", "erro5"),
	);

	expect(erros).toBeNull();
});
