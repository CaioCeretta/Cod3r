import type BancoProdutoMemoria from "../../../externa/db/BancoProdutoMemoria";
import type CasoDeUso from "../../shared/CasoDeUso";
import type Conversor from "../../shared/Conversor";
import Id from "../../shared/Id";
import type Produto from "../model/Produto";

export default class ObterProdutos implements CasoDeUso<void, any[]> {
	constructor(
		private readonly repo: BancoProdutoMemoria,
		private readonly conversorSaida: Conversor<Produto, any>,
	) {}

	async executar(): Promise<any[]> {
		const produtos = await this.repo.obterTodos();
		return produtos.map((produto) => this.conversorSaida.converter(produto));
	}
}
