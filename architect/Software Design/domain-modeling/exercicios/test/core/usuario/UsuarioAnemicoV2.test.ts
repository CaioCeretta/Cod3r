import Usuario from "@/core/usuario/UsuarioAnemicoV2";

const usuarioValido = () => {
	return new Usuario(1, "Caio", "caio@jbil.com.br", "123456");
};

test("Deve permitir usuario com nome undefined", () => {
	const usuario: Usuario = usuarioValido();
	usuario.nome = undefined as any;

	expect(usuario.nome).toBe(undefined);
});
test("Deve permitir usuario sem nome", () => {
	const usuario: Usuario = usuarioValido();
	usuario.nome = "";

	expect(usuario.nome).toBe("");
});

test("Deve permitir usuario com id negativo", () => {
	const usuario: Usuario = usuarioValido();
	usuario.id = -300;

	expect(usuario.id).toBe(-300);
});

test("Deve permitir usuario com email invalido", () => {
	const usuario: Usuario = usuarioValido();
	usuario.email = "@!%S";

	expect(usuario.email).toBe("@!%S");
});

test("Deve permitir usuario com senha inválida", () => {
	const usuario: Usuario = usuarioValido();
	usuario.senha = "a";

	expect(usuario.senha).toBe("a");
});
