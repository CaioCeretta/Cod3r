import { Erros } from "@/constants/Erros";
import SenhaHash from "@/shared/SenhaHash";

test("Deve lançar erro com senha apenas com números", () => {
	expect(() => new SenhaHash("1234567890")).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test("Deve lançar erro com senha apenas com letras", () => {
	expect(() => new SenhaHash("AbCdEfGhIj")).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test("Deve lançar erro com senha apenas com caracteres especiais", () => {
	expect(() => new SenhaHash("!@#$%¨&*()_+")).toThrow(
		Erros.SENHA_HASH_INVALIDA,
	);
});

test("Deve lançar erro com senha com menos de 8 caracteres", () => {
	expect(() => new SenhaHash("%S3nh4%")).toThrow(Erros.SENHA_HASH_INVALIDA);
});

test("Deve criar senha com hash válido", () => {
	const hashs = [
		"$2a$08$BXiml0an1MG9lZ/5Tcm1sO1Kl1QMttGxd0Eba9DtTRJkTe9BzY/L6",
		"$2a$08$7uZhkstRVOk84If8gt0r4eWih3nfGdWduZpIcj1MzNJiS.UgIEF7.",
		"$2a$13$VHgPnA1ymVG3QsTyCZ8GG.IfZ4jljSbI/MSgRSx6Tbj2jXxfgdjoC",
		"$2a$13$7/Gb19Ma6OsiFR/UsGBMKej/Eun98.d2x0IUtGku1gh4FCZEpRVfq",
	];

	expect(new SenhaHash(hashs[0])).toBeDefined();
	expect(new SenhaHash(hashs[1])).toBeDefined();
	expect(new SenhaHash(hashs[2])).toBeDefined();
	expect(new SenhaHash(hashs[3])).toBeDefined();
});
