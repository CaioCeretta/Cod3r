import type Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
	buscarPorEmail(email: string): Promise<Usuario | null>;
	buscarTodos(): Promise<Usuario[]>;
	salvar(usuario: Usuario): Promise<void>;
}
