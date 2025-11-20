import { Erros } from "@/constants/Erros";
import Email from "@/shared/Email";

test("Deve criar um e-mail válido", () => {
	const email = new Email("caio@zmail.com");
	expect(email.valor).toBe("caio@zmail.com");
});

test("Deve retornar o nome do usuario", () => {
	const email = new Email("caio@zmail.com");
	expect(email.usuario).toBe("caio");
});

test("Deve retornar o domínio e-mail", () => {
	const email = new Email("caio@zmail.com");
	expect(email.dominio).toBe("zmail.com");
});

test("Deve lançar um erro ao criar e-mail invalido", () => {
	expect(() => new Email()).toThrow(Erros.EMAIL_INVALIDO);
	expect(() => new Email("")).toThrow(Erros.EMAIL_INVALIDO);
	expect(() => new Email("john")).toThrow(Erros.EMAIL_INVALIDO);
	expect(() => new Email("john@zmail")).toThrow(Erros.EMAIL_INVALIDO);
});
