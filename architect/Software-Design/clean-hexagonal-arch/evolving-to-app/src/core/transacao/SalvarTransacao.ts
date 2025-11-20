import type CasoDeUso from "../shared/CasoDeUso";
import gerarId from "../shared/id";
import type Usuario from "../usuario/Usuario";
import type ColecaoTransacao from "./ColecaoTransacao";
import type Transacao from "./Transacao";

export type Entrada = {
	transacao: Transacao;
	usuario: Usuario;
	id: string;
};

export default class SalvarTransacao implements CasoDeUso<Entrada, void> {
	constructor(private colecao: ColecaoTransacao) {}

	async executar(dto: Entrada): Promise<void> {
		if (dto.transacao.idUsuario !== dto.usuario.id) {
			throw new Error("Usuario não autorizado");
		}

		const transacao = {
			...dto.transacao,
			id: dto.id ?? gerarId(),
		};

		dto.id
			? await this.colecao.atualizar(transacao)
			: await this.colecao.adicionar(transacao);
	}
}
