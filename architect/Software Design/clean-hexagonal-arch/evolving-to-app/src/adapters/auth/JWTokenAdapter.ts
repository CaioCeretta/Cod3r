import jwt from "jsonwebtoken";
import type ProvedorToken from "../../core/usuario/ProvedorToken";

export default class JwtAdapter implements ProvedorToken {
	constructor(private secret: string) {}

	gerar(payload: string | object): string {
		return jwt.sign(payload, this.secret, { expiresIn: "1d" });
	}

	validar(token: string): string | object {
		return jwt.verify(token.replace("Bearer", ""), this.secret);
	}
}
