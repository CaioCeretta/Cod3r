import type CasoDeUso from "../shared/CasoDeUso";
import gerarId from "../shared/id";
import type ColecaoUsuario from "./ColecaoUsuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type Usuario from "./Usuario";

export type Entrada = {
	nome: string;
	email: string;
	senha: string;
};

export default class RegistrarUsuario implements CasoDeUso<Entrada, Usuario> {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia,
	) {}

	async executar(dto: Entrada): Promise<Usuario> {
		const senhaCripto = this.provedorCripto.criptografar(dto.senha);

		const existente = await this.colecao.buscarPorEmail(dto.email);

		if (existente) throw new Error("E-mail já cadastrado");

		const usuario: Usuario = {
			id: gerarId(),
			nome: dto.nome,
			email: dto.email,
			senha: senhaCripto,
		};

		this.colecao.inserir(usuario);

		return usuario;
	}
}
