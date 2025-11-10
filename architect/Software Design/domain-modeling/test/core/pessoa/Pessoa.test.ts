import Erros from "@/core/constants/Erros";
import Pessoa from "@/core/pessoa/Pessoa";
import Id from "@/core/shared/Id";
import PessoaBuilder from "@/test/data/PessoaBuilder";

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
	const pessoa = PessoaBuilder.criar().comNome(nome).semId().agora();

	expect(pessoa.nome.primeiroNome).toBe("Caio");
	expect(pessoa.id.novo).toBeTruthy();
});

test("Deve clonar objeto com nome alterado", () => {
	const pessoa = PessoaBuilder.criar().agora();
	const novaPessoa = pessoa.clone({ nome: "Caio Ceretta Soares" });
	expect(novaPessoa.id.valor).toBe(pessoa.id.valor);
	expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
	expect(novaPessoa.nome.completo).toBe("Caio Ceretta Soares");
});

test("Deve clonar objeto com nome alterado", () => {
	const pessoa = new Pessoa({ nome: "Caio Ceretta", cpf: "280.012.389-38" });

	const novaPessoa = pessoa.clone({ nome: "Alex Ceretta" });

	expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
	expect(novaPessoa.id.valor).toBe(pessoa.id.valor);
	expect(novaPessoa.nome.completo).toBe("Alex Ceretta");
});

test("Deve clonar objeto com id alterado", () => {
	const pessoa = new Pessoa({ nome: "Caio Ceretta", cpf: "280.012.389-38" });

	const novaPessoa = pessoa.clone({ id: Id.novo.valor });

	expect(novaPessoa.id.valor !== pessoa.id.valor).toBe(true);
	expect(novaPessoa.cpf.valor).toBe(pessoa.cpf.valor);
	expect(novaPessoa.nome.completo).toBe("Caio Ceretta");
});
