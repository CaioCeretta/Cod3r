import { faker } from "@faker-js/faker";
import { generate as cpf } from "gerador-validador-cpf";
import type { PessoaProps } from "@/core/pessoa/Pessoa";
import Pessoa from "@/core/pessoa/Pessoa";
import Id from "@/core/shared/Id";

export default class PessoaBuilder {
	private constructor(private props: PessoaProps) {}

	static criar() {
		return new PessoaBuilder({
			id: Id.novo.valor,
			nome: faker.person.fullName(),
			cpf: cpf(),
		});
	}

	static criarListaDePessoas(qtde: number = 10) {
		return Array(qtde)
			.fill(0)
			.map(() => {
				return PessoaBuilder.criar().agora();
			});
	}

	comNome(nome: string): PessoaBuilder {
		this.props.nome = nome;

		return this;
	}

	semNome(): PessoaBuilder {
		this.props.nome = undefined;
		return this;
	}

	comId(id: string): PessoaBuilder {
		this.props.id = id;
		return this;
	}

	semId(): PessoaBuilder {
		this.props.id = undefined;
		return this;
	}

	comCpf(cpf: string): PessoaBuilder {
		this.props.cpf = cpf;
		return this;
	}

	semCpf() {
		this.props.cpf = "";
		return this;
	}

	agora() {
		return new Pessoa(this.props);
	}
}
