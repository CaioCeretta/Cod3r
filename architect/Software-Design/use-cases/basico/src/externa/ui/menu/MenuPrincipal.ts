import cadastrarProduto from "../produto/cadastrarProduto";
import listarProdutos from "../produto/listarProdutos";
import listarProduto from "../produto/listarProdutos";
import listarUsuarios from "../usuario/listarUsuarios";
import loginUsuario from "../usuario/loginUsuario";
import registrarUsuario from "../usuario/registrarUsuario";
import Sessao from "../utils/Sessao";
import Terminal from "../utils/Terminal";

export default class MenuPrincipal {
	async renderizar() {
		const usuario = Sessao.usuario;
		const [_, texto] = await Terminal.menu(
			`Menu Principal ${usuario ? ` - ${usuario.email.valor}` : ""}`,
			usuario
				? [
						"Listar Usuários",
						"Listar Produtos",
						"Cadastrar Produto",
						"Deslogar",
					]
				: ["Registrar Usuário", "Login Usuário", "Sair"],
		);
		switch (texto) {
			case "Registrar Usuário":
				await registrarUsuario();
				break;
			case "Login Usuário":
				await loginUsuario();
				break;
			case "Listar Usuários":
				await listarUsuarios();
				break;
			case "Listar Produtos":
				await listarProdutos();
				break;
			case "Cadastrar Produto":
				await cadastrarProduto();
				break;
			case "Deslogar":
				await Sessao.finalizar();
				break;
			case "Sair":
				process.exit(0);
		}

		await this.renderizar();
	}
}
