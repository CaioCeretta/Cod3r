import type Transacao from "./Transacao";

export interface SaldoDTO {
	total: number;
	receitas: number;
	despesas: number;
}

export default class Saldo {
	constructor(private transacoes: Transacao[]) {}

	get dto(): SaldoDTO {
		return {
			total: this.total,
			receitas: this.receitas,
			despesas: this.despesas,
		};
	}

	get total(): number {
		// reducer reminder, on each iteration, the first parameter of the reducer callback, "carries" the value.
		return this.transacoes.reduce(this._totalizar, 0);
	}

	get receitas(): number {
		return this.transacoes
			.filter((el) => el.valor > 0)
			.reduce(this._totalizar, 0);
	}

	get despesas(): number {
		return this.transacoes
			.filter((el) => el.valor < 0)
			.reduce(this._totalizar, 0);
	}

	private _totalizar(total: number, transacao: Transacao) {
		return total + +transacao.valor;
	}
}
