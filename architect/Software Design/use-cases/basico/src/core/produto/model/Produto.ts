import Entidade, { type EntidadeProps } from "../../shared/Entidade";

import NomeSimples from "../../shared/NomeSimples";
import Preco from "../../shared/Preco";

export interface ProdutoProps extends EntidadeProps {
	nome?: string;
	preco?: number;
}

export default class Produto extends Entidade<Produto, ProdutoProps> {
	readonly nome: NomeSimples;
	readonly preco: Preco;

	constructor(props: ProdutoProps) {
		super(props);
		this.nome = new NomeSimples(props.nome!);
		this.preco = new Preco(props.preco!);
	}
}
