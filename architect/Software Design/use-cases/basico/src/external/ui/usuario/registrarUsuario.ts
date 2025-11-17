import Usuario from "../../../core/usuario/model/Usuario";
import RegistrarUsuario from "../../../core/usuario/service/RegistrarUsuario";
import CriptografiaPadrao from "../../auth/CriptografiaPadrao";
import BancoEmMemoria from "../../db/BancoEmMemoria";
import Terminal from "../utils/Terminal";

export default async function registrarUsuario() {
	Terminal.titulo("Registar Usuário");

	const nome = await Terminal.campoRequerido("Nome");
	const email = await Terminal.campoRequerido("Email");
	const senha = await Terminal.campoRequerido("Senha", {
		default: "123456",
	});

	try {
		const repositorio = BancoEmMemoria.instance;
		const provedorCripto = new CriptografiaPadrao();
		const casoDeUso = new RegistrarUsuario(provedorCripto, repositorio);
		await casoDeUso.executar({
			nome,
			email,
			senha,
		});
		Terminal.sucesso(`Usuario  registrado com sucesso!`);
	} catch (e: any) {
		Terminal.erro(e.message);
	} finally {
		await Terminal.esperarEnter();
	}
}
