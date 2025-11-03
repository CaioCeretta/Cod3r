import type { Express, Request, Response } from "express";
import type RegistrarUsuario from "../core/usuario/RegistrarUsuario";

export default class RegistrarUsuarioController {
	constructor(
		private servidor: Express,
		private registrarUsuario: RegistrarUsuario,
	) {
		servidor.post("/registrar", async (req: Request, res: Response) => {
			try {
				await registrarUsuario.executar(
					req.body.nome,
					req.body.email,
					req.body.senha,
				);

				res.status(201).send();
			} catch (err) {
				res.status(400).send(err.message);
			}
		});
	}
}
