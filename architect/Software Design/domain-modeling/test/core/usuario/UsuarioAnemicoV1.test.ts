import type Usuario from "@/core/usuario/UsuarioAnemicoV1";

const usuarioValido: Usuario = {
	id: 1,
	nome: "Caio",
	email: "caio@jbil.com.br",
	senha: "123456",
};

test("Deve permitir usuario sem nome", () => {
	const usuario: Usuario = { ...usuarioValido, nome: "" };

	expect(usuario.nome).toBe("");
});

test("Deve permitir usuario com id negativo", () => {
	const usuario: Usuario = { ...usuarioValido, id: -1 };

	expect(usuario.id).toBe(-1);
});

test("Deve permitir usuario com email invalido", () => {
	const usuario: Usuario = { ...usuarioValido, email: "@!%S" };

	expect(usuario.email).toBe("@!%S");
});

test("Deve permitir usuario com senha inválida", () => {
	const usuario: Usuario = { ...usuarioValido, senha: "a" };

	expect(usuario.senha).toBe("a");
});
