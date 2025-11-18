import bcrypt from "bcrypt";
import type ProvedorCriptografia from "../../core/usuario/provider/ProvedorCriptografia";

export default class CriptografiaPadrao implements ProvedorCriptografia {
	criptografar(senha: string): string {
		const salt = bcrypt.genSaltSync(10);

		return bcrypt.hashSync(senha, salt);
	}
	comparar(senha: string, hash: string): boolean {
		return bcrypt.compareSync(senha, hash);
	}
}
