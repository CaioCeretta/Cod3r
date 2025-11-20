import type Produto from "../model/Produto";

export default interface RepositorioProduto {
	obterPorId(id: string): Promise<Produto | null>;
	obterTodos(): Promise<Produto[]>;
	salvar(produto: Produto): Promise<void>;
}
