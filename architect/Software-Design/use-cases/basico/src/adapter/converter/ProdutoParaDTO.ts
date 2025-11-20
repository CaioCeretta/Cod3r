import type Produto from "../../core/produto/model/Produto";
import type Conversor from "../../core/shared/Conversor";
import type ProdutoDTO from "../dto/ProdutoDTO";

export default class ProdutoParaDTO implements Conversor<Produto, ProdutoDTO> {
	constructor(private temId: boolean = true) {}

	converter(produto: Produto): ProdutoDTO {
		const produtoDTO: ProdutoDTO = {
			nome: produto.nome.completo,
			precoFormatado: produto.preco.formatado(),
		};

		if (this.temId) produtoDTO.id = produto.id.valor;

		return produtoDTO;
	}
}
