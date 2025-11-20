import gerarId from "../shared/id";
import type ColecaoUsuario from "./ColecaoUsuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type Usuario from "./Usuario";

export default class RegistrarUsuario {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia,
	) {}

	async executar(nome: string, email: string, senha: string): Promise<Usuario> {
		const existente = await this.colecao.buscarPorEmail(email);

		if (existente) throw new Error("E-mail já cadastrado");

		const usuario: Usuario = {
			id: gerarId(),
			nome,
			email,
			senha: this.provedorCripto.criptografar(senha),
		};

		this.colecao.inserir(usuario);

		return usuario;
	}
}
