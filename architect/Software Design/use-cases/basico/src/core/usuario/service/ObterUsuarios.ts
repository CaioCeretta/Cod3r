import type CasoDeUso from "../../shared/CasoDeUso";
import type Usuario from "../model/Usuario";
import type RepositorioUsuario from "../provider/RepositorioUsuario";

export default class ObterUsuarios implements CasoDeUso<void, Usuario[]> {
	constructor(private repo: RepositorioUsuario) {}

	async executar(): Promise<Usuario[]> {
		const usuarios = await this.repo.obterTodos();

		return usuarios.map((u) => u.semSenha());
	}
}
