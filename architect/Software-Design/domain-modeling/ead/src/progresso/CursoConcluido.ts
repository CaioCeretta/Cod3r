import type Email from "@/shared/Email";
import type EventoDominio from "@/shared/EventoDominio";
import type Id from "@/shared/Id";

export default class CursoConcluido implements EventoDominio {
	constructor(
		readonly emailUsuario: Email,
		readonly idCurso: Id,
		readonly data: Date,
	) {}
}
