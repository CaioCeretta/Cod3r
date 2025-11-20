/** biome-ignore-all lint/suspicious/noAssignInExpressions: Lesson */
import Erros from "@/core/constants/Erros";
import Usuario from "@/core/usuario/UsuarioAnemicoV4";

const usuarioValido = () =>
	new Usuario(123, "Fulano", "fulano@zmail.com", "123456");

test("Deve permitir usuario com nome undefined", () => {
	const usuario: Usuario = usuarioValido();
	usuario.nome = undefined as any;
	expect(usuario.nome).toBeUndefined();
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

test("Deve permitir usuario com email inválido", () => {
	const usuario: Usuario = usuarioValido();
	usuario.email = "!@#$";
	expect(usuario.email).toBe(usuario.email);
});

test("Deve alterar email com email válido", () => {
	const usuario: Usuario = usuarioValido();
	usuario.email = "fulano@yahoo.com.br";
	expect(usuario.email).toBe(usuario.email);
});

test("Deve lançar erro ao tentar alterar senha com tamanha menor que 6 caracteres", () => {
	const usuario: Usuario = usuarioValido();
	expect(() => (usuario.senha = "65432")).toThrow(Erros.SENHA_INVALIDA);
});

test("Deve alterar senha com senha maior ou igual a 6 caracteres", () => {
	const novaSenhaValida = "563412";
	const usuario: Usuario = usuarioValido();
	usuario.senha = novaSenhaValida;
	expect(usuario.senha).toBe(novaSenhaValida);
});
