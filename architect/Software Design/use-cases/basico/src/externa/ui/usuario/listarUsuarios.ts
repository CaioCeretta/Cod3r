import ObterUsuarios from "../../../core/usuario/service/ObterUsuarios";
import BancoUsuarioMemoria from "../../db/BancoUsuarioMemoria";
import Terminal from "../utils/Terminal";

export default async function listarUsuarios() {
	Terminal.titulo("Listar Usuários");

	try {
		const repoUsuario = BancoUsuarioMemoria.instance;
		const casoDeUso = new ObterUsuarios(repoUsuario);

		const usuarios = await casoDeUso.executar();

		Terminal.tabela(
			usuarios.map((u) => ({
				id: u.id.valor,
				nome: u.nome.completo,
				email: u.email.valor,
			})),
		);
	} catch (e: any) {
		Terminal.erro(e.message);
	} finally {
		await Terminal.esperarEnter();
	}
}
