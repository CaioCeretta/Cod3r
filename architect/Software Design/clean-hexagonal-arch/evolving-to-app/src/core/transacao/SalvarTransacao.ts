import type CasoDeUso from "../shared/CasoDeUso";
import type Transacao from "./Transacao";

export default class SalvarTransacao implements CasoDeUso<void, Transacao> {
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
