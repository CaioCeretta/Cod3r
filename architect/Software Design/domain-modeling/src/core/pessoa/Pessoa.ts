import Cpf from "../shared/Cpf";
import Id from "../shared/Id";
import NomePessoa from "../shared/NomePessoa";

export interface PessoaProps {
	id?: string;
	nome?: string;
	cpf?: string;
}

export default class Pessoa {
	readonly props: PessoaProps;
	readonly id: Id;
	readonly nome: NomePessoa;
	readonly cpf: Cpf;

	constructor(props: PessoaProps) {
		this.props = props;
		this.nome = new NomePessoa(props.nome);
		this.id = new Id(props.id);
		this.cpf = new Cpf(props.cpf);
	}
}
