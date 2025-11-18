import LoginUsuario from "../../../core/usuario/service/LoginUsuario";
import CriptografiaPadrao from "../../auth/CriptografiaPadrao";
import BancoUsuarioMemoria from "../../db/BancoUsuarioMemoria";
import BancoEmMemoria from "../../db/BancoUsuarioMemoria";
import Sessao from "../utils/Sessao";
import Terminal from "../utils/Terminal";

export default async function loginUsuario() {
	Terminal.titulo("Login Usuário");

	const email = await Terminal.campoRequerido("Email", {
		default: "caioceretta@gmail.com",
	});
	const senha = await Terminal.campoRequerido("Senha", {
		default: "123456aA!",
	});

	try {
		const repoUsuario = BancoUsuarioMemoria.instance;
		const provedorCripto = new CriptografiaPadrao();

		const casoDeUso = new LoginUsuario(repoUsuario, provedorCripto);

		const usuario = await casoDeUso.executar({ email, senha });

		Sessao.iniciar(usuario);
		Terminal.sucesso(`Usuario ${usuario.nome.completo} logado com sucesso`);
	} catch (e: any) {
		Terminal.erro(e.message);
	} finally {
		await Terminal.esperarEnter();
	}
}
