import type ColecaoUsuario from "../../app/usuario/ColecaoUsuario";
import type Usuario from "../../app/usuario/Usuario";

export default class UsuarioEmMemoria implements ColecaoUsuario {
	private static itens: Usuario[] = [];

	async buscarPorEmail(email: string): Promise<Usuario | null> {
		const usuario = UsuarioEmMemoria.itens.find(
			(usuario) => usuario.email === email,
		);

		return usuario ?? null;
	}

	async inserir(item: Usuario): Promise<void> {
		UsuarioEmMemoria.itens.push(item);

		return Promise.resolve();
	}

	static resetar() {
		UsuarioEmMemoria.itens = [];
	}
}
