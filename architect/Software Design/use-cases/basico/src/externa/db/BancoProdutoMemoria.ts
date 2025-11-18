import type Produto from "../../core/produto/model/Produto";
import type RepositorioProduto from "../../core/produto/provider/RepositorioProduto";

export default class BancoProdutoMemoria implements RepositorioProduto {
	static readonly instance = new BancoProdutoMemoria();

	constructor(private produtos: Produto[] = []) {}
	async obterTodos(): Promise<Produto[]> {
		return this.produtos;
	}

	async obterPorId(id: string): Promise<Produto | null> {
		return this.produtos.find((p) => p.id.valor === id) ?? null;
	}

	async salvar(produto: Produto): Promise<void> {
		this.produtos.push(produto);
	}
}
