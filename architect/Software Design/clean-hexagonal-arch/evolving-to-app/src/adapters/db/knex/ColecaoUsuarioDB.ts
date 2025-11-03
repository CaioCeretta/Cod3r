import type ColecaoUsuario from "../../../core/usuario/ColecaoUsuario";
import type Usuario from "../../../core/usuario/Usuario";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
	async buscarPorEmail(email: string): Promise<Usuario | null> {
		const resultado = await conexao.table("usuarios").where({ email }).first();

		return resultado ?? null;
	}

	async login(email: string, password: string): Promise<Usuario | null> {
		try {
			const usuario = await conexao
				.table("usuarios")
				.where({ email: email, password: password })
				.first();

			return usuario ?? null;
		} catch (error) {
			// DB error
			throw new Error("Erro ao tentar realizar login");
		}
	}

	async inserir(usuario: Usuario): Promise<void> {
		await conexao.table("usuarios").insert(usuario);
	}
}
