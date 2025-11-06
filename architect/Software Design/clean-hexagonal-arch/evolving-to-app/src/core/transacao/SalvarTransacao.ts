import type CasoDeUso from "../shared/CasoDeUso";
import type ColecaoTransacao from "./ColecaoTransacao";
import type Transacao from "./Transacao";

export default class SalvarTransacao implements CasoDeUso<void, Transacao> {
	constructor(colecaoTransacao: ColecaoTransacao) {}

	async executar(): Promise<Transacao> {
		return {
			id: "1",
			descricao: "Salário",
			valor: 1000,
			vencimento: new Date(),
			idUsuario: "1",
		};
	}
}
