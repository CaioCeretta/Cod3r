import type ColecaoUsuario from "./ColecaoUsuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type Usuario from "./Usuario";

export default class LoginUsuario {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia,
	) {}

	async executar(email: string, senha: string): Promise<Usuario> {
		const usuario = await this.colecao.buscarPorEmail(email);

		if (!usuario) {
			throw new Error("Usuario nao encontrado");
		}

		if (this.provedorCripto.comparar(senha, usuario.senha)) {
			return { ...usuario, senha: undefined };
		} else {
			throw new Error("Nao foi possivel realizar o login");
		}
	}
}
