import Erros from "@/core/constants/Erros";
import Pessoa from "@/core/pessoa/Pessoa";
import Id from "@/core/shared/Id";

// import PessoaBuilder from "@/test/data/PessoaBuilder";

test("Deve lançar erro ao tentar criar uma pessoa com nome vazio", () => {
	expect(() => new Pessoa({ nome: "" })).toThrow(Erros.NOME_VAZIO);
});

// test("Deve lançar erro ao tentar criar uma pessoa sem cpf", () => {
// 	expect(() => PessoaBuilder.criar().semCpf().agora()).toThrow(
// 		Erros.CPF_INVALIDO,
// 	);
// });

test("Deve criar uma pessoa válida", () => {
	const nome = "Caio Ceretta Soares";
	const pessoa = new Pessoa({ nome });

	expect(pessoa.nome.primeiroNome).toBe("Caio");
});

// test("Deve clonar objeto com nome alterado", () => {
// 	const pessoa = PessoaBuilder.criar().agora();
// 	const novaPessoa = pessoa.clone({ nome: "Pedro Augusto Pereira" });
// 	expect(novaPessoa.id.valor).toBe(pessoa.id.valor);
// 	expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
// 	expect(novaPessoa.nome.completo).toBe("Pedro Augusto Pereira");
// });

// test("Deve clonar objeto com id alterado", () => {
// 	const pessoa = PessoaBuilder.criar().agora();
// 	const novaPessoa = pessoa.clone({ id: Id.novo.valor });
// 	expect(novaPessoa.id.valor !== pessoa.id.valor).toBe(true);
// 	expect(novaPessoa.nome.completo).toBe(pessoa.nome.completo);
// 	expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
// });
