/** biome-ignore-all lint/complexity/noStaticOnlyClass: <Course> */
import type Usuario from "../../../core/usuario/model/Usuario";
import type { UsuarioProps } from "../../../core/usuario/model/Usuario";

export default class Sessao {
	private static _usuario: Usuario | null = null;

	static iniciar(usuario: Usuario) {
		Sessao._usuario = usuario;
	}

	static finalizar() {
		Sessao._usuario = null;
	}

	static get usuario(): Usuario | null {
		return Sessao._usuario;
	}
}
