export default class InverterSenha {
	cripto(senha: string) {
		return senha.split("").reverse().join("");
	}
}
