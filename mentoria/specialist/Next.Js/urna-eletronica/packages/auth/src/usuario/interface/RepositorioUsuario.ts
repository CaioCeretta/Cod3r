import type Usuario from '../model/Usuario';

export default interface RepositorioUsuario {
	// The return type is going to be a Promise since when dealing with databases we usually work with asynchronism
	buscarPorEmail(email: string): Promise<Usuario | null>;
	buscarPorId(id: number): Promise<Usuario | null>;
	salvar(usuario: Usuario): Promise<void>;
}
