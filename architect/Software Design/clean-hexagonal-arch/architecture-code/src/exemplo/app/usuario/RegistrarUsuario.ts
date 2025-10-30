import type Colecao from "../portas/Colecao";
import type ProvedorCriptografia from "../portas/ProvedorCriptografia";

export default class RegistrarUsuario {
	constructor(
		private colecao: Colecao,
		private provedorCripto: ProvedorCriptografia,
	) {}

	executar(nome: string, email: string, senha: string) {
		const usuario = {
			id: Math.random(),
			nome,
			email,
			senha: this.provedorCripto.criptografar(senha),
		};

		this.colecao.inserir(usuario);

		return usuario;
	}
}
