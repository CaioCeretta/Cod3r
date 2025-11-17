import registrarUsuario from "../usuario/registrarUsuario";
import Terminal from "../utils/Terminal";

export default class MenuPrincipal {
	async renderizar() {
		const [_, texto] = await Terminal.menu("Menu Principal", [
			"Registrar Usuário",
			"Opcao 2",
			"Sair",
		]);
		switch (texto) {
			case "Registrar Usuário":
				await registrarUsuario();
				break;
			case "Opcao 2":
				console.log("Opcao 2");
				break;
			case "Sair":
				process.exit(0);
		}

		await this.renderizar();
	}
}
