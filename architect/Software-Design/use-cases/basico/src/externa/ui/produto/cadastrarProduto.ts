import Produto from "../../../core/produto/model/Produto";
import CadastrarProduto from "../../../core/produto/service/CadastrarProduto";
import RegistrarUsuario from "../../../core/usuario/service/RegistrarUsuario";
import CriptografiaPadrao from "../../auth/CriptografiaPadrao";
import BancoProdutoMemoria from "../../db/BancoProdutoMemoria";
import Terminal from "../utils/Terminal";

export default async function cadastrarProduto() {
	Terminal.titulo("Cadastrar Produto");

	const nome = await Terminal.campoRequerido("Nome");
	const preco = await Terminal.campoRequerido("Preco");

	try {
		const repositorio = BancoProdutoMemoria.instance;
		const casoDeUso = new CadastrarProduto(repositorio);
		await casoDeUso.executar(new Produto({ nome, preco: Number(preco) }));
		Terminal.sucesso(`Produto cadastrado com sucesso!`);
	} catch (e: any) {
		Terminal.erro(e.message);
	} finally {
		await Terminal.esperarEnter();
	}
}
