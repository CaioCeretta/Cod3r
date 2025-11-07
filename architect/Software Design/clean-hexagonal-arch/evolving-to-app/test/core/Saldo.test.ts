import Saldo from "../../src/core/transacao/Saldo";
import transacoes from "../data/transacoes";

const lista = [
	{ ...transacoes.semId, valor: 5000 },
	{ ...transacoes.semId, valor: -200 },
	{ ...transacoes.semId, valor: -1500 },
	{ ...transacoes.semId, valor: -800 },
];

test("Deve calcular o total das transacoes", () => {
	expect(new Saldo(lista).total).toBe(2500);
});

test("Deve calcular o total de receitas", () => {
	expect(new Saldo(lista).receitas).toBe(5000);
});

test("Deve calcular o total de despesas", () => {
	expect(new Saldo(lista).despesas).toBe(-2500);
});
