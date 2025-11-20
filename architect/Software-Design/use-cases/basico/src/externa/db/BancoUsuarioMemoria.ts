import type Usuario from "../../core/usuario/model/Usuario";
import type RepositorioUsuario from "../../core/usuario/provider/RepositorioUsuario";

export default class BancoUsuarioMemoria implements RepositorioUsuario {
	static readonly instance = new BancoUsuarioMemoria();

	constructor(private usuarios: Usuario[] = []) {}

	async obterPorEmail(email: string): Promise<Usuario | null> {
		return this.usuarios.find((u) => u.email.valor === email) ?? null;
	}

	async obterTodos(): Promise<Usuario[]> {
		return this.usuarios;
	}

	async salvar(usuario: Usuario): Promise<void> {
		this.usuarios.push(usuario);
	}
}
