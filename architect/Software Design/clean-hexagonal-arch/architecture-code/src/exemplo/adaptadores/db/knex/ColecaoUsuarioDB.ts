import type ColecaoUsuario from "../../../app/usuario/ColecaoUsuario";
import type Usuario from "../../../app/usuario/Usuario";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
	inserir(usuario: Usuario): Promise<void> {}
}
