import type ColecaoTransacao from "../../core/transacao/ColecaoTransacao";
import type Transacao from "../../core/transacao/Transacao";
import conexao from "./conexao";

export default class ColecaoTransacaoDB implements ColecaoTransacao {
	adicionar(transacao: Transacao): Promise<void> {
		return conexao.table("transacoes").insert(this._praTabela(transacao));
	}

	atualizar(transacao: Transacao): Promise<void> {
		return conexao
			.table("transacoes")
			.where("id", transacao.id)
			.update(this._praTabela(transacao));
	}

	async buscarPorId(idUsuario: string, id: string): Promise<Transacao | null> {
		const transacoes = await conexao
			.table("transacoes")
			.where({ id, usuario_id: idUsuario });

		if (transacoes.length === 0) return null;

		return this._daTabela(transacoes[0]);
	}

	async buscarPorMes(
		idUsuario: string,
		ano: number,
		mes: number,
	): Promise<Transacao[] | []> {
		const transacoes = await conexao
			.table("transacoes")
			.where("usuario_id", idUsuario)
			.whereRaw("extract(year from vencimento) = ?", ano)
			.whereRaw("extract(month from vencimento) = ?", mes);

		return transacoes.map(this._daTabela);
	}

	private _praTabela(transacao: Transacao): any {
		return {
			id: transacao.id,
			descricao: transacao.descricao,
			valor: transacao.valor,
			vencimento: transacao.vencimento.toISOString(),
			usuario_id: transacao.idUsuario,
		};
	}

	private _daTabela(transacao: any): Transacao {
		return {
			...transacao,
			idUsuario: transacao.usuario_id,
		};
	}
}
