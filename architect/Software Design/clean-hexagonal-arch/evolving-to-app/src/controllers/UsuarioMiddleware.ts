import type { NextFunction, Request, Response } from "express";
import type ColecaoUsuario from "../core/usuario/ColecaoUsuario";
import type ProvedorToken from "../core/usuario/ProvedorToken";
import type Usuario from "../core/usuario/Usuario";

export default function UsuarioMiddleware(
	colecao: ColecaoUsuario,
	provedorToken: ProvedorToken,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		console.log("🔍 Authorization header recebido:", req.headers.authorization);

		const acessoNegado = () => res.status(403).send("Token Invalido");

		try {
			const token = req.headers.authorization.replace("Bearer ", "");

			if (!token) {
				acessoNegado();
				return;
			}

			const usuarioToken = provedorToken.validar(token) as Usuario;

			const usuario = await colecao.buscarPorEmail(usuarioToken.email);

			if (!usuario) {
				acessoNegado();
				return;
			}

			(req as any).usuario = usuario;

			next();
		} catch (err) {
			acessoNegado();
		}
	};
}
