import type CasoDeUso from "../shared/CasoDeUso";
import type ColecaoUsuario from "./ColecaoUsuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type ProvedorToken from "./ProvedorToken";
import type Usuario from "./Usuario";

type Entrada = {
	email: string;
	senha: string;
};

type Saida = {
	usuario: Usuario;
	token: string;
};

export default class LoginUsuario implements CasoDeUso<Entrada, Saida> {
	constructor(
		private colecao: ColecaoUsuario,
		private provedorCripto: ProvedorCriptografia,
		private provedorToken: ProvedorToken,
	) {}

	async executar(dto: Entrada): Promise<Saida> {
		const usuario = await this.colecao.buscarPorEmail(dto.email);

		if (!usuario) {
			throw new Error("Usuario nao encontrado");
		}

		if (this.provedorCripto.comparar(dto.senha, usuario.senha)) {
			return {
				usuario: { ...usuario, senha: undefined } as Usuario,
				token: this.provedorToken.gerar({
					id: usuario.id,
					nome: usuario.nome,
					email: usuario.email,
				}),
			};
		} else {
			throw new Error("Nao foi possivel realizar o login");
		}
	}
}
