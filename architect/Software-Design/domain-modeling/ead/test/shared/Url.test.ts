import { Erros } from "@/constants/Erros";
import Url from "@/shared/Url";

test("Deve retornar o dominio completo da url", () => {
	const url = new Url("https://www.google.com/search?q=typescript");
	expect(url.dominio).toBe("www.google.com");
});

test("Deve retornar o protocolo da url", () => {
	const url = new Url("https://www.google.com/search?q=typescript");
	expect(url.protocolo).toBe("https:");
});

test("Deve retornar o caminho da url", () => {
	const url = new Url("https://www.google.com/search?q=typescript");
	expect(url.caminho).toBe("/search");
});

test("Deve retornar os parametros da url", () => {
	const url = new Url("https://www.google.com/search?q=typescript&hl=pt-BR");
	expect(url.parametros).toEqual({ q: "typescript", hl: "pt-BR" });
	expect(url.parametros.q).toBe("typescript");
	expect(url.parametros.hl).toBe("pt-BR");
});

test("Deve lançar erro com url inválida", () => {
	expect(() => new Url()).toThrow(Erros.URL_INVALIDA);
	expect(() => new Url("")).toThrow(Erros.URL_INVALIDA);
	expect(() => new Url("www.google.com")).toThrow(Erros.URL_INVALIDA);
	expect(() => new Url("https//www.google.com")).toThrow(Erros.URL_INVALIDA);
});
