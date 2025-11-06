import type Transacao from "../../src/core/transacao/Transacao";

export default {
	completa: {
		id: "1",
		descricao: "Comida",
		valor: -100,
		vencimento: new Date("2025-10-10"),
		idUsuario: "7ae32a56-57b7-417a-a2de-8f6d496139da",
	} as Transacao,

	semId: {
		descricao: "Comida",
		valor: -100,
		vencimento: new Date("2025-10-10"),
		idUsuario: "7ae32a56-57b7-417a-a2de-8f6d496139da",
	} as Transacao,
};
