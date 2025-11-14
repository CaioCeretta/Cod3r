import { Erros } from "@/constants/Erros";
import Validador from "@/utils/Validador";

export default class NomeSimples {
	readonly valor: string;

	constructor(valor: string, minimo: number, maximo: number) {
		this.valor = valor ?? "";

		const erros = Validador.combinar(
			Validador.naoVazio(this.valor, Erros.NOME_VAZIO),
			Validador.tamanhoMaiorQueOuIgual(
				this.valor,
				minimo - 1,
				Erros.NOME_PEQUENO,
			),
			Validador.tamanhoMenorQueOuIgual(this.valor, maximo, Erros.NOME_GRANDE),
		);

		if (erros) throw erros;
	}

	get completo(): string {
		return this.valor;
	}

	get pascalCase() {
		const primeiraLetraMaiuscula = (s: string) => {
			return s.charAt(0).toUpperCase() + s.substring(1).toLocaleLowerCase();
		};

		return this.valor.split(" ").map(primeiraLetraMaiuscula).join(" ");
	}
}
