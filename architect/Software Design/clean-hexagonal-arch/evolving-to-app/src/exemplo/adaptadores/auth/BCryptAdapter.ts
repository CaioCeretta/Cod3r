import bcrypt from "bcrypt";
import type ProvedorCriptografia from "../../app/usuario/ProvedorCriptografia";

export default class BCryptAdapter implements ProvedorCriptografia {
	criptografar(senha: string) {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(senha, salt);
	}

	comparar(senha: string, senhaCriptografada: string): boolean {
		return bcrypt.compareSync(senha, senhaCriptografada);
	}
}
