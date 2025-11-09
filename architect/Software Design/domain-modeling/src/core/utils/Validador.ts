/** biome-ignore-all lint/complexity/noStaticOnlyClass: Course  */
/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
export default class Validador {
	static combinar(...erros: (string | null)[]): string[] | null {
		const errosFiltrados = erros.filter((erro) => erro !== null) as string[];
		return errosFiltrados.length > 0 ? errosFiltrados : null;
	}

	static naoNulo(valor: any, erro: string): string | null {
		return valor !== null && valor !== undefined ? null : erro;
	}

	static naoVazio(
		valor: string | null | undefined,
		erro: string,
	): string | null {
		if (Validador.naoNulo(valor, erro)) return erro;

		return valor!.trim() !== "" ? null : erro;
	}

	static tamanhoMenorQue(
		valor: string | any[],
		tamanhoMaximo: number,
		erro: string,
	): string | null {
		return valor.length < tamanhoMaximo ? null : erro;
	}

	static tamanhoMaiorQue(
		valor: string | any[],
		tamanhoMinimo: number,
		erro: string,
	): string | null {
		return valor.length > tamanhoMinimo ? null : erro;
	}

	static regex(valor: string, regex: RegExp, erro: string): string | null {
		return regex.test(valor) ? null : erro;
	}

	static isEmailValido(email: string): boolean {
		const regex =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
		return regex.test(email);
	}
}
