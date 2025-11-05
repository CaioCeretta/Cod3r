import type { Express, Request, Response } from "express";
import type SalvarTransacao from "./SalvarTransacao";

export default class SalvarTransacaoController {
	constructor(
		private servidor: Express,
		private casoDeUso: SalvarTransacao,
		...middleware: any[]
	) {
		const fn = async (req: Request, res: Response) => {
			try {
				const resposta = await casoDeUso.executar();
				res.status(200).json(resposta);
			} catch (err) {
				res.status(403).send(err.message);
			}
		};

		servidor.post("/transacao", middleware, fn);
	}
}
