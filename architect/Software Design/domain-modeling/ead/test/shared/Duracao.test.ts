import { Erros } from "@/constants/Erros";
import Duracao from "@/shared/Duracao";

test("Deve criar uma duração vazia", () => {
	expect(new Duracao().segundos).toBe(0);
	expect(new Duracao().hms).toBe("00s");
	expect(new Duracao().hm).toBe("00m");
	expect(new Duracao().zerada).toBe(true);
});

test("Deve criar uma duração zerada", () => {
	expect(new Duracao(0).segundos).toBe(0);
	expect(new Duracao(0).hms).toBe("00s");
	expect(new Duracao(0).hm).toBe("00m");
	expect(new Duracao(0).zerada).toBe(true);
});

test("Deve formatar duração em horas e minutos", () => {
	expect(new Duracao(3600).hm).toBe("01h 00m");
	expect(new Duracao(3660).hm).toBe("01h 01m");
	expect(new Duracao(180).hm).toBe("03m");
});

test("Deve formatar duração em horas, minutos e segundos", () => {
	expect(new Duracao(3601).hms).toBe("01h 00m 01s");
	expect(new Duracao(3660).hms).toBe("01h 01m 00s");
	expect(new Duracao(180).hms).toBe("03m 00s");
	expect(new Duracao(58).hms).toBe("58s");
});

test("Deve somar durações", () => {
	const d1 = new Duracao(3600);
	const d2 = new Duracao(180);
	expect(d1.somar(d2).segundos).toBe(3780);
	expect(d1.somar(d2).hm).toBe("01h 03m");
});

test("Deve comparar durações como iguais", () => {
	const d1 = new Duracao(3600);
	const d2 = new Duracao(3600);
	expect(d1.igual(d2)).toBe(true);
	expect(d1.diferente(d2)).toBe(false);
});

test("Deve comparar durações como diferentes", () => {
	const d1 = new Duracao(3600);
	const d2 = new Duracao(3601);
	expect(d1.igual(d2)).toBe(false);
	expect(d1.diferente(d2)).toBe(true);
});

test("Deve lançar um erro quando tentar criar uma duração negativa", () => {
	expect(() => new Duracao(-7)).toThrow(Erros.DURACAO_NEGATIVA);
});
