import { Erros } from "@/constants/Erros";
import Id from "@/shared/Id";

test("Deve criar um novo id válido", () => {
	const id = Id.novo;
	expect(id.valor).toHaveLength(36);
	expect(id.novo).toBeTruthy();
});

test("Deve lançar erro ao tentar criar um id inválido", () => {
	expect(() => new Id("123")).toThrow(Erros.ID_INVALIDO);
});

test("Deve criar um novo id válido a partir de um id existente", () => {
	const valor = Id.novo.valor;
	const id = new Id(valor);
	expect(id.valor).toHaveLength(36);
	expect(id.novo).toBeFalsy();
});

test("Deve testar verdadeiro para ids iguais", () => {
	const id1 = Id.novo;
	const id2 = new Id(id1.valor);
	expect(id1.igual(id2)).toBe(true);
	expect(id1.diferente(id2)).toBe(false);
});

test("Deve testar falso para ids diferentes", () => {
	const id1 = Id.novo;
	const id2 = Id.novo;
	expect(id1.igual(id2)).toBe(false);
	expect(id1.diferente(id2)).toBe(true);
});
