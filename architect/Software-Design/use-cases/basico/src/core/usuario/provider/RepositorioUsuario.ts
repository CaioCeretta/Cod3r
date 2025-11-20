import type Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
	obterPorEmail(email: string): Promise<Usuario | null>;
	obterTodos(): Promise<Usuario[]>;
	salvar(usuario: Usuario): Promise<void>;
}
