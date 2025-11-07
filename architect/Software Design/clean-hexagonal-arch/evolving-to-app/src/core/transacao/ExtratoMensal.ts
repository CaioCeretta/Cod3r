import type CasoDeUso from "../shared/CasoDeUso";
import type Usuario from "../usuario/Usuario";
import type ColecaoTransacao from "./ColecaoTransacao";
import type { SaldoDTO } from "./Saldo";
import Saldo from "./Saldo";
import type Transacao from "./Transacao";

export type InputDTO = { usuario: Usuario; ano: number; mes: number };

export type OutputDTO = { transacoes: Transacao[]; saldo: SaldoDTO };

export default class ExtractoMensal implements CasoDeUso<InputDTO, OutputDTO> {
	constructor(private colecao: ColecaoTransacao) {}

	async executar(dto: InputDTO): Promise<OutputDTO> {
		const transacoes = await this.colecao.buscarPorMes(
			dto.usuario.id,
			dto.ano,
			dto.mes,
		);

		return {
			transacoes,
			saldo: new Saldo(transacoes).dto,
		};
	}
}
