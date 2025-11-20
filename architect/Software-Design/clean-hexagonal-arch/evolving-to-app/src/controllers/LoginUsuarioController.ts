import type { Express, Request, Response } from "express";
import type LoginUsuario from "../core/usuario/LoginUsuario";

export default class LoginUsuarioController {
	constructor(
		private servidor: Express,
		private casoDeUso: LoginUsuario,
	) {
		servidor.post("/login", async (req: Request, res: Response) => {
			try {
				const resposta = await casoDeUso.executar({
					email: req.body.email,
					senha: req.body.senha,
				});

				res.status(200).json(resposta);
			} catch (err) {
				// 403 = forbidden
				res.status(403).send({ error: err });
			}
		});
	}
}
