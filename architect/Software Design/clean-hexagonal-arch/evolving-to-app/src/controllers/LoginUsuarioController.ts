import type { Express, Request, Response } from "express";
import type LoginUsuario from "../core/usuario/LoginUsuario";

export default class LoginUsuarioController {
	constructor(
		private servidor: Express,
		private casoDeUso: LoginUsuario,
	) {
		servidor.post("/login", async (req: Request, res: Response) => {
			try {
				const usuario = await casoDeUso.executar(
					req.body.email,
					req.body.senha,
				);

				res.status(200).json({
					id: usuario.id,
					nome: usuario.nome,
					email: usuario.email,
				});
			} catch (err) {
				// 403 = forbidden
				res.status(403).send({ error: err });
			}
		});
	}
}
