import type CasoDeUso from "../../shared/CasoDeUso";
import Email from "../../shared/Email";
import type Usuario from "../model/Usuario";
import type ProvedorCriptografia from "../provider/ProvedorCriptografia";
import type RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = { email: string; senha: string };

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
	constructor(
		private repo: RepositorioUsuario,
		private provedorCripto: ProvedorCriptografia,
	) {}

	async executar(entrada: Entrada): Promise<Usuario> {
		const email = new Email(entrada.email);

		const usuario = await this.repo.obterPorEmail(email.valor);
		if (!usuario) throw new Error("Usuário não encontrado");

		const mesmaSenha = this.provedorCripto.comparar(
			entrada.senha,
			usuario.senha!.hash,
		);

		console.log(mesmaSenha);
		if (!mesmaSenha) throw new Error("Senha incorreta");

		return usuario.semSenha();
	}
}
