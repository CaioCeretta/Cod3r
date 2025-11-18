import type Produto from "../../core/produto/model/Produto";
import ObterProdutos from "../../core/produto/service/ObterProdutos";
import type Conversor from "../../core/shared/Conversor";
import type BancoProdutoMemoria from "../../externa/db/BancoProdutoMemoria";
import type ProdutoDTO from "../dto/ProdutoDTO";

export default class ObterProdutosController {
	constructor(private readonly repo: BancoProdutoMemoria) {}

	async executar(): Promise<any[]> {
		const conversorSaida: Conversor<Produto, ProdutoDTO> = {
			converter(produto: Produto): ProdutoDTO {
				return {
					nome: produto.nome.completo,
					precoFormatado: produto.preco.formatado(),
				};
			},
		};

		const casoDeUso = new ObterProdutos(this.repo, conversorSaida);
		return casoDeUso.executar();
	}
}
