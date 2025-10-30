import type Usuario from "./Usuario";

export default interface ColecaoUsuario {
	inserir(usuario: Usuario): Promise<void>;
}
