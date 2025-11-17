import type Usuario from "../../core/usuario/model/Usuario";
import type RepositorioUsuario from "../../core/usuario/provider/RepositorioUsuario";

export default class BancoEmMemoria implements RepositorioUsuario {
	static readonly instance = new BancoEmMemoria();

	constructor(private usuarios: Usuario[] = []) {}

	async buscarPorEmail(email: string): Promise<Usuario | null> {
		return this.usuarios.find((u) => u.email.valor === email) ?? null;
	}
	async buscarTodos(): Promise<Usuario[]> {
		return this.usuarios;
	}
	async salvar(usuario: Usuario): Promise<void> {
		this.usuarios.push(usuario);
	}
}
