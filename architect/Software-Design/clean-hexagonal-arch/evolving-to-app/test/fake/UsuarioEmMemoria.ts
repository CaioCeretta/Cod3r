import type ColecaoUsuario from "../../src/core/usuario/ColecaoUsuario";
import type Usuario from "../../src/core/usuario/Usuario";

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
	}

	static resetar() {
		UsuarioEmMemoria.itens = [];
	}
}
