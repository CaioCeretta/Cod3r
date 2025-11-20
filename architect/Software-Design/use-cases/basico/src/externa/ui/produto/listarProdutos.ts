import ObterProdutosController from "../../../adapter/controller/ObterProdutosController";
import ObterProdutos from "../../../core/produto/service/ObterProdutos";
import ListarProduto from "../../../core/produto/service/ObterProdutos";
import BancoProdutoMemoria from "../../db/BancoProdutoMemoria";
import Terminal from "../utils/Terminal";

export default async function listarProdutos() {
	Terminal.titulo("Listar Produto");

	try {
		const repo = BancoProdutoMemoria.instance;
		const ctrl = new ObterProdutosController(repo);

		const produtos = await ctrl.executar();

		Terminal.tabela(produtos);
	} catch (e: any) {
		Terminal.erro(e.message);
	} finally {
		await Terminal.esperarEnter();
	}
}
