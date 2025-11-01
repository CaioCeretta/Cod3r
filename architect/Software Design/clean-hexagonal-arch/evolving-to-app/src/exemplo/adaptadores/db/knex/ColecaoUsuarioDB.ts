import type ColecaoUsuario from "../../../app/usuario/ColecaoUsuario";
import type Usuario from "../../../app/usuario/Usuario";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
	async buscarPorEmail(email: string): Promise<Usuario | null> {
		const resultado = await conexao.table("usuarios").where({ email }).first();

		return resultado ?? null;
	}

	async inserir(usuario: Usuario): Promise<void> {
		await conexao.table("usuarios").insert(usuario);
	}
}
