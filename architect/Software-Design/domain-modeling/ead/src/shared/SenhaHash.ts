import { Erros } from "@/constants/Erros";
import ErroValidacao from "@/error/ErroValidacao";
import type UsuarioBuilder from "@/test/data/UsuarioBuilder";

export default class SenhaHash {
	static readonly REGEX = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/;

	constructor(readonly valor?: string) {
		if (!valor || !SenhaHash.isValida(valor)) {
			ErroValidacao.lancar(Erros.SENHA_HASH_INVALIDA, valor);
		}
	}

	static isValida(hash: string): boolean {
		return SenhaHash.REGEX.test(hash);
	}
}
