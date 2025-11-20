import type Transacao from "../../src/core/transacao/Transacao";

const transacaoRef = {
	descricao: "Comida",
	valor: -100,
	vencimento: new Date("2025-10-10"),
	idUsuario: "7ae32a56-57b7-417a-a2de-8f6d496139da",
} as Transacao;

const transacaoRef2 = {
	id: "1",
	descricao: "Comida",
	valor: -100,
	vencimento: new Date("2025-10-10"),
	idUsuario: "7ae32a56-57b7-417a-a2de-8f6d496139da",
} as Transacao;

export default {
	semId: transacaoRef,
	lista: [
		{ ...transacaoRef, valor: 3000, descricao: "Salário" },
		{ ...transacaoRef, valor: -450, descricao: "Conta de Luz" },
		{ ...transacaoRef, valor: -100, descricao: "Conta de Água" },
		{ ...transacaoRef, valor: -200, descricao: "Conta de Internet" },
	],
};
