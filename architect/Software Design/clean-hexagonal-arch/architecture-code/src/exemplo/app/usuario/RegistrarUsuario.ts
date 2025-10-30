import type ColecaoUsuario from "./ColecaoUsuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type Usuario from "./Usuario";

export default class RegistrarUsuario {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia,
	) {}

	executar(nome: string, email: string, senha: string): Usuario {
		const usuario: Usuario = {
			id: Math.random(),
			nome,
			email,
			senha: this.provedorCripto.criptografar(senha),
		};

		this.colecao.inserir(usuario);

		return usuario;
	}
}
