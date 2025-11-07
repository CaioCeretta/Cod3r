import type { Express, Request, Response } from "express";
import type ExtractoMensal from "./ExtratoMensal";

export default class ExtratoMensalController {
	constructor(
		private servidor: Express,
		private casoDeUso: ExtractoMensal,
		...middleware: any[]
	) {
		const fn = async (req: Request, res: Response) => {
			try {
				const extratoMes = await casoDeUso.executar({
					usuario: (req as any).usuario,
					ano: +req.params.ano,
					mes: +req.params.mes,
				});
				res.status(200).json(extratoMes);
			} catch (err) {
				res.status(400).send(err.message);
			}
		};

		servidor.get("/extrato/:ano/:mes", middleware, fn);
	}
}
