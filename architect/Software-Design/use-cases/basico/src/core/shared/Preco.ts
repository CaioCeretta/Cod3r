export default class Preco {
	constructor(readonly valor: number) {
		if (!valor) {
			throw new Error("Preço é obrigatório");
		}
		if (valor <= 0) {
			throw new Error("Preço deve ser maior que zero");
		}
	}

	formatado(padrao: string = "pt-BR", moeda: string = "BRL"): string {
		return Intl.NumberFormat(padrao, {
			style: "currency",
			currency: moeda,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(this.valor);
	}
}
