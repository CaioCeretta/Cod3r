import Cpf from "../shared/Cpf";
import Entidade, { type EntidadeProps } from "../shared/Entidade";
import NomePessoa from "../shared/NomePessoa";

export interface PessoaProps extends EntidadeProps {
	nome?: string;
	cpf?: string;
}

export default class Pessoa extends Entidade<Pessoa, PessoaProps> {
	readonly nome: NomePessoa;
	readonly cpf: Cpf;

	constructor(props: PessoaProps) {
		super(props);

		this.nome = new NomePessoa(props.nome);
		this.cpf = new Cpf(props.cpf);
	}
}
