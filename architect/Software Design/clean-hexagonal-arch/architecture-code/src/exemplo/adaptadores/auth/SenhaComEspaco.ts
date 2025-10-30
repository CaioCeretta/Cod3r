import type ProvedorCriptografia from "../../app/portas/ProvedorCriptografia";

export default class SenhaComEspaco implements ProvedorCriptografia {
	comparar(senha: string, senhaCriptografada: string): boolean {
		const senhaFornecida = this.criptografar(senha);

		return senhaFornecida === senhaCriptografada;
	}

	criptografar(senha: string) {
		return senha.split("").join(" ");
	}
}
