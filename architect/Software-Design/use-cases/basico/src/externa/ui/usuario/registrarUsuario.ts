import Usuario from "../../../core/usuario/model/Usuario";
import RegistrarUsuario from "../../../core/usuario/service/RegistrarUsuario";
import CriptografiaPadrao from "../../auth/CriptografiaPadrao";
import BancoUsuarioMemoria from "../../db/BancoUsuarioMemoria";
import Terminal from "../utils/Terminal";

export default async function registrarUsuario() {
	Terminal.titulo("Registar Usuário");

	const nome = await Terminal.campoRequerido("Nome", {
		default: "Caio Ceretta",
	});
	const email = await Terminal.campoRequerido("Email", {
		default: "caioceretta@gmail.com",
	});
	const senha = await Terminal.campoRequerido("Senha", {
		default: "123456aA!",
	});

	try {
		const repositorio = BancoUsuarioMemoria.instance;
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
