import { Erros } from "@/constants/Erros";
import Ordem from "@/shared/Ordem";

test("Deve criar ordem como 1", () => {
	const ordem = new Ordem();
	expect(ordem.valor).toBe(1);
});

test("Deve criar ordem como 1000", () => {
	const ordem = new Ordem(1000);
	expect(ordem.valor).toBe(1000);
});

test("Deve lançar erro com ordem zerada", () => {
	expect(() => new Ordem(0)).toThrow(Erros.ORDEM_INVALIDA);
});

test("Deve lançar erro com ordem negativa", () => {
	expect(() => new Ordem(-10)).toThrow(Erros.ORDEM_INVALIDA);
});

test("Deve comparar duas ordens para ordenação", () => {
	const ordem1 = new Ordem(1);
	const ordem2a = new Ordem(2);
	const ordem2b = new Ordem(2);
	expect(ordem1.comparar(ordem2a)).toBe(-1);
	expect(ordem2a.comparar(ordem1)).toBe(1);
	expect(ordem2a.comparar(ordem2b)).toBe(0);
});

test("Deve comparar duas ordens como iguais", () => {
	const ordem1a = new Ordem(1);
	const ordem1b = new Ordem(1);
	expect(ordem1a.igual(ordem1b)).toBe(true);
	expect(ordem1a.diferente(ordem1b)).toBe(false);
});

test("Deve comparar duas ordens como diferentes", () => {
	const ordem1 = new Ordem(1);
	const ordem2 = new Ordem(2);
	expect(ordem1.igual(ordem2)).toBe(false);
	expect(ordem1.diferente(ordem2)).toBe(true);
});

test("Deve ordernar corretamente", () => {
	const itens = [
		{ ordem: new Ordem(3) },
		{ ordem: new Ordem(1) },
		{ ordem: new Ordem(2) },
	];
	itens.sort(Ordem.ordenar);
	expect(itens[0].ordem.valor).toBe(1);
	expect(itens[1].ordem.valor).toBe(2);
	expect(itens[2].ordem.valor).toBe(3);
});
